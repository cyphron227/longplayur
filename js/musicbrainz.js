// Album credits via MusicBrainz (INCREMENT-02 Phase 4): a second, free,
// keyless data source for producer/engineer/performer credits, since
// Spotify's own Web API has no such field (confirmed while building the
// deadwax line -- see KNOWN-DEVIATIONS.md's INCREMENT-01 history). Modelled
// on deezer.js's shape: a shared client, best-effort matching, and hiding
// quietly rather than erroring loudly when nothing is found.
//
// Two honest deviations from a literal copy of deezer.js's fetch client,
// both because MusicBrainz genuinely is not Deezer (see the KNOWN-DEVIATIONS.md
// entry for the exact reasoning, not repeated here): there is no JSONP
// fallback (MusicBrainz's public API has no documented callback/JSONP
// support the way Deezer's `output=jsonp` does; the plain fetch is the only
// real path), and there is no per-album User-Agent header (browsers refuse
// to let JS set one; MusicBrainz's own etiquette guide asks for a
// descriptive one on server-side clients, which this app, by design, is not).
//
// Fetched lazily, one album at a time, only when the Credits disclosure on
// the album view is actually opened -- never pre-fetched across the whole
// Wall, learning directly from the bag-preview request-burst mistake
// already documented in KNOWN-DEVIATIONS.md. That also keeps this well
// inside MusicBrainz's ~1 request/second public rate limit without needing
// its own throttle.

const MB_BASE = 'https://musicbrainz.org/ws/2';
// v2: bumped after fixing the multi-artist-string query bug and the
// overly-strict exact-title match below (see KNOWN-DEVIATIONS.md) --
// without this, every album already tried before the fix would keep
// serving its stale, incorrectly-cached "no credits found" miss for the
// rest of the 30-day TTL, masking the fix for exactly the albums a
// listener had already noticed it on.
const LS_CACHE_PREFIX = 'lp_mbcredits_v2_';
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // credit data for a specific release essentially never changes; 30 days is a generous, low-cost guess.

// MusicBrainz's own search relevance score (0-100) plus a normalised title
// match, together, before a release-group is trusted as "this album" --
// per explicit instruction, an unconfident match is treated as not found
// rather than guessed at.
const MIN_CONFIDENCE_SCORE = 90;

// Release-level relationship types this app knows how to label. MusicBrainz's
// own type vocabulary is much larger (art direction, liner notes, photography,
// etc.); this list is deliberately scoped to PRD F-whatever's own
// "producer/engineer/performer" ask rather than surfacing everything MusicBrainz
// tracks.
const ROLE_LABELS = {
  producer: 'Producer',
  'co-producer': 'Producer',
  engineer: 'Engineer',
  'recording engineer': 'Engineer',
  'sound engineer': 'Engineer',
  mix: 'Mixing',
  'mix engineer': 'Mixing',
  mastering: 'Mastering',
  programming: 'Programming',
  performer: 'Performer',
  vocal: 'Vocals',
  instrument: 'Instruments',
  composer: 'Composer',
  arranger: 'Arranger',
};

// NFKD + stripping combining marks before the a-z0-9 filter means "Beyoncé"
// and "Beyonce" (or two different Unicode representations of the same
// accented character) normalise identically, rather than the accent
// silently splitting a word in two (a plain [^a-z0-9] filter turns "é" into
// a bare space, e.g. "Björk" -> "bj rk") and quietly failing an otherwise
// correct exact-name match.
function normalize(s) {
  return (s || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip combining diacritical marks left behind by NFKD decomposition.
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// MusicBrainz's own public-API courtesy guidance is roughly 1 request per
// second; bounding how many callers can be *in flight* at once (the
// concurrency limits in flip.js/runout.js) does not by itself cap the
// *rate* of completed requests, and going through this in practice
// (concurrency 2, each artist costing up to 2 requests) burst well past
// that guidance and got a real chunk of a wall pool's worth of artists
// rate-limited -- which then got silently, permanently mis-cached as "no
// genre" (see getPrimaryGenre() in ceremony.js's fix for the caching half
// of this; this is the request-pacing half). Every MusicBrainz request in
// this app, credits or genre, goes through this same queue, so a single
// on-demand credits lookup can occasionally queue briefly behind an
// in-progress background genre batch -- judged an acceptable trade-off
// against actually respecting the rate limit; 500ms (roughly 2 req/s) is a
// deliberately chosen compromise between the 1 req/s guidance and not
// making that occasional wait too long, not a value verified against
// MusicBrainz's actual enforcement in this environment (no network access
// to it here).
const MIN_REQUEST_SPACING_MS = 500;
let requestQueue = Promise.resolve();

function schedule(fn) {
  const run = requestQueue.then(async () => {
    try {
      return await fn();
    } finally {
      await new Promise((resolve) => setTimeout(resolve, MIN_REQUEST_SPACING_MS));
    }
  });
  // Chain off `run` but swallow its rejection here so one failed request
  // doesn't wedge every request queued after it.
  requestQueue = run.catch(() => {});
  return run;
}

async function mbFetch(path) {
  return schedule(async () => {
    const url = `${MB_BASE}${path}${path.includes('?') ? '&' : '?'}fmt=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`musicbrainz_${res.status}`);
    return res.json();
  });
}

// Spotify titles very commonly carry an edition/remaster qualifier a
// MusicBrainz release-group's own canonical title does not (or the other
// way round) -- "Rumours (Remastered)" vs "Rumours", "OK Computer
// (Deluxe Edition)" vs "OK Computer". A bare `normalize()` (punctuation/
// case only) does not account for that, so an exact-title requirement
// alone rejected a large share of genuine matches: reported live as
// "credits are never found", for effectively every album tried, not a
// handful of edge cases. Stripping this class of qualifier for the
// comparison (not from the search query text itself, which still helps
// MusicBrainz's own relevance scoring) recovers those without weakening
// the actual confidence check -- MIN_CONFIDENCE_SCORE still has to be met
// either way, this only widens what counts as "the same title".
const TITLE_QUALIFIER_PATTERN = /[([][^()[\]]*\b(remaster(ed)?|deluxe|expanded|anniversary|edition|version|bonus|reissue|remix(ed)?|special|collector'?s?|mono|stereo)\b[^()[\]]*[)\]]/gi;

function coreTitle(title) {
  return normalize((title || '').replace(TITLE_QUALIFIER_PATTERN, ' '));
}

/** The best release-group match for artist+title, or null if nothing meets
 * MIN_CONFIDENCE_SCORE plus a title match (exact, or exact once a common
 * edition/remaster qualifier is stripped from both sides) -- an
 * unconfident match is not returned at all, rather than guessed at. */
async function findReleaseGroup(artist, title) {
  const q = encodeURIComponent(`releasegroup:"${title}" AND artist:"${artist}"`);
  const data = await mbFetch(`/release-group/?query=${q}&limit=5`);
  const candidates = data?.['release-groups'] || [];
  const wantedTitle = normalize(title);
  const wantedCore = coreTitle(title);

  const best = candidates.find((rg) => {
    if ((rg.score ?? 0) < MIN_CONFIDENCE_SCORE) return false;
    return normalize(rg.title) === wantedTitle || coreTitle(rg.title) === wantedCore;
  });
  if (!best && candidates.length > 0) {
    // Diagnostic only (fires on a miss, which is expected and common --
    // see getAlbumCredits()'s own doc): the actual top candidate and its
    // score, so a real "why didn't this match" question is answerable
    // from the console rather than a total black box. Never surfaced in
    // the UI, which shows the same quiet "No credits found" either way.
    console.info('[musicbrainz] no confident release-group match', { artist, title, topCandidate: candidates[0]?.title, topScore: candidates[0]?.score });
  }
  return best || null;
}

/** One official (or, failing that, any) release belonging to a release-group. */
async function findRelease(releaseGroupId) {
  const data = await mbFetch(`/release-group/${releaseGroupId}?inc=releases`);
  const releases = data?.releases || [];
  if (releases.length === 0) return null;
  return releases.find((r) => r.status === 'Official') || releases[0];
}

function ingestRelations(byRole, relations) {
  for (const rel of relations || []) {
    const label = ROLE_LABELS[rel.type];
    const name = rel.artist?.name;
    if (!label || !name) continue;
    if (!byRole.has(label)) byRole.set(label, new Set());
    byRole.get(label).add(name);
  }
}

/** Release-level artist relationships (producer, engineer, etc.), plus a
 * second, best-effort pass over each track's own recording-level
 * relationships. Real MusicBrainz data attaches most production credits
 * (producer, engineer, mixing) to individual recordings, not the release
 * as a whole -- release-level relationships alone came back essentially
 * always empty in live use, which is what "credits are never found"
 * actually was for most albums, not a MusicBrainz coverage gap. The
 * second request is wrapped in its own try/catch: if it fails (or the
 * include token turns out to behave differently than expected -- this
 * could not be verified against a live MusicBrainz account in this build
 * environment, see KNOWN-DEVIATIONS.md), whatever release-level credits
 * the first request already found still stand rather than the whole
 * lookup failing. */
async function findRelationCredits(releaseId) {
  const byRole = new Map();

  const releaseData = await mbFetch(`/release/${releaseId}?inc=artist-rels`);
  ingestRelations(byRole, releaseData?.relations);

  try {
    const recordingData = await mbFetch(`/release/${releaseId}?inc=recordings+recording-level-rels`);
    for (const medium of recordingData?.media || []) {
      for (const track of medium.tracks || []) {
        ingestRelations(byRole, track.recording?.relations);
      }
    }
  } catch (err) {
    console.error('[musicbrainz] recording-level credit lookup failed (release-level credits, if any, are unaffected):', err);
  }

  if (byRole.size === 0) return null;
  return Array.from(byRole, ([role, names]) => ({ role, artists: Array.from(names) }));
}

function cacheKey(artist, title) {
  return `${LS_CACHE_PREFIX}${normalize(artist)}::${normalize(title)}`;
}

function getCached(artist, title) {
  try {
    const raw = localStorage.getItem(cacheKey(artist, title));
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!parsed || Date.now() - parsed.builtAt >= CACHE_TTL_MS) return undefined;
    return parsed.credits; // may itself be null (a confirmed miss, also worth caching).
  } catch {
    return undefined;
  }
}

function setCached(artist, title, credits) {
  try {
    localStorage.setItem(cacheKey(artist, title), JSON.stringify({ builtAt: Date.now(), credits }));
  } catch {
    // localStorage full/unavailable: resolves again next time.
  }
}

/**
 * @param {{artist: string, title: string}} album
 * @returns {Promise<{credits: Array<{role: string, artists: string[]}>|null, failed: boolean}>}
 *   credits is null for an honest miss (no confident MusicBrainz match, or a
 *   match with no relationship data recorded) -- expected and common, not
 *   an error. failed is true only when the request itself broke (logged via
 *   console.error); the caller should show the same "No credits found" copy
 *   either way rather than exposing network-failure detail inside a minor
 *   collapsed disclosure row, per explicit instruction to degrade quietly.
 */
export async function getAlbumCredits({ artist, title }) {
  const cached = getCached(artist, title);
  if (cached !== undefined) return { credits: cached, failed: false };

  try {
    const releaseGroup = await findReleaseGroup(artist, title);
    if (!releaseGroup) {
      setCached(artist, title, null);
      return { credits: null, failed: false };
    }

    const release = await findRelease(releaseGroup.id);
    if (!release) {
      setCached(artist, title, null);
      return { credits: null, failed: false };
    }

    const credits = await findRelationCredits(release.id);
    setCached(artist, title, credits);
    return { credits, failed: false };
  } catch (err) {
    console.error('[musicbrainz] credit lookup failed:', err);
    return { credits: null, failed: true };
  }
}

// ---------------------------------------------------------------------
// Artist genre (added post-launch): a fallback genre source for
// ceremony.js's fetchPrimaryGenre(), used when Spotify's own
// GET /artists/{id} response has an empty `genres` array -- observed live
// to now be the common case for most/all artists rather than the
// exception it was when the selection preview's description line was
// first built (not documented anywhere by Spotify, and not independently
// verifiable against a live account in this build environment; stated
// here as an inference from this app's own live behaviour, per the
// honesty rule, not as a confirmed Spotify API change). Deezer was
// considered and rejected as this fallback: its public API has no
// per-artist genre field to query directly, only editorial genre-to-
// artist buckets (`/genre/{id}/artists`), which would need brute-forcing
// every bucket to check membership for an arbitrary artist. MusicBrainz's
// artist entity has a real, first-class `genres` field instead (community-
// tagged, each with a vote count), fetched here the same best-effort,
// confidence-gated way as getAlbumCredits() above.
// ---------------------------------------------------------------------

const LS_GENRE_CACHE_PREFIX = 'lp_mbgenre_';

/** The best artist match for a name, or null if nothing meets
 * MIN_CONFIDENCE_SCORE plus a normalised name match. */
async function findArtist(name) {
  const q = encodeURIComponent(`artist:"${name}"`);
  const data = await mbFetch(`/artist/?query=${q}&limit=5`);
  const candidates = data?.artists || [];
  const wantedName = normalize(name);
  const best = candidates.find((a) => (a.score ?? 0) >= MIN_CONFIDENCE_SCORE && normalize(a.name) === wantedName);
  return best || null;
}

/** The artist's highest-voted genre tag, or null if MusicBrainz has none
 * recorded for them -- common and expected, not an error. */
async function findArtistGenre(artistMbid) {
  const data = await mbFetch(`/artist/${artistMbid}?inc=genres`);
  const genres = (data?.genres || []).slice().sort((a, b) => (b.count || 0) - (a.count || 0));
  return genres[0]?.name || null;
}

function genreCacheKey(name) {
  return `${LS_GENRE_CACHE_PREFIX}${normalize(name)}`;
}

function getCachedGenre(name) {
  try {
    const raw = localStorage.getItem(genreCacheKey(name));
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!parsed || Date.now() - parsed.builtAt >= CACHE_TTL_MS) return undefined;
    return parsed.genre; // may itself be null (a confirmed miss, also worth caching).
  } catch {
    return undefined;
  }
}

function setCachedGenre(name, genre) {
  try {
    localStorage.setItem(genreCacheKey(name), JSON.stringify({ builtAt: Date.now(), genre }));
  } catch {
    // localStorage full/unavailable: resolves again next time.
  }
}

/**
 * A best-effort primary genre for an artist, by name (MusicBrainz has no
 * relationship to a Spotify artist id, so this always searches by name,
 * the same way getAlbumCredits() searches releases by artist+title).
 * @param {string} artistName
 * @returns {Promise<{genre: string|null, failed: boolean}>} genre is null
 *   for an honest miss (no confident artist match, or a match with no
 *   genre tags recorded) -- never a guess. `failed` distinguishes that
 *   honest miss (worth caching -- see getCachedGenre()/setCachedGenre())
 *   from the request itself breaking (a real bug, or MusicBrainz's own
 *   rate limit), which callers must NOT cache as "no genre": doing that
 *   once already meant a single burst of rate-limited requests
 *   permanently mis-labelled a whole chunk of artists as genre-less for
 *   the cache's full 30-day TTL (see KNOWN-DEVIATIONS.md).
 */
export async function getArtistGenre(artistName) {
  if (!artistName) return { genre: null, failed: false };
  const cached = getCachedGenre(artistName);
  if (cached !== undefined) return { genre: cached, failed: false };

  try {
    const artist = await findArtist(artistName);
    if (!artist) {
      setCachedGenre(artistName, null);
      return { genre: null, failed: false };
    }
    const genre = await findArtistGenre(artist.id);
    setCachedGenre(artistName, genre);
    return { genre, failed: false };
  } catch (err) {
    console.error('[musicbrainz] artist genre lookup failed:', err);
    return { genre: null, failed: true }; // not cached here: the caller must not treat this the same as a confirmed miss.
  }
}

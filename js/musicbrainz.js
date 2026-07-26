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
const LS_CACHE_PREFIX = 'lp_mbcredits_';
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

function normalize(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

async function mbFetch(path) {
  const url = `${MB_BASE}${path}${path.includes('?') ? '&' : '?'}fmt=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`musicbrainz_${res.status}`);
  return res.json();
}

/** The best release-group match for artist+title, or null if nothing meets
 * MIN_CONFIDENCE_SCORE plus a normalised title match -- an unconfident
 * match is not returned at all, rather than guessed at. */
async function findReleaseGroup(artist, title) {
  const q = encodeURIComponent(`releasegroup:"${title}" AND artist:"${artist}"`);
  const data = await mbFetch(`/release-group/?query=${q}&limit=5`);
  const candidates = data?.['release-groups'] || [];
  const wantedTitle = normalize(title);

  const best = candidates.find((rg) => (rg.score ?? 0) >= MIN_CONFIDENCE_SCORE && normalize(rg.title) === wantedTitle);
  return best || null;
}

/** One official (or, failing that, any) release belonging to a release-group. */
async function findRelease(releaseGroupId) {
  const data = await mbFetch(`/release-group/${releaseGroupId}?inc=releases`);
  const releases = data?.releases || [];
  if (releases.length === 0) return null;
  return releases.find((r) => r.status === 'Official') || releases[0];
}

/** Release-level artist relationships (producer, engineer, etc.). Track/
 * recording-level credits (MusicBrainz often attaches "producer" to an
 * individual recording rather than the release as a whole) are out of
 * scope for this pass -- a deliberate simplification, not an oversight;
 * see KNOWN-DEVIATIONS.md. */
async function findRelationCredits(releaseId) {
  const data = await mbFetch(`/release/${releaseId}?inc=artist-rels`);
  const relations = data?.relations || [];

  const byRole = new Map();
  for (const rel of relations) {
    const label = ROLE_LABELS[rel.type];
    const name = rel.artist?.name;
    if (!label || !name) continue;
    if (!byRole.has(label)) byRole.set(label, new Set());
    byRole.get(label).add(name);
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
 * @returns {Promise<string|null>} null for an honest miss (no confident
 *   artist match, or a match with no genre tags recorded) -- never a guess.
 */
export async function getArtistGenre(artistName) {
  if (!artistName) return null;
  const cached = getCachedGenre(artistName);
  if (cached !== undefined) return cached;

  try {
    const artist = await findArtist(artistName);
    if (!artist) {
      setCachedGenre(artistName, null);
      return null;
    }
    const genre = await findArtistGenre(artist.id);
    setCachedGenre(artistName, genre);
    return genre;
  } catch (err) {
    console.error('[musicbrainz] artist genre lookup failed:', err);
    return null; // not cached: a transient failure should retry next time, not stick as a permanent miss.
  }
}

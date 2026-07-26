// Runout groove (INCREMENT-03 Phase 3): nine honestly-labelled directions
// offered after an album ends, replacing the immediate zoom-to-shelf as the
// default next step (see main.js's handleRunout()). Every direction maps
// to something this app can actually check; a direction that cannot be
// honestly filled for a given album is dropped, never padded with a
// duplicate or invented pick (the fallback rule, applied consistently).
//
// buildRunoutGrid() is a pure function over a fully-assembled `context`
// object -- no I/O, no journal/localStorage reads of its own -- so the
// actual direction-selection logic is unit-testable without a live
// Spotify account or network access (tests.html). gatherRunoutContext() is
// the impure counterpart that does the (bounded) network calls and reads
// the journal/pool state this needs, then hands its result to
// buildRunoutGrid(). At most two genuinely new network calls happen per
// runout event (an artist-albums lookup for direction 1, and nearby.js's
// already-throttled Deezer call for direction 4); everything else is pool
// math over data already in memory, a different risk profile from
// INCREMENT-02's mostly-new-API-surface phases.

import { apiFetch } from './spotify.js';
import { getPrimaryGenre } from './ceremony.js';
import { getRecordsNearby } from './nearby.js';
import { getCachedNewArrivalsPool } from './newarrivals.js';
import { lastPlayedAtByAlbum, hasEntryTagSupport, keeperEntriesNewestFirst, playedEntriesNewestFirst } from './journal.js';

// A first-pass, explicitly approximate guess at which genre pairs read as
// "basically the same neighbourhood" rather than a genuine left turn (e.g.
// soul and motown), not a real taxonomy -- there is no authoritative source
// for "how different are these two genres" available to this app, so this
// is a small, honest, hand-picked list rather than a pretence of rigour.
export const ADJACENT_GENRE_PAIRS = [
  ['soul', 'motown'],
  ['soul', 'r&b'],
  ['soul', 'neo soul'],
  ['hip hop', 'rap'],
  ['hip hop', 'trap'],
  ['rock', 'alt rock'],
  ['rock', 'indie rock'],
  ['indie', 'indie rock'],
  ['britpop', 'indie rock'],
  ['trip hop', 'downtempo'],
  ['house', 'techno'],
  ['house', 'deep house'],
  ['jazz', 'neo soul'],
  ['pop', 'dance pop'],
];

const ARTIST_ALBUMS_PAGE_LIMIT = 10; // GET /artists/{id}/albums caps `limit` at 10; see search.js's own deviation entry.
const ARTIST_ALBUMS_PAGES = 2;
// Kept lower than this codebase's usual 4 (search.js, bags.js): a
// genuinely new artist id now often costs two MusicBrainz requests (not
// zero) via getPrimaryGenre()'s fallback -- see flip.js's matching
// constant and KNOWN-DEVIATIONS.md for the full reasoning.
const GENRE_RESOLVE_CONCURRENCY = 2;

function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - 300) - Math.abs((b.width ?? 300) - 300));
  return sorted[0].url;
}

function isWantedRelease(album) {
  if (album.album_type === 'compilation') return false;
  if (album.album_type === 'album') return true;
  return (album.total_tracks ?? 0) >= 6;
}

function toEntry(album) {
  return {
    id: album.id,
    uri: album.uri,
    name: album.name,
    artist: (album.artists || []).map((a) => a.name).join(', '),
    artistId: album.artists?.[0]?.id ?? null,
    image: pickImage(album.images),
    totalTracks: album.total_tracks ?? null,
    releaseDate: album.release_date || null,
  };
}

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/** Direction 1's own data: another wanted release by the same artist,
 * excluding the just-finished album itself. */
async function otherAlbumsForArtist(artistId, excludeAlbumId) {
  if (!artistId) return [];
  try {
    const pages = await Promise.all(
      Array.from({ length: ARTIST_ALBUMS_PAGES }, (_, i) =>
        apiFetch(`/artists/${artistId}/albums?include_groups=album,single&limit=${ARTIST_ALBUMS_PAGE_LIMIT}&offset=${i * ARTIST_ALBUMS_PAGE_LIMIT}`)
      )
    );
    return pages
      .flatMap((data) => data?.items || [])
      .filter(isWantedRelease)
      .filter((a) => a.id !== excludeAlbumId)
      .map(toEntry);
  } catch (err) {
    console.error('[runout] GET /artists/{id}/albums failed:', err);
    return [];
  }
}

/** Directions 2, 3, and 8 all read genre off the *current wall pool*, not
 * off a fresh fetch -- resolved here via ceremony.js's own per-artist genre
 * cache (the same one the selection preview and flip.js's genre sort/filter
 * already share), deduplicated by artist id, bounded concurrency. */
async function resolvePoolGenres(pool) {
  // getPrimaryGenre()'s MusicBrainz fallback searches by name, not
  // Spotify artist id -- the first name seen for a given artistId is used.
  const nameByArtistId = new Map();
  for (const entry of pool) {
    if (entry.artistId && !nameByArtistId.has(entry.artistId)) {
      nameByArtistId.set(entry.artistId, (entry.artist || '').split(',')[0].trim());
    }
  }
  const artistIds = Array.from(nameByArtistId.keys());
  const genreByArtistId = new Map();
  await mapWithConcurrency(artistIds, GENRE_RESOLVE_CONCURRENCY, async (artistId) => {
    genreByArtistId.set(artistId, await getPrimaryGenre(artistId, nameByArtistId.get(artistId)));
  });
  return pool.map((entry) => ({ ...entry, genre: entry.artistId ? genreByArtistId.get(entry.artistId) || null : null }));
}

/**
 * Assembles everything buildRunoutGrid() needs for one just-finished album:
 * the two genuinely new network calls (artist discography, Deezer related),
 * genre resolution over the current pool (cached, often free), and reads of
 * the existing journal/new-arrivals state. No selection logic lives here --
 * that is buildRunoutGrid()'s job, kept separate so it can be tested without
 * any of this.
 * @param {object} finishedEntry the just-finished pool-shaped entry
 * @param {{currentPool: Array, poolSourceType: 'own'|'other'}} ctx
 *   poolSourceType: 'own' for the user's own Wall pool, 'other' for
 *   anything else currently mounted (a bag, a playlist, a search result, or
 *   New arrivals) -- direction 6 only distinguishes these two cases, not
 *   which specific "other" source it is.
 */
export async function gatherRunoutContext(finishedEntry, { currentPool, poolSourceType }) {
  const seedArtist = (finishedEntry.artist || '').split(',')[0].trim();

  const [finishedGenre, artistOtherAlbums, poolWithGenre, related] = await Promise.all([
    getPrimaryGenre(finishedEntry.artistId, seedArtist),
    otherAlbumsForArtist(finishedEntry.artistId, finishedEntry.id),
    resolvePoolGenres(currentPool || []),
    seedArtist ? getRecordsNearby(seedArtist) : Promise.resolve([]),
  ]);

  return {
    finished: { ...finishedEntry, genre: finishedGenre },
    artistOtherAlbums,
    poolWithGenre,
    related,
    journalPicks: {
      hasTagSchema: hasEntryTagSupport(),
      keeperEntries: keeperEntriesNewestFirst(),
      playedEntries: playedEntriesNewestFirst(),
    },
    poolSource: { type: poolSourceType, pool: currentPool || [] },
    newArrivalsPool: getCachedNewArrivalsPool(),
    playedIds: new Set(lastPlayedAtByAlbum().keys()),
  };
}

function normalizeGenre(g) {
  return (g || '').toLowerCase().trim();
}

function genresAreAdjacent(a, b) {
  if (!a || !b) return false;
  return ADJACENT_GENRE_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

/** From a candidate list, an unplayed pick if one exists, else any
 * candidate; `excludeId` (always the just-finished album) is filtered out
 * first. Deterministic (always the first match in list order) rather than
 * randomised, so the same inputs always produce the same, testable result. */
function pickPreferUnplayed(list, playedIds, excludeId) {
  const candidates = (list || []).filter((e) => e && e.id !== excludeId);
  if (candidates.length === 0) return null;
  const unplayed = candidates.filter((e) => !playedIds.has(e.id));
  return unplayed[0] || candidates[0];
}

/**
 * The pure selection logic: up to nine `{direction, entry, wildcard}`
 * cells, in the fixed order below, skipping (never padding) any direction
 * that cannot be honestly filled from `context`. Direction 9 ("Play it
 * again") always fills, so the result is never empty as long as `finished`
 * itself is a real entry.
 * @param {object} context see gatherRunoutContext()'s return shape (or an
 *   equivalent hand-built object, for tests)
 * @returns {Array<{direction: string, entry: object, wildcard: boolean}>}
 */
export function buildRunoutGrid(context) {
  const {
    finished,
    artistOtherAlbums = [],
    poolWithGenre = [],
    related = [],
    journalPicks = { hasTagSchema: false, keeperEntries: [], playedEntries: [] },
    poolSource = { type: 'own', pool: [] },
    newArrivalsPool = null,
    playedIds = new Set(),
  } = context;

  const cells = [];
  const finishedGenre = normalizeGenre(finished.genre);
  const finishedYear = (finished.releaseDate || '').slice(0, 4);
  const keeperCandidates = (journalPicks.keeperEntries || []).filter((e) => e.id !== finished.id);
  const playedCandidates = (journalPicks.playedEntries || []).filter((e) => e.id !== finished.id);

  // 1. More from this artist.
  const artistPick = pickPreferUnplayed(artistOtherAlbums, playedIds, finished.id);
  if (artistPick) cells.push({ direction: 'More from this artist', entry: artistPick, wildcard: false });

  // 2. Same genre (within the current wall pool only).
  if (finishedGenre) {
    const sameGenre = poolWithGenre.filter((e) => e.id !== finished.id && normalizeGenre(e.genre) === finishedGenre);
    const genrePick = pickPreferUnplayed(sameGenre, playedIds, finished.id);
    if (genrePick) cells.push({ direction: 'Same genre', entry: genrePick, wildcard: false });
  }

  // 3. Same year (within the current wall pool only).
  if (finishedYear) {
    const sameYear = poolWithGenre.filter((e) => e.id !== finished.id && (e.releaseDate || '').slice(0, 4) === finishedYear);
    const yearPick = pickPreferUnplayed(sameYear, playedIds, finished.id);
    if (yearPick) cells.push({ direction: `Same year, ${finishedYear}`, entry: yearPick, wildcard: false });
  }

  // 4. Related (Deezer, via nearby.js -- no separate fetch client).
  const relatedPick = pickPreferUnplayed(related, playedIds, finished.id);
  if (relatedPick) cells.push({ direction: 'Related', entry: relatedPick, wildcard: false });

  // 5. From your crate (a keeper), or Played before (any past play) if the
  // tag schema doesn't exist yet, or exists but nothing is tagged.
  if (journalPicks.hasTagSchema && keeperCandidates.length > 0) {
    cells.push({ direction: 'From your crate', entry: keeperCandidates[0], wildcard: false });
  } else if (playedCandidates.length > 0) {
    cells.push({ direction: 'Played before', entry: playedCandidates[0], wildcard: false });
  }

  // 6. Unplayed in this bag, or Unplayed on your Wall if the mounted pool
  // is the user's own (no bag/playlist/search/new-arrivals origin).
  const unplayedInPool = (poolSource.pool || []).filter((e) => e.id !== finished.id && !playedIds.has(e.id));
  if (unplayedInPool.length > 0) {
    const direction = poolSource.type === 'own' ? 'Unplayed on your Wall' : 'Unplayed in this bag';
    cells.push({ direction, entry: unplayedInPool[0], wildcard: false });
  }

  // 7. New arrival (only if that feature exists and has data -- feature
  // detection via newarrivals.js's own cache, not an assumption).
  if (Array.isArray(newArrivalsPool) && newArrivalsPool.length > 0) {
    const arrivalPick = pickPreferUnplayed(newArrivalsPool, playedIds, finished.id);
    if (arrivalPick) cells.push({ direction: 'New arrival', entry: arrivalPick, wildcard: false });
  }

  // 8. A left turn: a genuinely different genre from the pool, per the
  // adjacency exclusion list above. Styled with the ember accent (wildcard)
  // in the UI, not amber.
  if (finishedGenre) {
    const leftTurnCandidates = poolWithGenre.filter((e) => {
      if (e.id === finished.id) return false;
      const g = normalizeGenre(e.genre);
      if (!g || g === finishedGenre) return false;
      return !genresAreAdjacent(g, finishedGenre);
    });
    const leftTurnPick = pickPreferUnplayed(leftTurnCandidates, playedIds, finished.id);
    if (leftTurnPick) cells.push({ direction: 'A left turn', entry: leftTurnPick, wildcard: true });
  }

  // 9. Play it again -- a different past favourite if one hasn't already
  // been used above, otherwise the just-finished album itself. Always
  // fills, so the grid can never come back genuinely empty.
  const usedIds = new Set(cells.map((c) => c.entry.id));
  usedIds.add(finished.id);
  const favourite = journalPicks.hasTagSchema ? keeperCandidates.find((e) => !usedIds.has(e.id)) : null;
  if (favourite) {
    cells.push({ direction: 'A past favourite', entry: favourite, wildcard: false });
  } else {
    cells.push({ direction: 'Play it again', entry: finished, wildcard: false });
  }

  return cells.slice(0, 9);
}

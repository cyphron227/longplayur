// Flip (INCREMENT-03 Phase 1): the Now Playing screen's other view mode, a
// searchable, sortable list over the *same* pool the dome (Spin) is
// currently showing, real list semantics rather than a rotating dome, no
// separate fetch of its own.
//
// filterPool() and sortPool() are pure functions over a given pool array --
// they do no I/O and read no journal/localStorage state that isn't handed
// to them, so they are unit-tested directly in tests.html. Genre is the one
// field pool entries do not already carry (it lives on the artist, fetched
// lazily elsewhere in the app, see ceremony.js's own artistGenreCache) --
// resolveGenres() below is the one deliberately impure part of this module,
// documented on its own.

import { getPrimaryGenre } from './ceremony.js';

// Genre resolution goes through a bounded concurrency pool from its first
// commit (per the hard constraint on every new loop of API calls). Kept
// deliberately lower than this codebase's usual 4 (search.js, bags.js):
// getPrimaryGenre() now falls back to a MusicBrainz lookup by name for
// most artists (Spotify's own genre field having been observed live to
// come back empty for most/all artists post-launch, see
// KNOWN-DEVIATIONS.md), and MusicBrainz's own public-API courtesy guidance
// is roughly 1 request/second -- a genuinely new artist id often costs two
// MusicBrainz requests now (search, then genres), not zero, so a lower
// concurrency spreads a whole pool's worth of them out rather than
// bursting. Already-resolved artists (persisted to localStorage, 30 days)
// still resolve instantly regardless of this limit.
const GENRE_RESOLVE_CONCURRENCY = 2;

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

export const SORT_MODES = Object.freeze({
  ALPHA: 'alpha',
  GENRE: 'genre',
  RECENT: 'recent',
  UNPLAYED: 'unplayed',
});

// A pool entry with no resolved genre is grouped/matched under this literal
// label rather than silently excluded or invented -- honest about what is
// not known, per Docs/CLAUDE.md's "no invented data" rule.
export const UNKNOWN_GENRE = 'Unknown';

function normalize(s) {
  return (s || '').toLowerCase();
}

/**
 * Case-insensitive substring match against artist, title, and genre (when
 * resolved -- see resolveGenres()). An entry with no `.genre` field simply
 * cannot match on genre, not an error.
 * @param {Array} pool
 * @param {string} query
 * @returns {Array} a new, filtered array; `pool` itself is never mutated.
 */
export function filterPool(pool, query) {
  const q = normalize(query).trim();
  if (!q) return pool.slice();
  return pool.filter((entry) => {
    if (normalize(entry.artist).includes(q)) return true;
    if (normalize(entry.name).includes(q)) return true;
    if (entry.genre && normalize(entry.genre).includes(q)) return true;
    return false;
  });
}

/**
 * @param {Array} pool
 * @param {'alpha'|'genre'|'recent'|'unplayed'} mode
 * @param {{playedAt?: Map<string, number>}} [context] playedAt: albumId ->
 *   most recent startedAt timestamp, from journal.js's lastPlayedAtByAlbum()
 *   -- the existing played/session data store, not a new one (per explicit
 *   instruction). Required for 'recent' and 'unplayed'; 'alpha'/'genre'
 *   ignore it, so callers not using either mode may omit it.
 * @returns {Array} a new array; `pool` itself is never mutated.
 */
export function sortPool(pool, mode, context = {}) {
  const items = pool.slice();
  const playedAt = context.playedAt || new Map();

  if (mode === SORT_MODES.GENRE) {
    return items.sort((a, b) => {
      const ga = a.genre || UNKNOWN_GENRE;
      const gb = b.genre || UNKNOWN_GENRE;
      return ga.localeCompare(gb) || (a.artist || '').localeCompare(b.artist || '') || (a.name || '').localeCompare(b.name || '');
    });
  }

  if (mode === SORT_MODES.RECENT) {
    return items.sort((a, b) => (playedAt.get(b.id) || 0) - (playedAt.get(a.id) || 0));
  }

  if (mode === SORT_MODES.UNPLAYED) {
    return items.filter((entry) => !playedAt.has(entry.id));
  }

  // Default / 'alpha': artist, then title.
  return items.sort((a, b) => (a.artist || '').localeCompare(b.artist || '') || (a.name || '').localeCompare(b.name || ''));
}

/** The sticky group header key for one entry under a given sort mode, or
 * null for sort modes with no natural grouping ('recent', 'unplayed'). */
export function groupKeyFor(entry, mode) {
  if (mode === SORT_MODES.ALPHA) return (entry.artist || '?').trim()[0]?.toUpperCase() || '?';
  if (mode === SORT_MODES.GENRE) return entry.genre || UNKNOWN_GENRE;
  return null;
}

/**
 * Returns a new pool with each entry's primary genre attached (`.genre`,
 * `null` if the artist has none), so filterPool()/sortPool()'s genre modes
 * have real data to work with. Deduplicates by artistId first, so an artist
 * with several albums in the pool is only looked up once. The one
 * deliberately impure function in this module -- everything else here is a
 * pure function over whatever is handed to it.
 * @param {Array} pool
 * @returns {Promise<Array>}
 */
export async function resolveGenres(pool) {
  // getPrimaryGenre()'s MusicBrainz fallback searches by name, not
  // Spotify artist id, so a name is captured here too -- the first one
  // seen for a given artistId, on the assumption that is consistent for
  // the same underlying Spotify artist within one pool.
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

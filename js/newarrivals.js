// New arrivals (INCREMENT-02 Phase 1): a fourth Record bags source, built
// from the latest release of each artist the user follows on Spotify.
// GET /me/following (cursor-paginated, spotify.js's getFollowedArtists())
// needs the user-follow-read scope, added to js/auth.js's SCOPES -- anyone
// already connected before this change needs to sign out and reconnect once.
//
// Per artist, the most recent real album or 6+ track EP is picked via
// /artists/{id}/albums, reusing the same two-page-of-10 pagination and
// album/EP filter search.js already established (that specific limit/page
// shape is a confirmed Spotify constraint, not a guess -- see
// KNOWN-DEVIATIONS.md's search.js entries). Every followed-artist lookup
// goes through mapWithConcurrency() from the first commit, per the explicit
// instruction not to relearn the 429 lesson a fourth time.
//
// If GET /me/following fails, or the user simply follows no artists, this
// resolves to an empty pool with `failed` set appropriately so the caller
// can hide the card entirely, matching Records nearby's own silent-hide
// convention (PRD edge case 10) rather than showing an empty or broken card.

import { apiFetch, getFollowedArtists } from './spotify.js';

const LS_CACHE = 'lp_new_arrivals';
// How long a resolved "New arrivals" pool is considered fresh before the
// next visit to the Record bags screen refreshes it. Not specified by the
// PRD; six hours is a starting guess (matches the journal's own session
// inactivity window) pending real usage, not a tuned value.
const STALE_MS = 6 * 60 * 60 * 1000;

const ALBUMS_PAGE_LIMIT = 10;
const ALBUMS_PAGES_PER_ARTIST = 2;
const ARTIST_FETCH_CONCURRENCY = 4;

function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - 300) - Math.abs((b.width ?? 300) - 300));
  return sorted[0].url;
}

/** Only real albums, and EPs of 6+ tracks -- the same rule search.js,
 * bags.js, and playlists.js already apply. */
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
    // Distinguishes a New-arrivals-sourced entry from a bag/playlist one for
    // Runout groove's direction 6 ("Unplayed in this bag" vs "on your
    // wall") and 7 ("New arrival"), the same way bagId/playlistId already do.
    newArrival: true,
  };
}

/** Runs `fn` over `items` with at most `limit` calls in flight at once,
 * same pattern as search.js/bags.js's own mapWithConcurrency. */
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

/** The single most recent wanted release for one artist, or null if they
 * have none (or the request failed). */
async function latestReleaseForArtist(artistId) {
  try {
    const pages = await Promise.all(
      Array.from({ length: ALBUMS_PAGES_PER_ARTIST }, (_, i) =>
        apiFetch(`/artists/${artistId}/albums?include_groups=album,single&limit=${ALBUMS_PAGE_LIMIT}&offset=${i * ALBUMS_PAGE_LIMIT}`)
      )
    );
    const releases = pages.flatMap((data) => data?.items || []).filter(isWantedRelease);
    if (releases.length === 0) return null;
    releases.sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''));
    return releases[0];
  } catch (err) {
    console.error(`[newarrivals] GET /artists/${artistId}/albums failed:`, err);
    return null;
  }
}

function getCache() {
  try {
    const raw = localStorage.getItem(LS_CACHE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCache(pool) {
  try {
    localStorage.setItem(LS_CACHE, JSON.stringify({ builtAt: Date.now(), pool }));
  } catch {
    // localStorage full/unavailable: resolves again next visit.
  }
}

function isFresh(cache) {
  return Boolean(cache && Date.now() - cache.builtAt < STALE_MS);
}

/** Synchronous, no-network read of whatever New arrivals pool was last
 * resolved (possibly stale, possibly absent). Exists specifically so other
 * modules -- Runout groove's direction 7 -- can feature-detect "does this
 * codebase have New arrivals at all, and does it have data" by checking
 * this cache directly, rather than assuming INCREMENT-02 shipped or paying
 * for a fresh network round-trip on every album's runout.
 * @returns {Array|null} pool entries, or null if nothing has ever resolved.
 */
export function getCachedNewArrivalsPool() {
  const cache = getCache();
  return Array.isArray(cache?.pool) ? cache.pool : null;
}

/**
 * Resolves (or returns the cached) "New arrivals" pool: the latest wanted
 * release from each artist the user follows, newest first.
 * @param {{forceRefresh?: boolean}} [opts]
 * @returns {Promise<{pool: Array, failed: boolean}>} failed distinguishes a
 *   genuinely broken /me/following request from an honest "follows nobody"
 *   -- callers should hide the card in either case, but only failed is
 *   worth a console error already logged by getFollowedArtists() itself.
 */
export async function getNewArrivals({ forceRefresh = false } = {}) {
  const cache = getCache();
  if (!forceRefresh && isFresh(cache)) {
    return { pool: cache.pool, failed: false };
  }

  let artists;
  try {
    artists = await getFollowedArtists();
  } catch (err) {
    console.error('[newarrivals] GET /me/following failed:', err);
    // Serve a stale cache rather than an empty card if one exists -- a
    // transient failure shouldn't blank out an already-known pool.
    if (cache?.pool) return { pool: cache.pool, failed: false };
    return { pool: [], failed: true };
  }

  if (artists.length === 0) {
    setCache([]);
    return { pool: [], failed: false };
  }

  const releases = await mapWithConcurrency(artists, ARTIST_FETCH_CONCURRENCY, (artist) => latestReleaseForArtist(artist.id));
  const pool = releases
    .filter(Boolean)
    .sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''))
    .map(toEntry);

  setCache(pool);
  return { pool, failed: false };
}

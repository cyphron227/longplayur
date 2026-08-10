// Search the Wall by artist. Spotify's search endpoint only supports
// artist/track search directly, not albums, so this resolves to the single
// best-matching artist first, then pulls their own discography -- more
// reliable than a free-text album search anyway, since that also surfaces
// unrelated compilations and various-artist samplers.
//
// Only albums, and EPs of 6 or more tracks, are kept: singles shorter than
// that and compilations are filtered out, per explicit request.
//
// Genre search was removed entirely (previously here as a "soft search"
// across several sources) after live testing found it returning wrong
// results for real genre terms -- "African music" and "Brazilian" both
// came back with generically popular, unrelated artists (Michael Jackson,
// Taylor Swift). That happened via this module's own last-resort fallback:
// when no exact tag, genre-tag overlap, or Deezer genre bucket matched, it
// fell back to unfiltered free-text artist-search results, which for a
// broad regional/style term matches on essentially nothing meaningful. Per
// explicit instruction, genre search is gone rather than patched again;
// see KNOWN-DEVIATIONS.md for the full history of that feature's several
// earlier fixes, kept there as a record even though the feature itself is
// no longer in the app.

import { apiFetch } from './spotify.js';

// GET /artists/{id}/albums caps `limit` at 10 (not 50, as most other list
// endpoints allow) -- confirmed against Spotify's own docs after a live
// request with limit=12 came back "400 Invalid limit". Two pages (20
// releases pre-filter) gives a fuller discography than one without adding
// much latency, since both requests fire in parallel.
const ALBUMS_PAGE_LIMIT = 10;
const ALBUMS_PAGES_PER_ARTIST = 2;
const POOL_TARGET = 40;

function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - 300) - Math.abs((b.width ?? 300) - 300));
  return sorted[0].url;
}

/** Only real albums (album_type "album"), plus "single"-typed releases
 * that actually have 6 or more tracks (an EP Spotify happens to file as a
 * single). Compilations, and anything shorter, are dropped. */
function isWantedRelease(album) {
  if (album.album_type === 'compilation') return false;
  if (album.album_type === 'album') return true;
  return (album.total_tracks ?? 0) >= 6;
}

function toEntry(album, rank) {
  return {
    id: album.id,
    uri: album.uri,
    name: album.name,
    artist: (album.artists || []).map((a) => a.name).join(', '),
    artistId: album.artists?.[0]?.id ?? null,
    image: pickImage(album.images),
    totalTracks: album.total_tracks ?? null,
    releaseDate: album.release_date || null,
    rank,
  };
}

/** @returns {Promise<{items: Array, failed: boolean, error: Error|null}>}
 * failed distinguishes "the request itself broke" from "it succeeded and
 * legitimately found nothing" -- these used to look identical, with no way
 * to tell a real bug apart from an honest empty result. `error` is the
 * actual caught error (still also logged here), so a caller can describe
 * *why* it failed instead of guessing -- see main.js's describeSpotifyError(). */
async function albumsForArtist(artistId) {
  try {
    // No market param: market=from_token needs the user-read-private scope
    // (to resolve the user's country) which this app does not request, and
    // requesting it would mean every existing connected user has to
    // reconnect to pick up the new scope. Omitting market entirely is
    // valid for this endpoint -- it just means Spotify does not filter the
    // discography to one country, which does not matter for a preview pool.
    const pages = await Promise.all(
      Array.from({ length: ALBUMS_PAGES_PER_ARTIST }, (_, i) =>
        apiFetch(`/artists/${artistId}/albums?include_groups=album,single&limit=${ALBUMS_PAGE_LIMIT}&offset=${i * ALBUMS_PAGE_LIMIT}`)
      )
    );
    return { items: pages.flatMap((data) => data?.items || []), failed: false, error: null };
  } catch (err) {
    console.error('[search] GET /artists/{id}/albums failed:', err);
    return { items: [], failed: true, error: err };
  }
}

async function searchArtists(q, limit) {
  try {
    const data = await apiFetch(`/search?q=${encodeURIComponent(q)}&type=artist&limit=${limit}`);
    return { items: data?.artists?.items || [], failed: false, error: null };
  } catch (err) {
    console.error('[search] GET /search (type=artist) failed:', err);
    return { items: [], failed: true, error: err };
  }
}

function poolFromAlbumLists(albumLists) {
  const seen = new Set();
  const pool = [];
  albumLists.flat().forEach((album) => {
    if (!album || !album.id || seen.has(album.id)) return;
    if (!isWantedRelease(album)) return;
    seen.add(album.id);
    pool.push(album);
  });
  return pool.slice(0, POOL_TARGET).map(toEntry);
}

/**
 * @param {string} query free-text artist name
 * @returns {Promise<{pool: Array, failed: boolean, error: Error|null}>}
 *   pool is pool-shaped entries (same shape as albums.js/bags.js produce).
 *   failed means the underlying request broke -- distinct from a genuine,
 *   successful zero-result search. `error` lets a caller describe why
 *   (see main.js's describeSpotifyError()) instead of a blanket message
 *   that used to say "check your connection" even for, say, a 403.
 */
export async function searchAlbums(query) {
  const trimmed = query.trim();
  if (!trimmed) return { pool: [], failed: false, error: null };

  const artists = await searchArtists(trimmed, 1);
  if (artists.failed) return { pool: [], failed: true, error: artists.error };
  if (artists.items.length === 0) return { pool: [], failed: false, error: null };

  const albums = await albumsForArtist(artists.items[0].id);
  return { pool: poolFromAlbumLists([albums.items]), failed: albums.failed, error: albums.error };
}

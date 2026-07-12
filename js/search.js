// Search the Wall by artist or genre. Spotify's search endpoint only
// supports the genre: field filter for artist/track searches, not albums
// directly, so both paths resolve to one or more artists first, then pull
// each artist's own albums -- more reliable than a free-text album search
// anyway, since that also surfaces unrelated compilations and
// various-artist samplers.
//
// Only albums, and EPs of 6 or more tracks, are kept: singles shorter than
// that and compilations are filtered out, per explicit request.

import { apiFetch } from './spotify.js';

const MAX_ARTISTS_GENRE = 10;
// GET /artists/{id}/albums caps `limit` at 10 (not 50, as most other list
// endpoints allow) -- confirmed against Spotify's own docs after a live
// request with limit=12 came back "400 Invalid limit". Two pages (20
// releases pre-filter) gives a fuller discography than one without adding
// much latency, since both requests for a given artist fire in parallel.
const ALBUMS_PAGE_LIMIT = 10;
const ALBUMS_PAGES_PER_ARTIST = 2;
const POOL_TARGET = 100;

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

/** @returns {Promise<{items: Array, failed: boolean}>} failed distinguishes
 * "the request itself broke" from "it succeeded and legitimately found
 * nothing" -- these used to look identical, with no way to tell a real bug
 * apart from an honest empty result. */
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
    return { items: pages.flatMap((data) => data?.items || []), failed: false };
  } catch (err) {
    console.error('[search] GET /artists/{id}/albums failed:', err);
    return { items: [], failed: true };
  }
}

async function searchArtists(q, limit) {
  try {
    const data = await apiFetch(`/search?q=${encodeURIComponent(q)}&type=artist&limit=${limit}`);
    return { items: data?.artists?.items || [], failed: false };
  } catch (err) {
    console.error('[search] GET /search (type=artist) failed:', err);
    return { items: [], failed: true };
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

/** The single best-matching artist's own discography. */
async function searchByArtist(query) {
  const artists = await searchArtists(query, 1);
  if (artists.failed) return { pool: [], failed: true };
  if (artists.items.length === 0) return { pool: [], failed: false };

  const albums = await albumsForArtist(artists.items[0].id);
  return { pool: poolFromAlbumLists([albums.items]), failed: albums.failed };
}

/** Several artists tagged with the genre, each contributing a few albums,
 * forming a wall for that genre rather than any one artist's catalogue. */
async function searchByGenre(query) {
  const artists = await searchArtists(`genre:"${query}"`, MAX_ARTISTS_GENRE);
  if (artists.failed) return { pool: [], failed: true };
  if (artists.items.length === 0) return { pool: [], failed: false };

  const albumLists = await Promise.all(artists.items.map((a) => albumsForArtist(a.id)));
  const anyFailed = albumLists.every((r) => r.failed); // every request failing, not just one artist coming up short.
  return { pool: poolFromAlbumLists(albumLists.map((r) => r.items)), failed: anyFailed };
}

/**
 * @param {string} query free-text artist name or genre
 * @param {'artist'|'genre'} mode which interpretation to use -- this used
 *   to be guessed (try artist, fall back to genre only if that found
 *   literally nothing), but Spotify's artist search is fuzzy enough that
 *   almost any genre-like word also matches some real, if obscure, artist
 *   (e.g. "soul" matching the band Soul II Soul), so the guess essentially
 *   never fell through to genre mode in practice. The caller now asks for
 *   one explicitly (see the mode toggle next to the search field).
 * @returns {Promise<{pool: Array, failed: boolean}>} pool is pool-shaped
 *   entries (same shape as albums.js/bags.js produce). failed means the
 *   Spotify requests themselves broke (check the browser console for the
 *   logged error) -- distinct from a genuine, successful zero-result search.
 */
export async function searchAlbums(query, mode) {
  const trimmed = query.trim();
  if (!trimmed) return { pool: [], failed: false };

  const result = mode === 'genre' ? await searchByGenre(trimmed) : await searchByArtist(trimmed);
  return result;
}

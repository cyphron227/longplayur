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
const MAX_ALBUMS_PER_ARTIST = 12;
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

async function albumsForArtist(artistId) {
  try {
    const data = await apiFetch(`/artists/${artistId}/albums?include_groups=album,single&limit=${MAX_ALBUMS_PER_ARTIST}`);
    return data?.items || [];
  } catch {
    return [];
  }
}

async function searchArtists(q, limit) {
  try {
    const data = await apiFetch(`/search?q=${encodeURIComponent(q)}&type=artist&limit=${limit}`);
    return data?.artists?.items || [];
  } catch {
    return [];
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
  if (artists.length === 0) return [];
  const albums = await albumsForArtist(artists[0].id);
  return poolFromAlbumLists([albums]);
}

/** Several artists tagged with the genre, each contributing a few albums,
 * forming a wall for that genre rather than any one artist's catalogue. */
async function searchByGenre(query) {
  const artists = await searchArtists(`genre:"${query}"`, MAX_ARTISTS_GENRE);
  if (artists.length === 0) return [];
  const albumLists = await Promise.all(artists.map((a) => albumsForArtist(a.id)));
  return poolFromAlbumLists(albumLists);
}

/**
 * @param {string} query free-text artist name or genre
 * @returns {Promise<{pool: Array, mode: 'artist'|'genre'|null}>} pool is
 *   pool-shaped entries (same shape as albums.js/bags.js produce); mode
 *   records which interpretation actually found something, so the caller
 *   can label the result. mode is null (and pool empty) if neither an
 *   artist nor a genre match turned up anything playable.
 */
export async function searchAlbums(query) {
  const trimmed = query.trim();
  if (!trimmed) return { pool: [], mode: null };

  const byArtist = await searchByArtist(trimmed);
  if (byArtist.length > 0) return { pool: byArtist, mode: 'artist' };

  const byGenre = await searchByGenre(trimmed);
  return { pool: byGenre, mode: byGenre.length > 0 ? 'genre' : null };
}

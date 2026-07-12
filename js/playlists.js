// Spotify playlists as a Wall source (the Crates screen): the user's own
// playlists, browsed and selected like a record bag, but sourced live from
// Spotify rather than curated. Needs the playlist-read-private and
// playlist-read-collaborative scopes (js/auth.js) -- anyone who connected
// before those scopes were added needs to sign out and reconnect once.
//
// Unlike record bags (js/bags.js), a playlist's own track objects already
// carry a full album object (id, images, total_tracks, album_type...), so
// no per-track search call is needed to resolve them -- just dedup and the
// same album/EP filter search.js and bags.js already use.

import { getMyPlaylists, getPlaylistTracks } from './spotify.js';

const LS_RESOLVED_PREFIX = 'lp_playlist_resolved_';

function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - 300) - Math.abs((b.width ?? 300) - 300));
  return sorted[0].url;
}

/** Only real albums (album_type "album"), plus "single"-typed releases
 * that actually have 6 or more tracks (an EP Spotify happens to file as a
 * single). Compilations, and anything shorter, are dropped -- same rule
 * search.js and bags.js apply. */
function isWantedRelease(album) {
  if (album.album_type === 'compilation') return false;
  if (album.album_type === 'album') return true;
  return (album.total_tracks ?? 0) >= 6;
}

function toEntry(album, rank, playlistId) {
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
    playlistId,
  };
}

let playlistsPromise = null;

/** Fetches the user's own playlists (owned and followed), skipping empty
 * ones. Cached in memory for the tab's lifetime, same pattern as bags.js's
 * loadBagManifest(). */
export function loadMyPlaylists() {
  if (!playlistsPromise) {
    playlistsPromise = getMyPlaylists()
      .then((items) =>
        items
          .filter((p) => p && p.id && (p.tracks?.total ?? 0) > 0)
          .map((p) => ({
            id: p.id,
            name: p.name,
            image: pickImage(p.images),
            trackCount: p.tracks?.total ?? 0,
            snapshotId: p.snapshot_id,
          }))
      )
      .catch(() => []);
  }
  return playlistsPromise;
}

function getCachedResolution(playlistId, snapshotId) {
  try {
    const raw = localStorage.getItem(LS_RESOLVED_PREFIX + playlistId);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // snapshot_id changes whenever the playlist's contents change, so a
    // cache from before an edit is never served as if still current.
    if (parsed?.snapshotId !== snapshotId) return null;
    return parsed.pool;
  } catch {
    return null;
  }
}

function setCachedResolution(playlistId, snapshotId, pool) {
  try {
    localStorage.setItem(LS_RESOLVED_PREFIX + playlistId, JSON.stringify({ snapshotId, pool }));
  } catch {
    // localStorage full/unavailable: this playlist simply resolves again next time.
  }
}

/**
 * Resolves a playlist's tracks to real Spotify album pool entries (same
 * shape as albums.js produces), cached per playlist and invalidated
 * automatically if the playlist's snapshot_id changes (edited since last
 * cached). Unresolvable/unreachable playlists resolve to [] rather than
 * throwing, matching bags.js's silent-skip convention -- the caller shows
 * a generic "could not load" message when the pool comes back empty.
 * @param {{id: string, snapshotId: string}} playlist
 * @returns {Promise<Array>} pool entries, tagged with playlistId
 */
export async function resolvePlaylist(playlist) {
  const cached = getCachedResolution(playlist.id, playlist.snapshotId);
  if (cached) return cached;

  let tracks;
  try {
    tracks = await getPlaylistTracks(playlist.id);
  } catch {
    return [];
  }

  const seen = new Set();
  const pool = [];
  tracks.forEach((item) => {
    const album = item?.track?.album;
    if (!album || !album.id || seen.has(album.id)) return;
    if (!isWantedRelease(album)) return;
    seen.add(album.id);
    pool.push(toEntry(album, pool.length, playlist.id));
  });

  setCachedResolution(playlist.id, playlist.snapshotId, pool);
  return pool;
}

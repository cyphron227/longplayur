// Records nearby (PRD F10): a low shelf of related albums for whatever is
// currently playing, sourced from Deezer's keyless public API (artist
// search -> related artists, ranked by fan count -> each related artist's
// own top album), then mapped back to real Spotify album IDs via search so
// the shelf can needle-drop like anything else on the Wall.
//
// Deezer does not send CORS headers on most endpoints, so a plain fetch is
// tried first (works when it works) and a JSONP fallback is used only if
// that fails, per Docs/CLAUDE.md's security rules: a randomised callback
// name, the injected <script> removed after use, and a 10s timeout. If
// Deezer cannot be reached at all, this resolves to an empty list rather
// than throwing, so the caller can hide the shelf with no error state
// (PRD F10 / edge case 10). See KNOWN-DEVIATIONS.md.

import { apiFetch } from './spotify.js';

const DEEZER_BASE = 'https://api.deezer.com';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days, PRD F10.
const LS_CACHE_PREFIX = 'lp_nearby_';
const JSONP_TIMEOUT_MS = 10000;
const SHELF_SIZE = 6;

function jsonpFetch(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `lpJsonp${Date.now()}${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    let settled = false;

    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('jsonp_timeout'));
    }, JSONP_TIMEOUT_MS);

    window[callbackName] = (data) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      cleanup();
      reject(new Error('jsonp_script_error'));
    };

    const sep = url.includes('?') ? '&' : '?';
    script.src = `${url}${sep}output=jsonp&callback=${callbackName}`;
    document.head.appendChild(script);
  });
}

async function deezerFetch(path) {
  const url = `${DEEZER_BASE}${path}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`deezer_${res.status}`);
    return await res.json();
  } catch {
    return jsonpFetch(url);
  }
}

function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - 300) - Math.abs((b.width ?? 300) - 300));
  return sorted[0].url;
}

function formatFanCount(n) {
  return Number(n ?? 0).toLocaleString('en-GB');
}

function cacheKeyFor(artistName) {
  return `${LS_CACHE_PREFIX}${artistName.trim().toLowerCase()}`;
}

function getCached(artistName) {
  try {
    const raw = localStorage.getItem(cacheKeyFor(artistName));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || Date.now() - parsed.builtAt >= CACHE_TTL_MS) return null;
    return parsed.shelf;
  } catch {
    return null;
  }
}

function setCached(artistName, shelf) {
  try {
    localStorage.setItem(cacheKeyFor(artistName), JSON.stringify({ builtAt: Date.now(), shelf }));
  } catch {
    // localStorage full/unavailable: resolves again next time.
  }
}

async function resolveToSpotify(deezerAlbum, deezerArtist) {
  const q = encodeURIComponent(`album:"${deezerAlbum.title}" artist:"${deezerArtist.name}"`);
  try {
    const data = await apiFetch(`/search?q=${q}&type=album&limit=1`);
    const album = data?.albums?.items?.[0];
    if (!album) return null;
    return {
      id: album.id,
      uri: album.uri,
      name: album.name,
      artist: (album.artists || []).map((a) => a.name).join(', '),
      image: pickImage(album.images),
      totalTracks: album.total_tracks ?? null,
      releaseDate: album.release_date || null,
      caption: `${deezerArtist.name.toUpperCase()} · ${formatFanCount(deezerArtist.nb_fan)} FANS`,
    };
  } catch {
    return null;
  }
}

/**
 * @param {string} seedArtistName the currently-playing album's artist
 * @returns {Promise<Array>} 4 to 6 pool-shaped entries with a `caption`,
 *   or [] if Deezer is unreachable, the artist is not found, or nothing
 *   resolves back to a real Spotify album -- callers should hide the shelf
 *   in every one of those cases rather than showing an error.
 */
export async function getRecordsNearby(seedArtistName) {
  if (!seedArtistName) return [];
  const cached = getCached(seedArtistName);
  if (cached) return cached;

  try {
    const searchData = await deezerFetch(`/search/artist?q=${encodeURIComponent(seedArtistName)}`);
    const seedArtist = searchData?.data?.[0];
    if (!seedArtist) return [];

    const relatedData = await deezerFetch(`/artist/${seedArtist.id}/related`);
    const related = (relatedData?.data || [])
      .sort((a, b) => (b.nb_fan || 0) - (a.nb_fan || 0))
      .slice(0, SHELF_SIZE + 2); // a small margin so unresolvable ones don't shrink the shelf.

    const albumLists = await Promise.all(
      related.map((artist) =>
        deezerFetch(`/artist/${artist.id}/albums`)
          .then((data) => ({ artist, album: data?.data?.[0] || null }))
          .catch(() => ({ artist, album: null }))
      )
    );

    const resolved = await Promise.all(
      albumLists
        .filter((entry) => entry.album)
        .map((entry) => resolveToSpotify(entry.album, entry.artist))
    );

    const shelf = resolved.filter(Boolean).slice(0, SHELF_SIZE);
    setCached(seedArtistName, shelf);
    return shelf;
  } catch {
    return [];
  }
}

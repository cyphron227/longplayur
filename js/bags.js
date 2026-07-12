// Record bags: curated album collections shown as a rail above the Wall
// (INCREMENT-01 Phase 2). Distinct from the journal ("Past sessions",
// js/journal.js) -- a record bag is a list someone curated, not a log of
// what was played.
//
// Bag metadata (name, blurb, the {title, artist} pairs) is small and loads
// eagerly so the rail can render immediately. Resolving those pairs to real
// Spotify album pool entries is comparatively expensive (one search call
// per album), so it only happens the first time a given bag is actually
// selected, then the result is cached; unresolvable pairs are skipped
// silently rather than shown broken.

import { apiFetch } from './spotify.js';

const BAG_IDS = ['90s-us-rap', 'soul-essentials', 'motown', 'trip-hop', 'britpop', 'late-night-jazz'];
const LS_RESOLVED_PREFIX = 'lp_bag_resolved_';

let manifestPromise = null;

function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - 300) - Math.abs((b.width ?? 300) - 300));
  return sorted[0].url;
}

/** Fetches all seed bags' metadata (name, blurb, album list). Cached in memory for the tab's lifetime. */
export function loadBagManifest() {
  if (!manifestPromise) {
    manifestPromise = Promise.all(
      BAG_IDS.map(async (id) => {
        try {
          const res = await fetch(`bags/${id}.json`);
          if (!res.ok) return null;
          const data = await res.json();
          return { id, name: data.name, blurb: data.blurb, albums: data.albums || [] };
        } catch {
          return null;
        }
      })
    ).then((bags) => bags.filter(Boolean));
  }
  return manifestPromise;
}

function getCachedResolution(bagId) {
  try {
    const raw = localStorage.getItem(LS_RESOLVED_PREFIX + bagId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCachedResolution(bagId, pool) {
  try {
    localStorage.setItem(LS_RESOLVED_PREFIX + bagId, JSON.stringify({ builtAt: Date.now(), pool }));
  } catch {
    // localStorage full/unavailable: this bag simply resolves again next time.
  }
}

async function searchAlbum(title, artist) {
  const q = encodeURIComponent(`album:"${title}" artist:"${artist}"`);
  try {
    const data = await apiFetch(`/search?q=${q}&type=album&limit=1`);
    return data?.albums?.items?.[0] || null;
  } catch {
    return null;
  }
}

/**
 * Resolves a bag's {title, artist} pairs to real Spotify album pool entries
 * (same shape as albums.js produces), lazily and cached per bag.
 * @param {{id: string, albums: Array<{title: string, artist: string}>}} bag
 * @returns {Promise<Array>} pool entries, each tagged with bagId
 */
export async function resolveBag(bag) {
  const cached = getCachedResolution(bag.id);
  if (cached) return cached.pool;

  const results = await Promise.all(bag.albums.map((a) => searchAlbum(a.title, a.artist)));
  const seen = new Set();
  const pool = [];
  results.forEach((album, index) => {
    if (!album || !album.id || seen.has(album.id)) return;
    seen.add(album.id);
    pool.push({
      id: album.id,
      uri: album.uri,
      name: album.name,
      artist: (album.artists || []).map((a) => a.name).join(', '),
      artistId: album.artists?.[0]?.id ?? null,
      image: pickImage(album.images),
      totalTracks: album.total_tracks ?? null,
      releaseDate: album.release_date || null,
      rank: index,
      bagId: bag.id,
    });
  });

  setCachedResolution(bag.id, pool);
  return pool;
}

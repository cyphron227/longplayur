// Building the Wall: aggregate top tracks + saved albums into a scored pool,
// and the pure square-spiral layout function used to place them.

import { getTopTracks, getSavedAlbums } from './spotify.js';

const LS_POOL = 'lp_pool';
const POOL_TTL_MS = 24 * 60 * 60 * 1000;
const POOL_TARGET = 120;
const MIN_VIABLE = 9;

const TIME_RANGE_WEIGHTS = {
  long_term: 1.0,
  medium_term: 1.2,
  short_term: 0.8,
};

export class SparseHistoryError extends Error {
  constructor() {
    super('Not enough listening history yet to build a wall. Play more albums and come back.');
    this.name = 'SparseHistoryError';
  }
}

function albumFromTrack(track) {
  return track?.album || null;
}

function hasArtwork(album) {
  return Array.isArray(album.images) && album.images.length > 0;
}

function isTooShort(album) {
  return typeof album.total_tracks === 'number' && album.total_tracks < 4;
}

function toPoolEntry(album) {
  return {
    id: album.id,
    uri: album.uri,
    name: album.name,
    artist: (album.artists || []).map((a) => a.name).join(', '),
    image: pickImage(album.images),
    totalTracks: album.total_tracks ?? null,
    releaseDate: album.release_date || null,
  };
}

function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  // Prefer something near 300px, per PRD lazy-load sizing.
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - 300) - Math.abs((b.width ?? 300) - 300));
  return sorted[0].url;
}

async function aggregateFromTopTracks(allowShort) {
  const scores = new Map();

  const results = await Promise.all(
    Object.keys(TIME_RANGE_WEIGHTS).map((range) =>
      getTopTracks(range, 50).then((data) => ({ range, items: data?.items || [] }))
    )
  );

  for (const { range, items } of results) {
    const weight = TIME_RANGE_WEIGHTS[range];
    for (const track of items) {
      const album = albumFromTrack(track);
      if (!album || !album.id) continue;
      if (!hasArtwork(album)) continue;
      if (!allowShort && isTooShort(album)) continue;

      const existing = scores.get(album.id);
      if (existing) {
        existing.score += weight;
      } else {
        scores.set(album.id, { ...toPoolEntry(album), score: weight, source: 'top' });
      }
    }
  }

  return scores;
}

async function mergeSavedAlbums(scores, allowShort) {
  let saved;
  try {
    saved = await getSavedAlbums(2);
  } catch {
    return; // Saved albums are additive; a failure here should not sink the pool.
  }

  const topScores = Array.from(scores.values(), (e) => e.score);
  const minTopScore = topScores.length ? Math.min(...topScores) : 1;
  let baseScore = minTopScore * 0.5;

  for (const item of saved) {
    const album = item.album;
    if (!album || !album.id) continue;
    if (!hasArtwork(album)) continue;
    if (!allowShort && isTooShort(album)) continue;
    if (scores.has(album.id)) continue;

    scores.set(album.id, { ...toPoolEntry(album), score: baseScore, source: 'saved' });
    baseScore *= 0.98; // Slight decay keeps saved-album ordering deterministic and stable.
  }
}

async function buildPoolPass(allowShort) {
  const scores = await aggregateFromTopTracks(allowShort);
  await mergeSavedAlbums(scores, allowShort);
  return Array.from(scores.values()).sort((a, b) => b.score - a.score);
}

/** Fetches fresh top-tracks + saved-albums data and rebuilds the scored pool. */
export async function buildAlbumPool() {
  let pool = await buildPoolPass(false);
  if (pool.length < MIN_VIABLE) {
    pool = await buildPoolPass(true);
  }
  if (pool.length === 0) {
    throw new SparseHistoryError();
  }

  pool = pool.slice(0, POOL_TARGET).map((entry, rank) => ({ ...entry, rank }));

  const cached = { builtAt: Date.now(), pool };
  try {
    localStorage.setItem(LS_POOL, JSON.stringify(cached));
  } catch {
    // localStorage full or unavailable: proceed without caching.
  }
  return pool;
}

export function getCachedPool() {
  try {
    const raw = localStorage.getItem(LS_POOL);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.pool?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isPoolFresh(cached) {
  return Boolean(cached && Date.now() - cached.builtAt < POOL_TTL_MS);
}

/**
 * Returns the pool, preferring a fresh cache. If the cache is stale (or
 * absent) it rebuilds from the network. Callers that want instant paint
 * with a background refresh should call getCachedPool()/isPoolFresh()
 * themselves and only call buildAlbumPool() when appropriate.
 */
export async function getAlbumPool() {
  const cached = getCachedPool();
  if (isPoolFresh(cached)) return cached.pool;
  return buildAlbumPool();
}


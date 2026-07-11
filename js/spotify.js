// Thin fetch wrapper around the Spotify Web API: auth header, typed errors,
// bounded 429 retries (honouring Retry-After, at most twice per request).

import { getValidAccessToken } from './auth.js';

const API_BASE = 'https://api.spotify.com/v1';

export class SpotifyApiError extends Error {
  constructor(status, kind, message, body) {
    super(message);
    this.name = 'SpotifyApiError';
    this.status = status;
    this.kind = kind; // 'unauthorised' | 'forbidden' | 'rate_limited' | 'not_found' | 'restricted' | 'network' | 'server'
    this.body = body;
  }
}

function classify(status) {
  if (status === 401) return 'unauthorised';
  if (status === 403) return 'forbidden';
  if (status === 429) return 'rate_limited';
  if (status === 404) return 'not_found';
  if (status >= 500) return 'server';
  return 'unknown';
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {string} path e.g. '/me/top/tracks?limit=50'
 * @param {RequestInit} [options]
 * @param {{retriesLeft?: number}} [context] internal recursion state
 */
export async function apiFetch(path, options = {}, context = {}) {
  const retriesLeft = context.retriesLeft ?? 2;
  const accessToken = await getValidAccessToken();

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new SpotifyApiError(0, 'network', 'Could not reach Spotify.');
  }

  if (response.status === 429) {
    if (retriesLeft <= 0) {
      throw new SpotifyApiError(429, 'rate_limited', 'Spotify rate limit reached. Try again shortly.');
    }
    const retryAfter = Number(response.headers.get('Retry-After')) || 1;
    await sleep(retryAfter * 1000);
    return apiFetch(path, options, { retriesLeft: retriesLeft - 1 });
  }

  if (response.status === 204) return null;

  let json = null;
  const text = await response.text();
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
  }

  if (!response.ok) {
    const message = json?.error?.message || `Spotify request failed (${response.status}).`;
    throw new SpotifyApiError(response.status, classify(response.status), message, json);
  }

  return json;
}

export function getMe() {
  return apiFetch('/me');
}

export function getTopTracks(timeRange, limit = 50) {
  return apiFetch(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);
}

export async function getSavedAlbums(maxPages = 2) {
  const albums = [];
  let url = '/me/albums?limit=50';
  for (let page = 0; page < maxPages && url; page += 1) {
    const data = await apiFetch(url);
    albums.push(...(data.items || []));
    url = data.next ? data.next.replace('https://api.spotify.com/v1', '') : null;
  }
  return albums;
}

export function getAlbum(albumId) {
  return apiFetch(`/albums/${albumId}`);
}

export function getPlaybackState() {
  return apiFetch('/me/player');
}

export function getDevices() {
  return apiFetch('/me/player/devices');
}

export function transferPlayback(deviceId, play = false) {
  return apiFetch('/me/player', {
    method: 'PUT',
    body: JSON.stringify({ device_ids: [deviceId], play }),
  });
}

export function playContext(deviceId, contextUri, offset = 0) {
  const query = deviceId ? `?device_id=${deviceId}` : '';
  return apiFetch(`/me/player/play${query}`, {
    method: 'PUT',
    body: JSON.stringify({ context_uri: contextUri, offset: { position: offset } }),
  });
}

export function pause(deviceId) {
  const query = deviceId ? `?device_id=${deviceId}` : '';
  return apiFetch(`/me/player/pause${query}`, { method: 'PUT' });
}

export function resume(deviceId) {
  const query = deviceId ? `?device_id=${deviceId}` : '';
  return apiFetch(`/me/player/play${query}`, { method: 'PUT' });
}

export function next(deviceId) {
  const query = deviceId ? `?device_id=${deviceId}` : '';
  return apiFetch(`/me/player/next${query}`, { method: 'POST' });
}

export function previous(deviceId) {
  const query = deviceId ? `?device_id=${deviceId}` : '';
  return apiFetch(`/me/player/previous${query}`, { method: 'POST' });
}

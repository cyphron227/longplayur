// Playback: Web Playback SDK primary, Spotify Connect device-picker fallback.
// SDK init has an 8s timeout; iOS/mobile skip straight to Connect since the
// SDK is unreliable there. End-of-album detection lives in ending.js; this
// module only exposes raw state transitions for that module to judge.

import { getValidAccessToken } from './auth.js';
import * as api from './spotify.js';

const SDK_SRC = 'https://sdk.scdn.co/spotify-player.js';
const SDK_TIMEOUT_MS = 8000;
const POLL_INTERVAL_MS = 5000;

/** No active Spotify device at the moment playback was actually attempted
 * (Connect mode only). Callers should show the device picker (`devices`,
 * possibly empty) and, on iOS/mobile with none found, the "Wake Spotify"
 * flow -- see main.js's handleNeedleDrop()/handleSelectAlbum() catch
 * blocks. Thrown lazily, at the moment of an actual play attempt, rather
 * than assumed at boot: see startConnectFallback()'s own comment for why. */
export class NoActiveDeviceError extends Error {
  constructor(devices) {
    super('No active Spotify device.');
    this.name = 'NoActiveDeviceError';
    this.devices = devices;
  }
}

let mode = null; // 'sdk' | 'connect'
let sdkPlayer = null;
let deviceId = null;
let deviceName = null;
let pollTimer = null;
let lastSdkState = null;
let lastConnectSnapshot = null;
let currentContext = null; // { entry, tracks, totalDurationMs }
let handlers = {};

function isIosOrMobileSafari() {
  const ua = navigator.userAgent;
  const isIOS = /iP(hone|od|ad)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return isIOS;
}

function loadSdkScript() {
  return new Promise((resolve, reject) => {
    if (window.Spotify) { resolve(window.Spotify); return; }
    const timer = setTimeout(() => reject(new Error('sdk_timeout')), SDK_TIMEOUT_MS);
    window.onSpotifyWebPlaybackSDKReady = () => {
      clearTimeout(timer);
      resolve(window.Spotify);
    };
    const script = document.createElement('script');
    script.src = SDK_SRC;
    script.onerror = () => { clearTimeout(timer); reject(new Error('sdk_script_error')); };
    document.head.appendChild(script);
  });
}

async function initSdk() {
  const Spotify = await loadSdkScript();
  return new Promise((resolve, reject) => {
    const player = new Spotify.Player({
      name: 'Longplayur',
      getOAuthToken: async (cb) => cb(await getValidAccessToken()),
      volume: 1,
    });

    const readyTimeout = setTimeout(() => reject(new Error('sdk_ready_timeout')), SDK_TIMEOUT_MS);

    player.addListener('ready', ({ device_id }) => {
      clearTimeout(readyTimeout);
      deviceId = device_id;
      deviceName = 'Longplayur';
      sdkPlayer = player;
      // Silent desktop reconnect (PRD F7): claim the device immediately,
      // without starting playback, so the user never hits Spotify's
      // no-active-device state before their first needle drop of the visit.
      api.transferPlayback(device_id, false).catch(() => {});
      resolve(player);
    });
    player.addListener('not_ready', () => {
      handlers.onError?.('Longplayur lost its Spotify connection.');
    });
    player.addListener('initialization_error', () => { clearTimeout(readyTimeout); reject(new Error('sdk_init_error')); });
    player.addListener('authentication_error', () => { clearTimeout(readyTimeout); reject(new Error('sdk_auth_error')); });
    player.addListener('account_error', () => { clearTimeout(readyTimeout); reject(new Error('sdk_account_error')); });
    player.addListener('playback_error', (e) => { handlers.onError?.(e?.message || 'Playback error.'); });

    player.addListener('player_state_changed', (state) => {
      const prev = lastSdkState;
      lastSdkState = state;
      handlers.onSdkTransition?.(prev, state);
      if (state) publishViewModelFromSdk(state);
    });

    player.connect();
  });
}

async function initConnectPolling() {
  mode = 'connect';
  pollTimer = setInterval(pollConnectState, POLL_INTERVAL_MS);
  await pollConnectState();
}

async function pollConnectState() {
  let state;
  try {
    state = await api.getPlaybackState();
  } catch {
    return;
  }
  const snapshot = snapshotFromConnectState(state);
  const prev = lastConnectSnapshot;
  lastConnectSnapshot = snapshot;
  handlers.onConnectTransition?.(prev, snapshot);
  if (state) publishViewModelFromConnect(state, snapshot);
}

function snapshotFromConnectState(state) {
  if (!state || !state.item) {
    return { isPlaying: false, progressMs: 0, durationMs: 0, trackNumber: null, totalTracksInAlbum: null, trackId: null };
  }
  return {
    isPlaying: state.is_playing,
    progressMs: state.progress_ms ?? 0,
    durationMs: state.item.duration_ms ?? 0,
    trackNumber: state.item.track_number ?? null,
    totalTracksInAlbum: currentContext?.tracks.length ?? state.item.album?.total_tracks ?? null,
    trackId: state.item.id ?? null,
  };
}

function albumElapsedMs(trackId, trackPositionMs) {
  if (!currentContext) return trackPositionMs;
  const index = currentContext.tracks.findIndex((t) => t.id === trackId);
  if (index === -1) return trackPositionMs;
  const priorMs = currentContext.tracks.slice(0, index).reduce((sum, t) => sum + t.duration_ms, 0);
  return priorMs + trackPositionMs;
}

function publishViewModelFromSdk(state) {
  const track = state.track_window?.current_track;
  if (!track) return;
  handlers.onPlayerBarUpdate?.({
    trackName: track.name,
    albumName: track.album?.name ?? currentContext?.entry?.name ?? '',
    artistName: (track.artists || []).map((a) => a.name).join(', '),
    albumArt: track.album?.images?.[0]?.url ?? currentContext?.entry?.image ?? null,
    isPlaying: !state.paused,
    elapsedMs: albumElapsedMs(track.id, state.position),
    totalMs: currentContext?.totalDurationMs ?? state.duration,
    deviceName: mode === 'sdk' ? null : deviceName,
    mode,
  });
}

function publishViewModelFromConnect(state, snapshot) {
  if (!state?.item) return;
  handlers.onPlayerBarUpdate?.({
    trackName: state.item.name,
    albumName: state.item.album?.name ?? currentContext?.entry?.name ?? '',
    artistName: (state.item.artists || []).map((a) => a.name).join(', '),
    albumArt: state.item.album?.images?.[0]?.url ?? currentContext?.entry?.image ?? null,
    isPlaying: snapshot.isPlaying,
    elapsedMs: albumElapsedMs(snapshot.trackId, snapshot.progressMs),
    totalMs: currentContext?.totalDurationMs ?? snapshot.durationMs,
    deviceName: state.device?.name ?? deviceName,
    mode,
  });
}

/**
 * @param {object} h onPlayerBarUpdate, onSdkTransition, onConnectTransition,
 *   onError, onModeReady(mode). Device selection is no longer prompted at
 *   boot (see startConnectFallback()'s own comment); callers instead catch
 *   NoActiveDeviceError from commitPlayback() at the moment of an actual
 *   play attempt.
 */
export async function initPlayback(h) {
  handlers = h;
  if (!isIosOrMobileSafari()) {
    try {
      await initSdk();
      mode = 'sdk';
      handlers.onModeReady?.('sdk');
      return 'sdk';
    } catch {
      // Fall through to Connect.
    }
  }
  await startConnectFallback();
  return 'connect';
}

// Boot-time device check: silently claims a device only in the one
// unambiguous case (exactly one found), the same way the SDK path's
// silent desktop reconnect claims its own device without asking. Zero or
// several devices used to prompt the listener immediately here, before
// they had done anything -- reported live as the "Wake Spotify" modal
// popping up on every single app open, whether or not they were about to
// play anything. Deciding what to do about no/ambiguous devices is now
// deferred entirely to the moment an actual play is attempted
// (commitPlayback()'s own fresh check below), so the prompt only ever
// appears when there is a real decision blocking real intent -- see
// KNOWN-DEVIATIONS.md.
async function startConnectFallback() {
  const data = await api.getDevices().catch(() => ({ devices: [] }));
  const devices = data?.devices || [];
  if (devices.length === 1) {
    await selectDevice(devices[0].id, devices[0].name);
  }
  await initConnectPolling();
  handlers.onModeReady?.('connect');
}

export async function listDevices() {
  const data = await api.getDevices().catch(() => ({ devices: [] }));
  return data?.devices || [];
}

export async function selectDevice(id, name) {
  deviceId = id;
  deviceName = name;
  mode = 'connect';
  await api.transferPlayback(id, false).catch(() => {});
}

export function getMode() {
  return mode;
}

/**
 * Fetches the album's tracklist/duration so callers (the ceremony's deadwax
 * line) have real data before committing to playback. Does not start audio.
 */
export async function prepareAlbum(entry) {
  const album = await api.getAlbum(entry.id);
  const tracks = (album.tracks?.items || []).map((t) => ({ id: t.id, duration_ms: t.duration_ms, track_number: t.track_number }));
  const totalDurationMs = tracks.reduce((sum, t) => sum + t.duration_ms, 0);
  currentContext = {
    entry,
    tracks,
    totalDurationMs,
    year: (album.release_date || '').slice(0, 4),
  };
  return currentContext;
}

/** Issues the actual PUT /play for the most recently prepared album. */
export async function commitPlayback() {
  if (!currentContext) throw new Error('No album prepared.');
  if (mode === 'sdk' && !deviceId) {
    throw new Error('Longplayur device is not ready yet.');
  }
  if (mode === 'connect' && !deviceId) {
    // Check fresh rather than trusting whatever startConnectFallback()
    // saw at boot: the listener may well have opened Spotify elsewhere
    // since then, and this is also the first time this app actually needs
    // an answer, per the "only ask when there's a real decision to make"
    // change (see that function's own comment).
    const devices = await listDevices();
    if (devices.length === 1) {
      await selectDevice(devices[0].id, devices[0].name);
    } else {
      throw new NoActiveDeviceError(devices);
    }
  }
  await api.playContext(deviceId, currentContext.entry.uri, 0);
  return currentContext;
}

/** Convenience for callers that do not need the ceremony's two-phase flow. */
export async function playAlbum(entry) {
  await prepareAlbum(entry);
  return commitPlayback();
}

export function getCurrentContext() {
  return currentContext;
}

export async function togglePlayPause(isPlaying) {
  if (isPlaying) await api.pause(mode === 'connect' ? deviceId : undefined);
  else await api.resume(mode === 'connect' ? deviceId : undefined);
}

export async function skipNext() {
  await api.next(mode === 'connect' ? deviceId : undefined);
}

export async function skipPrevious() {
  await api.previous(mode === 'connect' ? deviceId : undefined);
}

export function teardown() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = null;
  if (sdkPlayer) sdkPlayer.disconnect();
  sdkPlayer = null;
  deviceId = null;
  mode = null;
}

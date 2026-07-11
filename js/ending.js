// End-of-album detection ONLY: pure functions + thin adapters live elsewhere.
// This is the highest-risk logic in the app (PRD F7): both playback paths
// report "the album finished" differently, and both must be right without
// false-triggering on skips, pauses, scrubs, or repeat.

const NEAR_END_MS = 20000;
const NEAR_END_FRACTION = 0.1;

/**
 * SDK path: the Web Playback SDK reports the last track transitioning to
 * paused at position 0 once its context is exhausted (next_tracks empty).
 * Requires prev -> next to be a fresh pause (prev.paused === false) so a
 * redundant state_changed event at the same paused/0 state does not
 * double-fire the runout groove.
 * @param {object|null} prev previous Spotify.Player state
 * @param {object|null} next current Spotify.Player state
 */
export function detectEndFromSdkStates(prev, next) {
  if (!prev || !next) return false;
  if (!next.paused) return false;
  if (prev.paused) return false;
  if (next.position !== 0) return false;

  const nextTracks = next.track_window?.next_tracks ?? [];
  if (nextTracks.length !== 0) return false;

  const prevId = prev.track_window?.current_track?.id;
  const nextId = next.track_window?.current_track?.id;
  if (!prevId || !nextId || prevId !== nextId) return false;

  return true;
}

/**
 * Connect path (5s polling, PRD F7): there is no "context exhausted" event,
 * so we use a snapshot heuristic: the previous poll had us on the album's
 * last track and near its end, and the following poll shows playback
 * stopped or reset. Requires all three because any one alone is common and
 * harmless (e.g. pausing near the end of a non-last track).
 * @param {{isPlaying:boolean, progressMs:number, durationMs:number, trackNumber:number|null, totalTracksInAlbum:number|null, trackId:string|null}|null} prev
 * @param {{isPlaying:boolean, progressMs:number, durationMs:number, trackNumber:number|null, totalTracksInAlbum:number|null, trackId:string|null}|null} next
 */
export function detectEndFromConnectSnapshots(prev, next) {
  if (!prev || !next) return false;
  if (next.isPlaying) return false;

  if (prev.trackNumber == null || prev.totalTracksInAlbum == null) return false;
  if (prev.trackNumber !== prev.totalTracksInAlbum) return false;

  const remaining = (prev.durationMs ?? 0) - (prev.progressMs ?? 0);
  const nearEnd = remaining <= NEAR_END_MS || (prev.durationMs > 0 && remaining <= prev.durationMs * NEAR_END_FRACTION);
  if (!nearEnd) return false;

  const stoppedOrReset = next.trackId === null || next.progressMs === 0;
  if (!stoppedOrReset) return false;

  return true;
}

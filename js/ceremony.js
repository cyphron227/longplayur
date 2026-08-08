// The ceremony (DESIGN-SPEC §3, the signature element): needle-drop
// choreography, the disc, the held breath, Web Audio crackle, the tonearm
// arc, and the runout groove. All timings come from one TIMINGS object.

import { prefersReducedMotion, formatDuration } from './ui.js';
import * as playback from './playback.js';
import { getArtist } from './spotify.js';
import { getAlbumCredits, getArtistGenre } from './musicbrainz.js';

export const TIMINGS = Object.freeze({
  recedeMs: 600, // 0 -> 600: other covers recede; camera pans; cover scales to 1.6
  titleInMs: 400, // serif title + deadwax fade in
  discSlideStartMs: 600,
  discSlideEndMs: 1100, // disc slide duration: 500ms
  crackleStartMs: 700,
  breathEndMs: 3000, // held breath ends; PUT /play fires
  crackleFadeMs: 200,
  reducedMs: 150, // reduced-motion crossfade collapse
  runoutPulseMs: 800,
  runoutPulseCount: 2,
  runoutRippleStaggerMs: 60,
  runoutWakeAtMs: 800,
  runoutCrackleMaxMs: 30000,
  // Confirmed-play tail (selectAlbum()'s Play button, below): shorter than
  // the direct-drop timings above since the anticipation already happened
  // while the listener was deciding.
  postPlayCrackleDelayMs: 100,
  postPlayBreathMs: 800,
});

const LS_CRACKLE = 'lp_crackle';
const LS_HINT_SHOWN = 'lp_crackle_hint_shown';

let crackleEnabled = readCrackleSetting();

function readCrackleSetting() {
  const raw = localStorage.getItem(LS_CRACKLE);
  return raw === null ? true : raw === 'true';
}

export function isCrackleEnabled() {
  return crackleEnabled;
}

export function setCrackleEnabled(value) {
  crackleEnabled = value;
  localStorage.setItem(LS_CRACKLE, String(value));
}

export function toggleCrackle() {
  setCrackleEnabled(!crackleEnabled);
  return crackleEnabled;
}

// ---------------------------------------------------------------------
// Web Audio crackle: synthesised, no audio file (Docs/CLAUDE.md). The bed
// is two independently-generated (so naturally decorrelated), band-shaped
// brown-noise layers hard-panned apart for stereo width, long enough that
// looping isn't obvious even during a 30s runout crackle. Ticks vary in
// loudness and frequency -- mostly quiet high clicks, occasionally a
// louder low "pop" (dust/scratch thump), sometimes arriving in a small
// cluster -- rather than one uniform sound at an even rate. Never overlaps
// Spotify audio because it always fully fades/stops before PUT /play fires
// (see needleDrop below).
// ---------------------------------------------------------------------

const BED_BUFFER_SECONDS = 8;
const BED_HIGHPASS_HZ = 40; // trims sub-bass mud left over from the leaky integrator.
const BED_LOWPASS_HZ = 2600; // wide enough to keep a little "air", not just a dull rumble.
const BED_PAN = 0.55;

let audioCtx = null;
let brownNoiseBufferL = null;
let brownNoiseBufferR = null;
let whiteNoiseBuffer = null;
let activeBed = null;
let tickTimer = null;
let clusterTimers = [];

function ensureAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function dbToGain(db) {
  return Math.pow(10, db / 20);
}

function buildBrownNoiseBuffer(ctx, seconds = BED_BUFFER_SECONDS) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5; // compensates the amplitude lost by integrating white noise.
  }
  return buffer;
}

function buildWhiteNoiseBuffer(ctx, seconds = 0.05) {
  const length = Math.ceil(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/** One channel of the bed: highpass trims mud, lowpass keeps it from
 * reading as a dull rumble, then an optional pan so the two independently-
 * generated channels sit apart instead of both dead centre. */
function buildBedLayer(ctx, buffer, pan) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const highpass = ctx.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.value = BED_HIGHPASS_HZ;
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = BED_LOWPASS_HZ;
  source.connect(highpass).connect(lowpass);
  if (ctx.createStereoPanner) {
    const panner = ctx.createStereoPanner();
    panner.pan.value = pan;
    lowpass.connect(panner);
    return { source, output: panner };
  }
  return { source, output: lowpass };
}

function startBed(ctx) {
  if (!brownNoiseBufferL) brownNoiseBufferL = buildBrownNoiseBuffer(ctx);
  if (!brownNoiseBufferR) brownNoiseBufferR = buildBrownNoiseBuffer(ctx);
  const left = buildBedLayer(ctx, brownNoiseBufferL, -BED_PAN);
  const right = buildBedLayer(ctx, brownNoiseBufferR, BED_PAN);
  const gain = ctx.createGain();
  gain.gain.value = 0;
  left.output.connect(gain);
  right.output.connect(gain);
  gain.connect(ctx.destination);
  left.source.start();
  right.source.start();
  gain.gain.linearRampToValueAtTime(dbToGain(-38), ctx.currentTime + TIMINGS.crackleFadeMs / 1000);
  return { sources: [left.source, right.source], gain };
}

function stopBed(bed, ctx, fadeMs) {
  if (!bed) return;
  const now = ctx.currentTime;
  bed.gain.gain.cancelScheduledValues(now);
  bed.gain.gain.setValueAtTime(bed.gain.gain.value, now);
  bed.gain.gain.linearRampToValueAtTime(0, now + fadeMs / 1000);
  setTimeout(() => {
    bed.sources.forEach((s) => { try { s.stop(); } catch { /* already stopped */ } });
  }, fadeMs + 50);
}

/** One crackle event. ~12% are a lower, louder "pop" (dust/scratch thump);
 * the rest are quiet high ticks with a skewed-random peak so most are
 * faint and only the rare one stands out, instead of every hit landing at
 * the same volume. Panned to a random spot instead of sitting dead centre. */
function fireTick(ctx) {
  if (!whiteNoiseBuffer) whiteNoiseBuffer = buildWhiteNoiseBuffer(ctx);
  const isPop = Math.random() < 0.12;

  const source = ctx.createBufferSource();
  source.buffer = whiteNoiseBuffer;
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = isPop ? 250 + Math.random() * 350 : 1500 + Math.random() * 2500;
  bandpass.Q.value = isPop ? 1.2 : 1.8 + Math.random() * 1.5;

  const gain = ctx.createGain();
  const durationMs = isPop ? 15 + Math.random() * 20 : 2 + Math.random() * 8;
  const peak = isPop ? 0.35 + Math.random() * 0.25 : 0.04 + Math.random() ** 2.2 * 0.22;
  const now = ctx.currentTime;
  const decayEnd = now + durationMs / 1000;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(peak, now + 0.0007);
  gain.gain.exponentialRampToValueAtTime(Math.max(peak * 0.01, 0.0001), decayEnd);
  gain.gain.linearRampToValueAtTime(0, decayEnd + 0.005);

  source.connect(bandpass);
  let node = bandpass;
  if (ctx.createStereoPanner) {
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.random() * 1.4 - 0.7;
    bandpass.connect(panner);
    node = panner;
  }
  node.connect(gain).connect(ctx.destination);
  source.start(now);
  source.stop(decayEnd + 0.02);
}

function scheduleTicks(ctx) {
  const next = () => {
    fireTick(ctx);
    // Real dust isn't evenly spaced: let a second hit occasionally follow
    // almost immediately, like a small cluster, rather than one tick at a
    // perfectly metronomic rate.
    if (Math.random() < 0.18) {
      clusterTimers.push(setTimeout(() => fireTick(ctx), 8 + Math.random() * 25));
    }
    const delayMs = 1000 / (2 + Math.random() * 4); // 2 to 6 primary ticks/sec
    tickTimer = setTimeout(next, delayMs);
  };
  next();
}

function stopTicks() {
  if (tickTimer) clearTimeout(tickTimer);
  tickTimer = null;
  clusterTimers.forEach(clearTimeout);
  clusterTimers = [];
}

/** @param {{maxDurationMs?: number}} [opts] */
export function startCrackle(opts = {}) {
  if (!crackleEnabled) return;
  const ctx = ensureAudioContext();
  activeBed = startBed(ctx);
  scheduleTicks(ctx);
  if (opts.maxDurationMs) {
    setTimeout(() => stopCrackle(), opts.maxDurationMs);
  }
}

/** @param {{soft?: boolean}} [opts] soft: a quick fade with one final tick, for skips. */
export function stopCrackle(opts = {}) {
  stopTicks();
  if (activeBed && audioCtx) {
    if (opts.soft) fireTick(audioCtx);
    stopBed(activeBed, audioCtx, opts.soft ? 80 : TIMINGS.crackleFadeMs);
    activeBed = null;
  }
}

// ---------------------------------------------------------------------
// The disc (signature element)
// ---------------------------------------------------------------------

function buildDiscSvg() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'ceremony-disc');

  const label = document.createElementNS(ns, 'circle');
  label.setAttribute('cx', '50');
  label.setAttribute('cy', '50');
  label.setAttribute('r', '16');
  label.setAttribute('class', 'disc-label');
  svg.appendChild(label);

  [45, 34, 24].forEach((r) => {
    const ring = document.createElementNS(ns, 'circle');
    ring.setAttribute('cx', '50');
    ring.setAttribute('cy', '50');
    ring.setAttribute('r', String(r));
    ring.setAttribute('class', 'groove-ring');
    svg.appendChild(ring);
  });

  const radius = 47;
  const circumference = 2 * Math.PI * radius;
  const arc = document.createElementNS(ns, 'circle');
  arc.setAttribute('cx', '50');
  arc.setAttribute('cy', '50');
  arc.setAttribute('r', String(radius));
  arc.setAttribute('class', 'tonearm-arc');
  arc.style.transform = 'rotate(-90deg)';
  arc.style.transformOrigin = '50% 50%';
  arc.style.strokeDasharray = String(circumference);
  arc.style.strokeDashoffset = String(circumference);
  svg.appendChild(arc);

  return { svg, arc, circumference };
}

const discsByAlbum = new Map(); // albumId -> { svg, arc, circumference } (settled, attached to a cell)

// The currently enlarged "now playing" cover, if any: { albumId, cover,
// text, disc: {svg, arc, circumference} }. Per explicit request, this stays
// on screen after the needle-drop ceremony ends instead of auto-shrinking;
// it only settles away via settleActiveOverlay() (gallery dragged, or the
// album finishes) or gets fully retired if a different album starts.
let activeOverlay = null;

function getActiveDisc(albumId) {
  if (activeOverlay?.albumId === albumId) return activeOverlay.disc;
  return discsByAlbum.get(albumId) ?? null;
}

export function retireDisc(albumId) {
  const rec = discsByAlbum.get(albumId);
  if (rec) {
    rec.svg.remove();
    discsByAlbum.delete(albumId);
  }
  if (activeOverlay?.albumId === albumId) {
    activeOverlay.cover.remove();
    activeOverlay.text?.remove();
    activeOverlay = null;
  }
}

function attachPersistentDisc(wallApi, albumId) {
  retireDisc(albumId);
  const cellEl = wallApi.getCellEl(albumId);
  if (!cellEl) return null;
  const rec = buildDiscSvg();
  rec.svg.classList.add('is-out');
  cellEl.appendChild(rec.svg);
  discsByAlbum.set(albumId, rec);
  return rec;
}

/** Called on every player-bar update so the tonearm arc creeps continuously. */
export function updateTonearmProgress(albumId, elapsedMs, totalMs) {
  const rec = getActiveDisc(albumId);
  if (!rec || !totalMs) return;
  const fraction = Math.max(0, Math.min(1, elapsedMs / totalMs));
  rec.arc.style.strokeDashoffset = String(rec.circumference * (1 - fraction));
}

/**
 * Eases the currently active enlarged cover back into its actual cell,
 * transferring its disc (at the same progress, no jump back to 0%) to a
 * persistent per-cell disc. The two conditions that should call this: the
 * gallery gets dragged, or the album finishes (runoutGroove below).
 * @param {object} wallApi
 * @param {{animate?: boolean}} [opts]
 */
export async function settleActiveOverlay(wallApi, { animate = true } = {}) {
  if (!activeOverlay) return;
  const { albumId, cover, text, disc } = activeOverlay;
  activeOverlay = null; // clear immediately so a fast repeat call is a no-op.

  const reduced = prefersReducedMotion();
  const settleDur = reduced ? TIMINGS.reducedMs : TIMINGS.recedeMs;
  const settledRect = wallApi.getCellRect(albumId);

  if (settledRect) {
    cover.style.transition = animate
      ? `left ${settleDur}ms var(--ease), top ${settleDur}ms var(--ease), width ${settleDur}ms var(--ease), height ${settleDur}ms var(--ease)`
      : 'none';
    text?.classList.remove('is-visible');
    Object.assign(cover.style, {
      left: `${settledRect.x}px`, top: `${settledRect.y}px`,
      width: `${settledRect.width}px`, height: `${settledRect.height}px`,
    });
    if (animate) await delay(settleDur);
  }

  cover.remove();
  text?.remove();
  wallApi.revealTile(albumId);

  const persisted = attachPersistentDisc(wallApi, albumId);
  if (persisted) {
    persisted.arc.style.strokeDashoffset = disc.arc.style.strokeDashoffset;
  }
}

/**
 * The inverse of settleActiveOverlay(): brings the currently-playing
 * album's cover back to the foreground as the enlarged "now playing" hero,
 * from wherever it currently is -- a persistent per-cell disc (settled
 * earlier by dragging the gallery), or already the active hero elsewhere
 * on screen (just re-centres the camera on it). Reached by tapping the
 * small album art on the player bar; per explicit request, that should
 * "resurface" the main graphic rather than doing nothing once the hero has
 * settled away.
 * @param {object} entry the currently-playing pool-shaped entry (id, name,
 *   artist, image) -- passed directly rather than looked up from wallApi,
 *   since the playing album may not be present in whatever pool is
 *   currently mounted (e.g. dropped from Records nearby or Runout groove).
 * @param {{wallApi: object, wallViewportEl: HTMLElement}} ctx
 */
export async function resurfaceNowPlaying(entry, ctx) {
  const { wallApi, wallViewportEl } = ctx;

  // Already the hero somewhere on screen: just make sure the camera is
  // actually centred on it (it may have been dragged away from since),
  // rather than tearing down and rebuilding anything.
  if (activeOverlay?.albumId === entry.id) {
    wallApi.panToAlbum(entry.id, { animate: true });
    return;
  }

  // A different album is somehow still the active hero (shouldn't happen
  // in practice, since only one album plays at a time) -- settle it first,
  // the same guard selectAlbum() uses.
  if (activeOverlay) {
    await settleActiveOverlay(wallApi, { animate: true });
  }

  const reduced = prefersReducedMotion();
  const layer = ensureLayer(wallViewportEl);
  const cellRect = wallApi.getCellRect(entry.id) || fallbackCenterRect(wallViewportEl);

  // Recover whatever progress the persistent per-cell disc had already
  // reached (attachPersistentDisc()/settleActiveOverlay() keep this in
  // sync with playback) so resurfacing never jumps the tonearm arc back to
  // 0. An album not present in the mounted pool never had a cell to attach
  // a persistent disc to in the first place, so there is nothing to
  // recover -- its resurfaced arc simply starts at 0 and catches back up
  // to the real position within a second, since updateTonearmProgress()
  // is driven by the player bar's own live elapsed/total on every poll
  // regardless.
  const priorOffset = discsByAlbum.get(entry.id)?.arc.style.strokeDashoffset;
  retireDisc(entry.id); // removes the persistent per-cell disc, if any.

  wallApi.recedeAllExcept(entry.id);
  wallApi.panToAlbum(entry.id, { animate: true });

  const moveDur = reduced ? TIMINGS.reducedMs : TIMINGS.recedeMs;
  const cover = document.createElement('div');
  cover.className = 'ceremony-cover';
  Object.assign(cover.style, {
    left: `${cellRect.x}px`, top: `${cellRect.y}px`,
    width: `${cellRect.width}px`, height: `${cellRect.height}px`,
    transition: `left ${moveDur}ms var(--ease), top ${moveDur}ms var(--ease), width ${moveDur}ms var(--ease), height ${moveDur}ms var(--ease)`,
  });
  if (entry.image) {
    const img = document.createElement('img');
    img.src = entry.image;
    img.alt = '';
    cover.appendChild(img);
  }
  const disc = buildDiscSvg();
  disc.svg.classList.add('is-out'); // already playing: appears settled immediately, no slide-in.
  if (priorOffset !== undefined) disc.arc.style.strokeDashoffset = priorOffset;
  cover.appendChild(disc.svg);
  layer.appendChild(cover);

  cover.getBoundingClientRect(); // force layout before animating.
  const target = computeEnlargedTarget(wallViewportEl);
  requestAnimationFrame(() => {
    Object.assign(cover.style, {
      left: `${target.left}px`, top: `${target.top}px`,
      width: `${target.width}px`, height: `${target.height}px`,
    });
  });
  if (!reduced) await delay(moveDur);

  // No text panel: the steady "now playing" state never shows one (it
  // fades out the moment commitPlayback() succeeds during the original
  // needle drop), so resurfacing matches that same at-rest appearance.
  wallApi.enterRestingState(entry.id, { keepHidden: true });
  wallApi.setCurrent(entry.id);
  activeOverlay = { albumId: entry.id, cover, text: null, disc };
}

// ---------------------------------------------------------------------
// Needle drop
// ---------------------------------------------------------------------

function delay(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

function deadwaxLine(entry, context) {
  const year = context?.year;
  const trackCount = context?.tracks?.length ?? entry.totalTracks ?? null;
  const duration = context?.totalDurationMs ? formatDuration(context.totalDurationMs) : null;
  const parts = [entry.artist, year, trackCount ? `${trackCount} tracks` : null, duration].filter(Boolean);
  return parts.join(' · '); // interpunct, never a dash
}

// Genre lives on the artist, not the album -- Spotify's album response
// never populates one of its own -- so this is a second, small request
// alongside prepareAlbum(). Cached per artist for the tab's lifetime (and,
// below, persisted to localStorage) since a wall full of the same artist's
// albums shouldn't refetch it each time, and coverage is patchy enough
// that failing quietly and falling back to the release year is the honest
// default rather than leaving a blank line.
const artistGenreCache = new Map();

// Post-launch addition: Spotify's own GET /artists/{id} `genres` array has
// been observed live to come back empty for most/all artists now, not just
// the "patchy coverage" originally assumed above (not documented anywhere
// by Spotify, and not independently verifiable against a live account in
// this build environment -- an inference from this app's own live
// behaviour, per the honesty rule, not a confirmed API change). Genre by
// artist NAME via MusicBrainz (musicbrainz.js's getArtistGenre(), a real
// first-class field there) is the fallback, tried only when Spotify's own
// comes back empty, so a working Spotify response is never overridden.
const LS_ARTIST_GENRE_CACHE = 'lp_artist_genre_cache';
const ARTIST_GENRE_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // genre for a given artist essentially never changes; matches musicbrainz.js's own credits cache TTL.
const ARTIST_GENRE_CACHE_MAX = 1000;

function loadPersistedGenreCache() {
  try {
    const raw = localStorage.getItem(LS_ARTIST_GENRE_CACHE);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function readPersistedGenre(artistId) {
  const cache = loadPersistedGenreCache();
  const entry = cache[artistId];
  if (!entry || Date.now() - entry.at >= ARTIST_GENRE_CACHE_TTL_MS) return undefined;
  return entry.genre; // may itself be null (a confirmed miss from a prior session, worth caching too).
}

function writePersistedGenre(artistId, genre) {
  try {
    const cache = loadPersistedGenreCache();
    if (!(artistId in cache) && Object.keys(cache).length >= ARTIST_GENRE_CACHE_MAX) return; // simplest correct cap: stop adding once full, keep what's already learned.
    cache[artistId] = { genre, at: Date.now() };
    localStorage.setItem(LS_ARTIST_GENRE_CACHE, JSON.stringify(cache));
  } catch {
    // localStorage full/unavailable: resolves again next session.
  }
}

/** @param {string} artistId @param {string} [artistName] needed only for
 * the MusicBrainz fallback, which has no relationship to a Spotify id and
 * must search by name instead. */
async function fetchPrimaryGenre(artistId, artistName) {
  if (!artistId) return null;
  if (artistGenreCache.has(artistId)) return artistGenreCache.get(artistId);

  const persisted = readPersistedGenre(artistId);
  if (persisted !== undefined) {
    artistGenreCache.set(artistId, persisted);
    return persisted;
  }

  let genre = null;
  try {
    const artist = await getArtist(artistId);
    genre = artist?.genres?.[0] || null;
  } catch {
    genre = null;
  }

  if (!genre && artistName) {
    // A transient MusicBrainz failure (its own rate limit, a dropped
    // request) must NOT be cached as a confirmed "no genre" -- that exact
    // mistake, made once, permanently mis-labelled a whole burst of
    // artists as genre-less for the cache's full TTL the first time this
    // was built (see KNOWN-DEVIATIONS.md). Return null for this call
    // without caching, so a later attempt (a fresh pool mount, reopening
    // Flip) retries it honestly instead of trusting a stuck failure.
    const result = await getArtistGenre(artistName).catch(() => ({ genre: null, failed: true }));
    if (result.failed) return null;
    genre = result.genre;
  }

  artistGenreCache.set(artistId, genre);
  writePersistedGenre(artistId, genre);
  return genre;
}

/** Exposed so other modules needing an artist's primary genre (flip.js's
 * genre sort/filter, runout.js's genre-based directions) reuse this same
 * cache instead of fetching and caching it a second time.
 * @param {string} artistId
 * @param {string} [artistName] pass this whenever known -- see
 *   fetchPrimaryGenre() above for why. */
export async function getPrimaryGenre(artistId, artistName) {
  return fetchPrimaryGenre(artistId, artistName);
}

// ---------------------------------------------------------------------
// Credits (INCREMENT-02 Phase 4): a collapsed disclosure under the
// selection preview's own deadwax description line, closed by default,
// fetched from MusicBrainz only on open -- not pre-fetched across the
// whole Wall, learning directly from the bag-preview request-burst mistake
// already documented in KNOWN-DEVIATIONS.md. Lives on the selection preview
// (selectAlbum(), below) rather than the needle-drop ceremony's own
// briefer text, since the preview is the one "album view" that stays on
// screen long enough (waiting on Play/"Find something else") for a
// disclosure to be worth opening; the ceremony's own text fades within
// about a second of Play being pressed.
// ---------------------------------------------------------------------

function buildCreditsDisclosure(entry) {
  const wrap = document.createElement('div');
  wrap.className = 'preview-credits';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'preview-credits-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  chevron.setAttribute('class', 'icon');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#icon-chevron');
  chevron.appendChild(use);
  const label = document.createElement('span');
  label.textContent = 'Credits';
  toggle.append(chevron, label);

  const body = document.createElement('div');
  body.className = 'preview-credits-body';
  body.hidden = true;

  let loaded = false;
  toggle.addEventListener('click', async () => {
    const wasExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!wasExpanded));
    toggle.classList.toggle('is-open', !wasExpanded);
    body.hidden = wasExpanded;
    if (wasExpanded || loaded) return;
    loaded = true;

    body.textContent = 'Loading credits…';
    // Every string below (role labels are this app's own fixed vocabulary,
    // but artist names come straight from MusicBrainz) is untrusted the
    // same way Spotify's own strings are -- built via textContent, never
    // interpolated into innerHTML.
    //
    // entry.artist is every credited artist joined with ", " (pool
    // entries build it as `(album.artists || []).map(a => a.name).join(', ')`);
    // sending that whole string as MusicBrainz's `artist:"..."` search
    // term looks for one artist literally named "A, B", which essentially
    // never matches. First-artist-only is the same fix genre lookups
    // already needed for the same reason (see flip.js/runout.js's own
    // `.split(',')[0].trim()`), and reported live as "credits are never
    // found" -- see KNOWN-DEVIATIONS.md.
    const primaryArtist = (entry.artist || '').split(',')[0].trim();
    const { credits } = await getAlbumCredits({ artist: primaryArtist, title: entry.name });
    body.textContent = '';
    if (!credits || credits.length === 0) {
      body.textContent = 'No credits found.';
      return;
    }
    credits.forEach(({ role, artists }) => {
      const line = document.createElement('div');
      line.className = 'preview-credits-line';
      const roleEl = document.createElement('span');
      roleEl.className = 'preview-credits-role deadwax';
      roleEl.textContent = role;
      const namesEl = document.createElement('span');
      namesEl.className = 'preview-credits-names';
      namesEl.textContent = artists.join(', ');
      line.append(roleEl, namesEl);
      body.appendChild(line);
    });
  });

  wrap.append(toggle, body);
  return wrap;
}

/** Same as deadwaxLine() but without the artist (selectAlbum()'s preview
 * already shows the artist on its own line above this one), leading with
 * the artist's primary genre in place of the release year where Spotify
 * actually has genre data for them, since it reads as more characterful
 * than a bare year -- falling back to the year where it doesn't. */
function descriptionLine(entry, context, genre) {
  const year = context?.year;
  const trackCount = context?.tracks?.length ?? entry.totalTracks ?? null;
  const duration = context?.totalDurationMs ? formatDuration(context.totalDurationMs) : null;
  const parts = [genre || year, trackCount ? `${trackCount} tracks` : null, duration].filter(Boolean);
  return parts.join(' · ');
}

let hasEverDropped = localStorage.getItem(LS_HINT_SHOWN) === 'true';

function showCrackleHintOnce(hintEl) {
  if (hasEverDropped || !hintEl) return;
  hintEl.hidden = false;
  localStorage.setItem(LS_HINT_SHOWN, 'true');
  hasEverDropped = true;
}

let ceremonyLayer = null;
function ensureLayer(viewportEl) {
  if (!ceremonyLayer) {
    ceremonyLayer = document.createElement('div');
    ceremonyLayer.className = 'ceremony-layer';
    viewportEl.appendChild(ceremonyLayer);
  }
  return ceremonyLayer;
}

// Records nearby (PRD F10) albums can be dropped while they are not part
// of the currently-mounted wall's pool, so there may be no cell to animate
// from; fall back to a small rect at the viewport centre so the ceremony
// still runs in full rather than silently doing nothing.
function fallbackCenterRect(wallViewportEl) {
  return {
    x: wallViewportEl.clientWidth / 2 - 60,
    y: wallViewportEl.clientHeight / 2 - 60,
    width: 120,
    height: 120,
  };
}

// The enlarged cover's target size is deliberately independent of the
// tapped tile's own live bounding rect: DomeGallery tiles sit on a
// rotating 3D dome, so getBoundingClientRect() on one is a *projected*
// size that varies with perspective depending on where it currently sits
// (near the centre of view vs near the edge) -- scaling off it directly
// made the enlarged cover, and everything positioned relative to it (the
// text above it), inconsistent from album to album. This fixed,
// viewport-relative size is the same every time; the cover still animates
// FROM the tile's real (small, possibly distorted) rect, just always TO
// the same place.
const ENLARGED_MAX_PX = 420;

function computeEnlargedTarget(wallViewportEl) {
  const size = Math.min(
    wallViewportEl.clientWidth * 0.62,
    wallViewportEl.clientHeight * 0.5,
    ENLARGED_MAX_PX
  );
  return {
    width: size,
    height: size,
    left: wallViewportEl.clientWidth / 2 - size / 2,
    top: wallViewportEl.clientHeight / 2 - size / 2,
  };
}

/**
 * Runs the full needle-drop choreography immediately, with no selection
 * preview gate, and leaves the enlarged cover on screen as the active
 * overlay (does not auto-shrink; see settleActiveOverlay()). Used by
 * callers that already represent a confirmed choice -- resuming a needle
 * drop once a playback device has been picked, and Records nearby's shelf
 * (a one-tap "quick add", not the Wall's primary selection flow; see
 * selectAlbum() below for that). Resolves once that overlay is in place.
 * @param {object} entry pool entry being dropped
 * @param {{wallApi: object, wallViewportEl: HTMLElement, currentAlbumId: string|null, crackleHintEl: HTMLElement}} ctx
 */
export async function needleDrop(entry, ctx) {
  const { wallApi, wallViewportEl, currentAlbumId, crackleHintEl } = ctx;
  const reduced = prefersReducedMotion();

  if (currentAlbumId && currentAlbumId !== entry.id) {
    retireDisc(currentAlbumId);
    wallApi.markPlayed(currentAlbumId);
  }

  const layer = ensureLayer(wallViewportEl);
  const cellRect = wallApi.getCellRect(entry.id) || fallbackCenterRect(wallViewportEl);

  wallApi.recedeAllExcept(entry.id);
  wallApi.panToAlbum(entry.id, { animate: true });

  const moveDur = reduced ? TIMINGS.reducedMs : TIMINGS.recedeMs;
  const cover = document.createElement('div');
  cover.className = 'ceremony-cover';
  Object.assign(cover.style, {
    left: `${cellRect.x}px`, top: `${cellRect.y}px`,
    width: `${cellRect.width}px`, height: `${cellRect.height}px`,
    transition: `left ${moveDur}ms var(--ease), top ${moveDur}ms var(--ease), width ${moveDur}ms var(--ease), height ${moveDur}ms var(--ease)`,
  });
  if (entry.image) {
    const img = document.createElement('img');
    img.src = entry.image;
    img.alt = '';
    cover.appendChild(img);
  }
  const disc = buildDiscSvg();
  cover.appendChild(disc.svg);
  layer.appendChild(cover);

  const text = document.createElement('div');
  text.className = 'ceremony-text';
  text.innerHTML = '<div class="ceremony-title"></div><div class="ceremony-deadwax"></div>';
  text.querySelector('.ceremony-title').textContent = entry.name;
  layer.appendChild(text);

  cover.getBoundingClientRect(); // force layout before animating.

  const target = computeEnlargedTarget(wallViewportEl);
  text.style.top = `${Math.max(8, target.top - 56)}px`;

  requestAnimationFrame(() => {
    Object.assign(cover.style, {
      left: `${target.left}px`, top: `${target.top}px`,
      width: `${target.width}px`, height: `${target.height}px`,
    });
  });

  // Fetch tracklist/duration in parallel with the intro so the deadwax line
  // (t=400ms) can show real data without delaying the choreography.
  const preparePromise = playback.prepareAlbum(entry).catch(() => null);

  let skipped = false;
  let resolveSkip;
  const skipPromise = new Promise((resolve) => { resolveSkip = resolve; });
  const onSkipKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { skipped = true; resolveSkip(); }
  };
  const onSkipClick = () => { skipped = true; resolveSkip(); };
  window.addEventListener('keydown', onSkipKey);
  layer.addEventListener('click', onSkipClick);

  if (reduced) {
    // Reduced motion: collapse to a single short crossfade, disc appears
    // without sliding, no held breath.
    await delay(TIMINGS.reducedMs);
    const context = await preparePromise;
    text.querySelector('.ceremony-deadwax').textContent = deadwaxLine(entry, context);
    text.classList.add('is-visible');
    disc.svg.classList.add('is-out');
  } else {
    await Promise.race([delay(TIMINGS.titleInMs), skipPromise]);
    const context = await preparePromise;
    text.querySelector('.ceremony-deadwax').textContent = deadwaxLine(entry, context);
    if (!skipped) text.classList.add('is-visible');

    await Promise.race([delay(TIMINGS.discSlideStartMs - TIMINGS.titleInMs), skipPromise]);
    disc.svg.classList.add('is-out');

    await Promise.race([delay(TIMINGS.crackleStartMs - TIMINGS.discSlideStartMs), skipPromise]);
    if (!skipped) startCrackle();

    if (!skipped) {
      await Promise.race([delay(TIMINGS.breathEndMs - TIMINGS.crackleStartMs), skipPromise]);
    }
  }

  window.removeEventListener('keydown', onSkipKey);
  layer.removeEventListener('click', onSkipClick);
  stopCrackle({ soft: skipped });

  try {
    await playback.commitPlayback();
  } catch (err) {
    // Abort the ceremony visually (no disc, no resting state for a record
    // that never played) and let the caller decide how to explain it.
    cover.remove();
    text.remove();
    wallApi.clearResting();
    throw err;
  }

  // The cover stays large and expanded here, per explicit request: no
  // auto-shrink. It only eases back into its actual cell via
  // settleActiveOverlay(), triggered by dragging the gallery or the album
  // finishing (see main.js's onGalleryDragStart wiring, and runoutGroove
  // below). Title/deadwax still fade per the original choreography.
  text.classList.remove('is-visible');
  wallApi.enterRestingState(entry.id, { keepHidden: true });
  wallApi.setCurrent(entry.id);
  activeOverlay = { albumId: entry.id, cover, text, disc };
  showCrackleHintOnce(crackleHintEl);
}

// ---------------------------------------------------------------------
// Runout groove
// ---------------------------------------------------------------------

/**
 * Plays the runout-groove sequence once the album has finished: the arc
 * completing, its two pulses, the runout crackle, and settling the "now
 * playing" hero cover back into its cell. Purely the visual completion --
 * choosing what happens next used to live here too (physical-neighbour
 * wake-ripple, zoom-to-fit-all at the wall's edge), but INCREMENT-03 Phase
 * 3's Runout groove screen is now that default next step instead, built
 * from richer data than physical dome adjacency (see js/runout.js and
 * main.js's handleRunout()). Nothing about the old neighbour-choice
 * mechanism was deleted -- wallApi.getNeighbors()/zoomToFitAll() are both
 * still exactly as they were, only no longer called automatically from
 * here (see KNOWN-DEVIATIONS.md).
 * @param {string} albumId
 * @param {{wallApi: object}} ctx
 */
export async function runoutGroove(albumId, ctx) {
  const { wallApi } = ctx;
  const reduced = prefersReducedMotion();
  const rec = getActiveDisc(albumId);

  if (rec) rec.arc.style.strokeDashoffset = '0'; // arc reaches 360 degrees.

  if (isCrackleEnabled()) {
    startCrackle({ maxDurationMs: TIMINGS.runoutCrackleMaxMs });
  }

  if (rec && !reduced) {
    for (let i = 0; i < TIMINGS.runoutPulseCount; i += 1) {
      rec.svg.classList.add('is-pulsing');
      await delay(TIMINGS.runoutPulseMs / 2);
      rec.svg.classList.remove('is-pulsing');
      await delay(TIMINGS.runoutPulseMs / 2);
    }
  }

  wallApi.markPlayed(albumId);

  // The album finishing is one of the two conditions that ends the "now
  // playing" hero view (the other is dragging the gallery, see main.js);
  // settle the enlarged cover back into its cell now, keeping the
  // completed disc/arc rather than discarding it.
  if (activeOverlay?.albumId === albumId) {
    await settleActiveOverlay(wallApi, { animate: !reduced });
  }

  stopCrackle();
}

/** Retained for the "browse the full wall instead" path (js/runout.js's
 * screen still reaches wallApi.zoomToFitAll() directly, unchanged, for
 * that link) and any other caller wanting the original PRD-copy-deck
 * wording; no longer called by the default runout flow itself. */
export function runoutPrompt(atEdge) {
  return atEdge
    ? "You've reached the edge of the wall. Pick from the shelf."
    : "The session isn't over. Choose the next record.";
}

// ---------------------------------------------------------------------
// Select an album: brings its cover to the foreground with its name,
// artist, and a one-line description (Spotify's API has no free-text
// album description, so this reuses the ceremony's own deadwax line:
// artist, year, track count, total duration), then waits for the listener
// to press Play or dismiss it ("Find something else") -- nothing plays
// until Play is pressed. This is the Wall's primary tap/long-press flow
// (both call this the same way); see needleDrop() above for the direct,
// no-preview path used elsewhere (Records nearby, resuming after a
// device picker).
// ---------------------------------------------------------------------

let openPreview = null; // { entry, cancel: () => void }, set only while a decision is pending.

/**
 * @param {object} entry pool entry being selected
 * @param {{wallApi: object, wallViewportEl: HTMLElement, currentAlbumId: string|null, crackleHintEl: HTMLElement}} ctx
 * @returns {Promise<{committed: boolean}>} committed: true once playback
 *   has actually started (the caller should record the journal entry the
 *   same way it would for needleDrop()); false if dismissed without
 *   playing, in which case nothing changed and there is nothing to record.
 */
export async function selectAlbum(entry, ctx) {
  const { wallApi, wallViewportEl, currentAlbumId, crackleHintEl } = ctx;

  if (activeOverlay?.albumId === entry.id) return { committed: true }; // already the "now playing" hero.
  if (openPreview) openPreview.cancel();

  const reduced = prefersReducedMotion();

  // A different album is already the enlarged "now playing" hero: ease it
  // back into its cell first (keeping its disc/progress as a persistent
  // per-cell disc, same as a gallery drag) so the two covers don't overlap.
  // Playback itself is untouched -- it keeps playing regardless of what
  // happens to this preview.
  if (activeOverlay && activeOverlay.albumId !== entry.id) {
    await settleActiveOverlay(wallApi, { animate: true });
  }

  const layer = ensureLayer(wallViewportEl);
  const cellRect = wallApi.getCellRect(entry.id) || fallbackCenterRect(wallViewportEl);

  wallApi.recedeAllExcept(entry.id);
  wallApi.panToAlbum(entry.id, { animate: true });

  const moveDur = reduced ? TIMINGS.reducedMs : TIMINGS.recedeMs;
  const cover = document.createElement('div');
  cover.className = 'ceremony-cover';
  Object.assign(cover.style, {
    left: `${cellRect.x}px`, top: `${cellRect.y}px`,
    width: `${cellRect.width}px`, height: `${cellRect.height}px`,
    transition: `left ${moveDur}ms var(--ease), top ${moveDur}ms var(--ease), width ${moveDur}ms var(--ease), height ${moveDur}ms var(--ease)`,
  });
  if (entry.image) {
    const img = document.createElement('img');
    img.src = entry.image;
    img.alt = '';
    cover.appendChild(img);
  }
  layer.appendChild(cover);

  // The text sits on its own opaque panel (not just floating over
  // whatever is behind it) so it stays readable regardless of the album
  // art's own colours or what part of the dimmed wall happens to show
  // through behind it.
  const text = document.createElement('div');
  text.className = 'ceremony-text';
  text.innerHTML = '<div class="preview-text-panel"><div class="preview-title"></div><div class="preview-artist"></div><div class="preview-description deadwax"></div></div>';
  text.querySelector('.preview-title').textContent = entry.name;
  text.querySelector('.preview-artist').textContent = entry.artist;
  text.querySelector('.preview-text-panel').appendChild(buildCreditsDisclosure(entry));
  layer.appendChild(text);

  const scrim = document.createElement('div');
  scrim.className = 'preview-scrim';
  layer.insertBefore(scrim, cover); // scrim sits behind the cover/text.

  const playBtn = document.createElement('button');
  playBtn.type = 'button';
  playBtn.className = 'preview-play-btn';
  playBtn.setAttribute('aria-label', `Play ${entry.name}`);
  playBtn.title = `Play ${entry.name}`;
  playBtn.innerHTML = '<svg class="icon"><use href="#icon-play"/></svg>';
  layer.appendChild(playBtn);

  const findBtn = document.createElement('button');
  findBtn.type = 'button';
  findBtn.className = 'preview-find-btn';
  findBtn.textContent = 'Find something else';
  layer.appendChild(findBtn);

  cover.getBoundingClientRect(); // force layout before animating.

  // Fixed target size (see computeEnlargedTarget's own comment): the same
  // for every album, so the text panel above it lands in the same place
  // every time instead of drifting into (or away from) the cover depending
  // on where the tapped tile happened to sit on the rotating dome.
  const target = computeEnlargedTarget(wallViewportEl);
  text.style.top = `${Math.max(8, target.top - 108)}px`;
  playBtn.style.left = `${target.left + target.width / 2}px`;
  playBtn.style.top = `${target.top + target.height / 2}px`;
  findBtn.style.left = `${target.left + target.width / 2}px`;
  findBtn.style.top = `${Math.min(wallViewportEl.clientHeight - 52, target.top + target.height + 16)}px`;

  requestAnimationFrame(() => {
    scrim.classList.add('is-visible');
    Object.assign(cover.style, {
      left: `${target.left}px`, top: `${target.top}px`,
      width: `${target.width}px`, height: `${target.height}px`,
    });
    text.classList.add('is-visible');
    playBtn.classList.add('is-visible');
    findBtn.classList.add('is-visible');
  });

  Promise.all([
    playback.prepareAlbum(entry).catch(() => null),
    fetchPrimaryGenre(entry.artistId, (entry.artist || '').split(',')[0].trim()),
  ]).then(([context, genre]) => {
    const line = text.querySelector('.preview-description');
    if (line) line.textContent = descriptionLine(entry, context, genre);
  });

  const decision = await new Promise((resolve) => {
    const onKey = (e) => { if (e.key === 'Escape') finish('dismiss'); };
    const onPlayClick = () => finish('play');
    const onFindClick = () => finish('dismiss');
    const onScrimClick = () => finish('dismiss');
    function finish(result) {
      window.removeEventListener('keydown', onKey);
      playBtn.removeEventListener('click', onPlayClick);
      findBtn.removeEventListener('click', onFindClick);
      scrim.removeEventListener('click', onScrimClick);
      openPreview = null;
      resolve(result);
    }
    window.addEventListener('keydown', onKey);
    playBtn.addEventListener('click', onPlayClick);
    findBtn.addEventListener('click', onFindClick);
    scrim.addEventListener('click', onScrimClick);
    openPreview = { entry, cancel: () => finish('dismiss') };
  });

  const decisionDur = reduced ? TIMINGS.reducedMs : TIMINGS.recedeMs;
  scrim.classList.remove('is-visible');
  playBtn.classList.remove('is-visible');
  findBtn.classList.remove('is-visible');
  setTimeout(() => { scrim.remove(); playBtn.remove(); findBtn.remove(); }, decisionDur);

  if (decision === 'dismiss') {
    text.classList.remove('is-visible');
    Object.assign(cover.style, {
      left: `${cellRect.x}px`, top: `${cellRect.y}px`,
      width: `${cellRect.width}px`, height: `${cellRect.height}px`,
    });
    if (!reduced) await delay(decisionDur);
    cover.remove();
    text.remove();
    wallApi.clearResting();
    return { committed: false };
  }

  // decision === 'play': the previous hero (if any) already stepped down
  // above; it is now genuinely being replaced, so retire its disc for good.
  if (currentAlbumId && currentAlbumId !== entry.id) {
    retireDisc(currentAlbumId);
    wallApi.markPlayed(currentAlbumId);
  }

  return runConfirmedPlayTail(entry, { wallApi, wallViewportEl, crackleHintEl }, { cover, text });
}

/** Dismisses whatever selection preview is currently open, as if the
 * listener had pressed "Find something else" -- used when the gallery
 * gets dragged out from under it (see main.js's onGalleryDragMove). */
export function cancelSelectionPreview() {
  openPreview?.cancel();
}

/**
 * The disc-slide / crackle / held-breath / commit tail, run once the
 * listener presses Play on a selection preview. Reuses that preview's
 * cover/text elements rather than rebuilding them, so there is no
 * shrink-then-reexpand flicker between the two stages. Deliberately
 * quicker than needleDrop()'s own choreography, since the anticipation of
 * the held breath already happened while the listener was deciding.
 */
async function runConfirmedPlayTail(entry, ctx, overlay) {
  const { wallApi, wallViewportEl, crackleHintEl } = ctx;
  const { cover, text } = overlay;
  const reduced = prefersReducedMotion();
  const layer = ensureLayer(wallViewportEl);

  const disc = buildDiscSvg();
  cover.appendChild(disc.svg);

  let skipped = false;
  let resolveSkip;
  const skipPromise = new Promise((resolve) => { resolveSkip = resolve; });
  const onSkipKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { skipped = true; resolveSkip(); }
  };
  const onSkipClick = () => { skipped = true; resolveSkip(); };
  window.addEventListener('keydown', onSkipKey);
  layer.addEventListener('click', onSkipClick);

  disc.svg.classList.add('is-out');
  if (!reduced) {
    await Promise.race([delay(TIMINGS.postPlayCrackleDelayMs), skipPromise]);
    if (!skipped) startCrackle();
    if (!skipped) {
      await Promise.race([delay(TIMINGS.postPlayBreathMs), skipPromise]);
    }
  }

  window.removeEventListener('keydown', onSkipKey);
  layer.removeEventListener('click', onSkipClick);
  stopCrackle({ soft: skipped });

  try {
    await playback.commitPlayback();
  } catch (err) {
    cover.remove();
    text.remove();
    wallApi.clearResting();
    throw err;
  }

  text.classList.remove('is-visible');
  wallApi.enterRestingState(entry.id, { keepHidden: true });
  wallApi.setCurrent(entry.id);
  activeOverlay = { albumId: entry.id, cover, text, disc };
  showCrackleHintOnce(crackleHintEl);

  return { committed: true };
}

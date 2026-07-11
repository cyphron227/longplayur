// The ceremony (DESIGN-SPEC §3, the signature element): needle-drop
// choreography, the disc, the held breath, Web Audio crackle, the tonearm
// arc, and the runout groove. All timings come from one TIMINGS object.

import { prefersReducedMotion, formatDuration } from './ui.js';
import * as playback from './playback.js';

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
// Web Audio crackle: synthesised, no audio file. Brown-noise bed plus
// randomised band-passed tick bursts. Never overlaps Spotify audio because
// it always fully fades/stops before PUT /play fires (see needleDrop below).
// ---------------------------------------------------------------------

let audioCtx = null;
let brownNoiseBuffer = null;
let whiteNoiseBuffer = null;
let activeBed = null;
let tickTimer = null;

function ensureAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function dbToGain(db) {
  return Math.pow(10, db / 20);
}

function buildBrownNoiseBuffer(ctx, seconds = 2) {
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

function startBed(ctx) {
  if (!brownNoiseBuffer) brownNoiseBuffer = buildBrownNoiseBuffer(ctx);
  const source = ctx.createBufferSource();
  source.buffer = brownNoiseBuffer;
  source.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1200;
  const gain = ctx.createGain();
  gain.gain.value = 0;
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
  gain.gain.linearRampToValueAtTime(dbToGain(-38), ctx.currentTime + TIMINGS.crackleFadeMs / 1000);
  return { source, gain };
}

function stopBed(bed, ctx, fadeMs) {
  if (!bed) return;
  const now = ctx.currentTime;
  bed.gain.gain.cancelScheduledValues(now);
  bed.gain.gain.setValueAtTime(bed.gain.gain.value, now);
  bed.gain.gain.linearRampToValueAtTime(0, now + fadeMs / 1000);
  setTimeout(() => { try { bed.source.stop(); } catch { /* already stopped */ } }, fadeMs + 50);
}

function fireTick(ctx) {
  if (!whiteNoiseBuffer) whiteNoiseBuffer = buildWhiteNoiseBuffer(ctx);
  const source = ctx.createBufferSource();
  source.buffer = whiteNoiseBuffer;
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 2000 + Math.random() * 2000; // 2 to 4 kHz
  bandpass.Q.value = 2;
  const gain = ctx.createGain();
  const durationMs = 3 + Math.random() * 5; // 3 to 8ms
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.001);
  gain.gain.linearRampToValueAtTime(0, now + durationMs / 1000);
  source.connect(bandpass).connect(gain).connect(ctx.destination);
  source.start(now);
  source.stop(now + durationMs / 1000 + 0.02);
}

function scheduleTicks(ctx) {
  const next = () => {
    fireTick(ctx);
    const delayMs = 1000 / (2 + Math.random() * 4); // 2 to 6 ticks/sec
    tickTimer = setTimeout(next, delayMs);
  };
  next();
}

function stopTicks() {
  if (tickTimer) clearTimeout(tickTimer);
  tickTimer = null;
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

/**
 * Runs the full needle-drop choreography and leaves the enlarged cover on
 * screen as the active overlay (does not auto-shrink; see
 * settleActiveOverlay()). Resolves once that overlay is in place.
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
  const cellRect = wallApi.getCellRect(entry.id);
  if (!cellRect) return;

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

  const targetWidth = cellRect.width * 1.6;
  const targetHeight = cellRect.height * 1.6;
  const targetLeft = wallViewportEl.clientWidth / 2 - targetWidth / 2;
  const targetTop = wallViewportEl.clientHeight / 2 - targetHeight / 2;
  text.style.top = `${Math.max(8, targetTop - 56)}px`;

  requestAnimationFrame(() => {
    Object.assign(cover.style, {
      left: `${targetLeft}px`, top: `${targetTop}px`,
      width: `${targetWidth}px`, height: `${targetHeight}px`,
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
 * Plays the runout-groove sequence once the album has finished, and
 * returns the set of neighbour choices (with an `atEdge` flag) for the
 * caller to render into the wall prompt.
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

  const neighbors = wallApi.getNeighbors(albumId);
  const unplayed = neighbors.filter((n) => !n.played);
  const atEdge = unplayed.length < 2;

  if (atEdge) {
    wallApi.zoomToFitAll({ animate: true });
  } else if (!reduced) {
    // Single wake ripple outward from the centre, then rest (no looping animation).
    unplayed.forEach((n, i) => {
      const el = wallApi.getCellEl(n.entry.id);
      if (!el) return;
      setTimeout(() => el.classList.add('is-woken'), i * TIMINGS.runoutRippleStaggerMs);
    });
  }

  stopCrackle();

  return { neighbors, unplayed, atEdge };
}

export function runoutPrompt(atEdge) {
  return atEdge
    ? "You've reached the edge of the wall. Pick from the shelf."
    : "Session's not over. Choose the next record.";
}

// ---------------------------------------------------------------------
// Long-press preview: a sticky peek at an album's cover with its name and
// artist shown large above it, plus an overlaid Play button. Distinct from
// the needle-drop ceremony (no disc, no crackle, no dimming the rest of
// the wall) and, unlike a plain hover peek, stays open after release so
// there is time to actually press Play -- dismissed via the Play button,
// tapping the scrim behind it, or Escape.
// ---------------------------------------------------------------------

let longPressPreview = null; // { albumId, cover, text, scrim, playBtn, onKey }

/**
 * @param {object} entry pool entry being previewed
 * @param {{wallApi: object, wallViewportEl: HTMLElement, onPlay: () => void}} ctx
 */
export function showLongPressPreview(entry, ctx) {
  const { wallApi, wallViewportEl, onPlay } = ctx;
  hideLongPressPreview();

  const cellRect = wallApi.getCellRect(entry.id);
  if (!cellRect) return;

  const reduced = prefersReducedMotion();
  const dur = reduced ? TIMINGS.reducedMs : 200;
  const layer = ensureLayer(wallViewportEl);

  const scrim = document.createElement('div');
  scrim.className = 'preview-scrim';
  layer.appendChild(scrim);

  const cover = document.createElement('div');
  cover.className = 'ceremony-cover';
  Object.assign(cover.style, {
    left: `${cellRect.x}px`, top: `${cellRect.y}px`,
    width: `${cellRect.width}px`, height: `${cellRect.height}px`,
    opacity: '0',
    transition: `left ${dur}ms var(--ease), top ${dur}ms var(--ease), width ${dur}ms var(--ease), height ${dur}ms var(--ease), opacity ${dur}ms var(--ease)`,
  });
  if (entry.image) {
    const img = document.createElement('img');
    img.src = entry.image;
    img.alt = '';
    cover.appendChild(img);
  }
  layer.appendChild(cover);

  const playBtn = document.createElement('button');
  playBtn.type = 'button';
  playBtn.className = 'preview-play-btn';
  playBtn.setAttribute('aria-label', `Play ${entry.name}`);
  playBtn.innerHTML = '<svg class="icon"><use href="#icon-play"/></svg>';
  layer.appendChild(playBtn);

  const text = document.createElement('div');
  text.className = 'ceremony-text';
  text.innerHTML = '<div class="preview-title"></div><div class="preview-artist"></div>';
  text.querySelector('.preview-title').textContent = entry.name;
  text.querySelector('.preview-artist').textContent = entry.artist;
  layer.appendChild(text);

  cover.getBoundingClientRect(); // force layout before animating.

  const targetWidth = cellRect.width * 1.6;
  const targetHeight = cellRect.height * 1.6;
  const targetLeft = wallViewportEl.clientWidth / 2 - targetWidth / 2;
  const targetTop = wallViewportEl.clientHeight / 2 - targetHeight / 2;
  text.style.top = `${Math.max(8, targetTop - 76)}px`;
  playBtn.style.left = `${targetLeft + targetWidth / 2}px`;
  playBtn.style.top = `${targetTop + targetHeight / 2}px`;

  requestAnimationFrame(() => {
    cover.style.opacity = '1';
    Object.assign(cover.style, {
      left: `${targetLeft}px`, top: `${targetTop}px`,
      width: `${targetWidth}px`, height: `${targetHeight}px`,
    });
    text.classList.add('is-visible');
    scrim.classList.add('is-visible');
    playBtn.classList.add('is-visible');
  });

  scrim.addEventListener('click', hideLongPressPreview);
  playBtn.addEventListener('click', () => {
    onPlay?.();
    hideLongPressPreview();
  });
  const onKey = (e) => { if (e.key === 'Escape') hideLongPressPreview(); };
  window.addEventListener('keydown', onKey);

  longPressPreview = { albumId: entry.id, cover, text, scrim, playBtn, onKey };
}

export function hideLongPressPreview() {
  if (!longPressPreview) return;
  const { cover, text, scrim, playBtn, onKey } = longPressPreview;
  longPressPreview = null;
  window.removeEventListener('keydown', onKey);
  cover.style.opacity = '0';
  text.classList.remove('is-visible');
  scrim.classList.remove('is-visible');
  playBtn.classList.remove('is-visible');
  setTimeout(() => { cover.remove(); text.remove(); scrim.remove(); playBtn.remove(); }, 220);
}

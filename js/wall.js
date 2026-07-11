// The Wall: a full 3D sphere of covers ("infinity ball") rendered with CSS
// 3D transforms, no framework. Drag rotates freely on both axes (no pitch
// clamp, unlike a typical orbit camera) with inertia; wheel/pinch zooms.
// The journey thread (populated by journal.js via main.js) is drawn as a
// screen-space SVG overlay tracking each played tile's live projected
// position, since a great-circle path has no native flat representation.

import { el, escapeHtml } from './ui.js';

export const CELL_SIZE = 150;
const BASE_RADIUS = 620;
const DEFAULT_ZOOM = 1;
const FOCUS_ZOOM = 1.5;
const FIT_ALL_ZOOM = 0.55;
const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.2;
const DRAG_SENSITIVITY = 0.25; // degrees per pixel
const INERTIA_DECAY = 0.93; // per animation frame
const INERTIA_STOP_THRESHOLD = 0.01; // degrees per frame

const GOLDEN_ANGLE_RAD = Math.PI * (3 - Math.sqrt(5));

/**
 * Places `rank` (0-indexed of `total`) evenly across a full sphere using a
 * golden-angle spiral: pole to pole in `phiDeg` (-90 to 90), wrapping
 * `thetaDeg` (0 to 360) by the golden angle each step. Pure and
 * deterministic, mirroring the old flat spiralPosition(rank).
 * @param {number} rank
 * @param {number} total
 * @returns {{thetaDeg: number, phiDeg: number}}
 */
export function spherePosition(rank, total) {
  if (!Number.isInteger(rank) || rank < 0) {
    throw new RangeError('spherePosition expects a non-negative integer rank');
  }
  if (!Number.isInteger(total) || total < 1) {
    throw new RangeError('spherePosition expects a positive integer total');
  }
  if (rank >= total) {
    throw new RangeError('spherePosition rank must be less than total');
  }

  const y = total === 1 ? 0 : 1 - (rank / (total - 1)) * 2; // 1 .. -1
  const phiRad = Math.acos(Math.max(-1, Math.min(1, y))); // 0 .. PI
  const thetaRad = (GOLDEN_ANGLE_RAD * rank) % (2 * Math.PI);

  return {
    thetaDeg: thetaRad * (180 / Math.PI),
    phiDeg: phiRad * (180 / Math.PI) - 90, // -90 (near pole) .. 90 (far pole)
  };
}

function sphereUnitVector(thetaDeg, phiDeg) {
  const thetaRad = thetaDeg * (Math.PI / 180);
  const phiRad = (phiDeg + 90) * (Math.PI / 180); // back to 0..PI polar
  return {
    x: Math.sin(phiRad) * Math.sin(thetaRad),
    y: Math.cos(phiRad),
    z: Math.sin(phiRad) * Math.cos(thetaRad),
  };
}

function angularDistanceDeg(a, b) {
  const va = sphereUnitVector(a.thetaDeg, a.phiDeg);
  const vb = sphereUnitVector(b.thetaDeg, b.phiDeg);
  const dot = va.x * vb.x + va.y * vb.y + va.z * vb.z;
  return Math.acos(Math.max(-1, Math.min(1, dot))) * (180 / Math.PI);
}

function computeRadius(count) {
  return Math.max(420, Math.round(BASE_RADIUS * Math.sqrt(Math.max(1, count) / 40)));
}

/**
 * @param {HTMLElement} viewportEl the fixed-size clipping/perspective viewport
 * @param {HTMLElement} containerEl the 3D-transformed layer holding the cells
 * @param {Array} pool album pool entries, each with a numeric `rank`
 * @param {{onSelect: (entry: object) => void, onZoomOut?: () => void}} handlers
 */
export function initWall(viewportEl, containerEl, pool, handlers) {
  containerEl.style.setProperty('--cell-size', `${CELL_SIZE}px`);
  const radius = computeRadius(pool.length);

  const byId = new Map();

  pool.forEach((entry) => {
    const { thetaDeg, phiDeg } = spherePosition(entry.rank, pool.length);
    const cellEl = renderCell(entry, thetaDeg, phiDeg, radius);
    containerEl.appendChild(cellEl);
    byId.set(entry.id, { entry, thetaDeg, phiDeg, el: cellEl, played: false });
  });

  let yaw = 0;
  let pitch = 0;
  let zoom = DEFAULT_ZOOM;
  let focusedId = pool[0]?.id ?? null;
  let currentId = null;

  function renderCell(entry, thetaDeg, phiDeg, r) {
    const button = el('button', {
      class: 'wall-cover',
      type: 'button',
      dataset: { albumId: entry.id },
      'aria-label': `${entry.name} by ${entry.artist}`,
      tabindex: '-1',
      onClick: () => selectEntry(entry),
      onKeydown: (e) => onCellKeydown(e, entry),
    });
    if (entry.image) {
      const img = el('img', { src: entry.image, alt: '', loading: 'lazy', decoding: 'async' });
      button.appendChild(img);
    }
    const label = el('div', { class: 'label' });
    label.innerHTML = `${escapeHtml(entry.name)}<br>${escapeHtml(entry.artist)}`;
    button.appendChild(label);

    const wrapper = el('div', { class: 'wall-cell' }, [button]);
    wrapper.style.transform = `rotateY(${thetaDeg}deg) rotateX(${phiDeg}deg) translateZ(${r}px)`;
    return wrapper;
  }

  function onCellKeydown(e, entry) {
    const dirs = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (dirs.includes(e.key)) {
      e.preventDefault();
      const target = findNeighborInDirection(entry.id, e.key);
      if (target) moveFocus(target);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      zoomToFitAll();
    }
  }

  /** Direction-aware nearest neighbour by current on-screen projected position. */
  function findNeighborInDirection(albumId, key) {
    const currentEl = getCellEl(albumId);
    if (!currentEl) return null;
    const currentRect = currentEl.getBoundingClientRect();
    const cx = currentRect.left + currentRect.width / 2;
    const cy = currentRect.top + currentRect.height / 2;

    let best = null;
    let bestScore = Infinity;
    for (const record of byId.values()) {
      if (record.entry.id === albumId) continue;
      const rect = record.el.querySelector('.wall-cover').getBoundingClientRect();
      if (rect.width === 0) continue;
      const dx = rect.left + rect.width / 2 - cx;
      const dy = rect.top + rect.height / 2 - cy;
      let primary;
      let cross;
      if (key === 'ArrowRight' && dx > 4) { primary = dx; cross = dy; }
      else if (key === 'ArrowLeft' && dx < -4) { primary = -dx; cross = dy; }
      else if (key === 'ArrowDown' && dy > 4) { primary = dy; cross = dx; }
      else if (key === 'ArrowUp' && dy < -4) { primary = -dy; cross = dx; }
      else continue;
      const score = primary + Math.abs(cross) * 1.5;
      if (score < bestScore) { bestScore = score; best = record.entry.id; }
    }
    return best;
  }

  function moveFocus(albumId) {
    const prev = byId.get(focusedId);
    if (prev) prev.el.querySelector('.wall-cover').tabIndex = -1;
    const next = byId.get(albumId);
    if (!next) return;
    next.el.querySelector('.wall-cover').tabIndex = 0;
    next.el.querySelector('.wall-cover').focus();
    focusedId = albumId;
  }

  function selectEntry(entry) {
    const record = byId.get(entry.id);
    if (!record) return;
    const btn = record.el.querySelector('.wall-cover');
    if (btn.classList.contains('is-spent') || btn.classList.contains('is-unavailable')) return;
    moveFocus(entry.id);
    panToAlbum(entry.id, { animate: true });
    handlers.onSelect?.(entry);
  }

  function applyWorld({ animate }) {
    containerEl.style.transition = animate ? 'transform var(--dur-breath) var(--ease)' : 'none';
    containerEl.style.transform = `scale(${zoom}) rotateX(${pitch}deg) rotateY(${yaw}deg)`;
    updateThreadPositions();
  }

  function panToAlbum(albumId, { animate = true } = {}) {
    const record = byId.get(albumId);
    if (!record) return;
    yaw = -record.thetaDeg;
    pitch = -record.phiDeg;
    zoom = FOCUS_ZOOM;
    applyWorld({ animate });
  }

  function zoomToFitAll({ animate = true } = {}) {
    zoom = FIT_ALL_ZOOM;
    applyWorld({ animate });
    document.body.classList.add('wall-zoomed-out');
    handlers.onZoomOut?.();
  }

  function zoomIntoAlbum(albumId) {
    document.body.classList.remove('wall-zoomed-out');
    panToAlbum(albumId, { animate: true });
  }

  function isZoomedOut() {
    return document.body.classList.contains('wall-zoomed-out');
  }

  // ---- Wheel zoom ----
  viewportEl.addEventListener('wheel', (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * factor));
    applyWorld({ animate: false });
    document.body.classList.toggle('wall-zoomed-out', zoom <= FIT_ALL_ZOOM + 0.05);
  }, { passive: false });

  // ---- Drag-to-rotate (both axes, unclamped) with inertia ----
  let inertiaFrame = null;
  function cancelInertia() {
    if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
    inertiaFrame = null;
  }
  function startInertia(velYaw, velPitch) {
    let vYaw = velYaw;
    let vPitch = velPitch;
    function step() {
      vYaw *= INERTIA_DECAY;
      vPitch *= INERTIA_DECAY;
      if (Math.abs(vYaw) < INERTIA_STOP_THRESHOLD && Math.abs(vPitch) < INERTIA_STOP_THRESHOLD) {
        inertiaFrame = null;
        return;
      }
      yaw += vYaw;
      pitch += vPitch;
      applyWorld({ animate: false });
      inertiaFrame = requestAnimationFrame(step);
    }
    inertiaFrame = requestAnimationFrame(step);
  }

  let mouseDragStart = null;
  let mouseLastMove = null;
  let mouseVelocity = { yaw: 0, pitch: 0 };

  viewportEl.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || e.target.closest('.wall-cover')) return;
    cancelInertia();
    mouseDragStart = { x: e.clientX, y: e.clientY, yaw, pitch };
    mouseLastMove = { x: e.clientX, y: e.clientY, t: performance.now() };
    mouseVelocity = { yaw: 0, pitch: 0 };
  });
  window.addEventListener('mousemove', (e) => {
    if (!mouseDragStart) return;
    const dx = e.clientX - mouseDragStart.x;
    const dy = e.clientY - mouseDragStart.y;
    yaw = mouseDragStart.yaw + dx * DRAG_SENSITIVITY;
    pitch = mouseDragStart.pitch - dy * DRAG_SENSITIVITY;
    applyWorld({ animate: false });

    const now = performance.now();
    const dt = Math.max(1, now - mouseLastMove.t);
    mouseVelocity = {
      yaw: ((e.clientX - mouseLastMove.x) * DRAG_SENSITIVITY / dt) * 16,
      pitch: (-(e.clientY - mouseLastMove.y) * DRAG_SENSITIVITY / dt) * 16,
    };
    mouseLastMove = { x: e.clientX, y: e.clientY, t: now };
  });
  window.addEventListener('mouseup', () => {
    if (!mouseDragStart) return;
    mouseDragStart = null;
    startInertia(mouseVelocity.yaw, mouseVelocity.pitch);
  });

  // ---- Touch: one finger rotates, two fingers pinch-zoom ----
  let touchDragStart = null;
  let touchLastMove = null;
  let touchVelocity = { yaw: 0, pitch: 0 };
  let pinchStartDist = null;
  let pinchStartZoom = 1;

  function touchDistance(touches) {
    return Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
  }

  viewportEl.addEventListener('touchstart', (e) => {
    cancelInertia();
    if (e.touches.length === 2) {
      pinchStartDist = touchDistance(e.touches);
      pinchStartZoom = zoom;
      touchDragStart = null;
    } else if (e.touches.length === 1 && !e.target.closest('.wall-cover')) {
      touchDragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, yaw, pitch };
      touchLastMove = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: performance.now() };
      touchVelocity = { yaw: 0, pitch: 0 };
    }
  }, { passive: true });

  viewportEl.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && pinchStartDist) {
      e.preventDefault();
      const dist = touchDistance(e.touches);
      zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinchStartZoom * (dist / pinchStartDist)));
      applyWorld({ animate: false });
    } else if (e.touches.length === 1 && touchDragStart) {
      const dx = e.touches[0].clientX - touchDragStart.x;
      const dy = e.touches[0].clientY - touchDragStart.y;
      yaw = touchDragStart.yaw + dx * DRAG_SENSITIVITY;
      pitch = touchDragStart.pitch - dy * DRAG_SENSITIVITY;
      applyWorld({ animate: false });

      const now = performance.now();
      const dt = Math.max(1, now - touchLastMove.t);
      touchVelocity = {
        yaw: ((e.touches[0].clientX - touchLastMove.x) * DRAG_SENSITIVITY / dt) * 16,
        pitch: (-(e.touches[0].clientY - touchLastMove.y) * DRAG_SENSITIVITY / dt) * 16,
      };
      touchLastMove = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: now };
    }
  }, { passive: false });

  viewportEl.addEventListener('touchend', () => {
    pinchStartDist = null;
    if (touchDragStart) {
      touchDragStart = null;
      startInertia(touchVelocity.yaw, touchVelocity.pitch);
    }
  });

  // ---- Public API ----

  function markPlayed(albumId) {
    const record = byId.get(albumId);
    if (!record) return;
    record.played = true;
    record.el.querySelector('.wall-cover').classList.add('is-played');
  }

  function setCurrent(albumId) {
    if (currentId) {
      byId.get(currentId)?.el.querySelector('.wall-cover').classList.remove('is-current');
    }
    currentId = albumId;
    const record = byId.get(albumId);
    record?.el.querySelector('.wall-cover').classList.add('is-current');
  }

  function markSpent(albumId) {
    byId.get(albumId)?.el.querySelector('.wall-cover').classList.add('is-spent');
  }

  function markUnavailable(albumId) {
    byId.get(albumId)?.el.querySelector('.wall-cover').classList.add('is-unavailable');
  }

  function recedeAllExcept(albumId) {
    for (const [id, record] of byId) {
      const btn = record.el.querySelector('.wall-cover');
      btn.classList.remove('is-woken');
      if (id === albumId) btn.classList.add('is-overlaid');
      else btn.classList.add('is-receded');
    }
  }

  function enterRestingState(albumId) {
    for (const [id, record] of byId) {
      const btn = record.el.querySelector('.wall-cover');
      btn.classList.remove('is-receded', 'is-overlaid', 'is-woken');
      if (id !== albumId) btn.classList.add('is-resting');
    }
  }

  function clearResting() {
    for (const record of byId.values()) {
      record.el.querySelector('.wall-cover').classList.remove('is-resting', 'is-receded', 'is-overlaid');
    }
  }

  function getNeighbors(albumId) {
    const record = byId.get(albumId);
    if (!record) return [];
    const others = Array.from(byId.values()).filter((r) => r.entry.id !== albumId);
    others.sort((a, b) => angularDistanceDeg(record, a) - angularDistanceDeg(record, b));
    return others.slice(0, 8).map((r) => ({ entry: r.entry, played: r.played }));
  }

  function getCellRect(albumId) {
    const record = byId.get(albumId);
    if (!record) return null;
    const viewportRect = viewportEl.getBoundingClientRect();
    const cellRect = record.el.getBoundingClientRect();
    return {
      x: cellRect.left - viewportRect.left,
      y: cellRect.top - viewportRect.top,
      width: cellRect.width,
      height: cellRect.height,
    };
  }

  function getCellEl(albumId) {
    return byId.get(albumId)?.el.querySelector('.wall-cover') ?? null;
  }

  // ---- Journey thread: screen-space SVG overlay, redrawn live while active ----
  let activeThreadIds = [];
  let threadSvg = null;
  let threadPath = null;

  function updateThreadPositions() {
    if (!threadPath || activeThreadIds.length < 2) return;
    const viewportRect = viewportEl.getBoundingClientRect();
    const points = activeThreadIds
      .map((id) => getCellEl(id)?.getBoundingClientRect())
      .filter(Boolean)
      .map((r) => ({ x: r.left + r.width / 2 - viewportRect.left, y: r.top + r.height / 2 - viewportRect.top }));
    if (points.length < 2) return;
    threadPath.setAttribute('d', points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' '));
  }

  function renderThread(orderedAlbumIds) {
    activeThreadIds = orderedAlbumIds.filter((id) => byId.has(id));
    if (threadSvg) { threadSvg.remove(); threadSvg = null; threadPath = null; }
    if (activeThreadIds.length < 2) return;

    const ns = 'http://www.w3.org/2000/svg';
    threadSvg = document.createElementNS(ns, 'svg');
    threadSvg.setAttribute('class', 'wall-thread');
    threadPath = document.createElementNS(ns, 'path');
    threadSvg.appendChild(threadPath);
    viewportEl.appendChild(threadSvg);

    updateThreadPositions();
    requestAnimationFrame(() => {
      const length = threadPath.getTotalLength();
      threadPath.style.strokeDasharray = String(length);
      threadPath.style.strokeDashoffset = String(length);
      threadPath.getBoundingClientRect(); // force reflow before transitioning.
      threadPath.style.transition = 'stroke-dashoffset 900ms var(--ease)';
      threadPath.style.strokeDashoffset = '0';
    });
  }

  // Initial framing: centred on the highest-scored album (rank 0).
  if (pool.length > 0) {
    panToAlbum(pool[0].id, { animate: false });
    getCellEl(pool[0].id).tabIndex = 0;
  }

  return {
    panToAlbum,
    zoomToFitAll,
    zoomIntoAlbum,
    markPlayed,
    setCurrent,
    markSpent,
    markUnavailable,
    recedeAllExcept,
    enterRestingState,
    clearResting,
    getNeighbors,
    getCellRect,
    getCellEl,
    isZoomedOut,
    renderThread,
    getEntry: (albumId) => byId.get(albumId)?.entry ?? null,
  };
}

// The Wall: one grid, one camera. Spiral layout, CSS-transform pan/zoom,
// keyboard grid navigation, and the journey thread (populated by journal.js).

import { spiralPosition } from './albums.js';
import { el, escapeHtml } from './ui.js';

export const CELL_SIZE = 180;
const FRAME_CELLS = 3; // Default tapestry framing: a 3x3 region.
const WALL_PADDING_CELLS = 1.5; // Extra breathing room when zoomed out to fit all.
const MAX_SCALE = 1.4;

/**
 * @param {HTMLElement} viewportEl the fixed-size clipping viewport
 * @param {HTMLElement} containerEl the transformed layer holding the cells
 * @param {Array} pool album pool entries, each with a numeric `rank`
 * @param {{onSelect: (entry: object) => void, onZoomOut?: () => void}} handlers
 */
export function initWall(viewportEl, containerEl, pool, handlers) {
  containerEl.style.setProperty('--cell-size', `${CELL_SIZE}px`);

  const byId = new Map();
  const byCoord = new Map();
  let minCol = 0, maxCol = 0, minRow = 0, maxRow = 0;

  pool.forEach((entry) => {
    const { col, row } = spiralPosition(entry.rank);
    const cellEl = renderCell(entry, col, row);
    containerEl.appendChild(cellEl);
    const record = { entry, col, row, el: cellEl, played: false };
    byId.set(entry.id, record);
    byCoord.set(coordKey(col, row), record);
    minCol = Math.min(minCol, col); maxCol = Math.max(maxCol, col);
    minRow = Math.min(minRow, row); maxRow = Math.max(maxRow, row);
  });

  containerEl.style.width = `${(maxCol - minCol + 1) * CELL_SIZE}px`;
  containerEl.style.height = `${(maxRow - minRow + 1) * CELL_SIZE}px`;

  let camera = { scale: 1, tx: 0, ty: 0 };
  let focusedId = pool[0]?.id ?? null;
  let currentId = null;

  function coordKey(col, row) {
    return `${col},${row}`;
  }

  function cellCentre(col, row) {
    return { x: col * CELL_SIZE + CELL_SIZE / 2, y: row * CELL_SIZE + CELL_SIZE / 2 };
  }

  function renderCell(entry, col, row) {
    const button = el('button', {
      class: 'wall-cover',
      type: 'button',
      dataset: { albumId: entry.id },
      'aria-label': `${entry.name} by ${entry.artist}`,
      tabindex: '-1',
      onClick: () => selectEntry(entry, { source: 'click' }),
      onKeydown: (e) => onCellKeydown(e, entry),
    });
    button.style.position = 'absolute';
    button.style.left = `${col * CELL_SIZE}px`;
    button.style.top = `${row * CELL_SIZE}px`;
    button.style.width = `${CELL_SIZE}px`;
    button.style.height = `${CELL_SIZE}px`;

    if (entry.image) {
      const img = el('img', { src: entry.image, alt: '', loading: 'lazy', decoding: 'async' });
      button.appendChild(img);
    }
    const label = el('div', { class: 'label' });
    label.innerHTML = `${escapeHtml(entry.name)}<br>${escapeHtml(entry.artist)}`;
    button.appendChild(label);

    const wrapper = el('div', { class: 'wall-cell' }, [button]);
    return wrapper;
  }

  function onCellKeydown(e, entry) {
    const dirs = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
    if (e.key in dirs) {
      e.preventDefault();
      const record = byId.get(entry.id);
      const [dCol, dRow] = dirs[e.key];
      const target = byCoord.get(coordKey(record.col + dCol, record.row + dRow));
      if (target) moveFocus(target.entry.id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      zoomToFitAll();
    }
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

  function selectEntry(entry, { source } = {}) {
    const record = byId.get(entry.id);
    if (!record) return;
    const btn = record.el.querySelector('.wall-cover');
    if (btn.classList.contains('is-spent') || btn.classList.contains('is-unavailable')) return;
    moveFocus(entry.id);
    panToAlbum(entry.id, { animate: true });
    handlers.onSelect?.(entry, { source });
  }

  function applyCamera(next, { animate }) {
    camera = next;
    containerEl.style.transition = animate ? `transform var(--dur-breath) var(--ease)` : 'none';
    containerEl.style.transform = `translate(${camera.tx}px, ${camera.ty}px) scale(${camera.scale})`;
  }

  function panToAlbum(albumId, { animate = true } = {}) {
    const record = byId.get(albumId);
    if (!record) return;
    const centre = cellCentre(record.col, record.row);
    const scale = Math.min(
      MAX_SCALE,
      Math.min(viewportEl.clientWidth, viewportEl.clientHeight) / (FRAME_CELLS * CELL_SIZE)
    ) || 1;
    const tx = viewportEl.clientWidth / 2 - centre.x * scale;
    const ty = viewportEl.clientHeight / 2 - centre.y * scale;
    applyCamera({ scale, tx, ty }, { animate });
  }

  function zoomToFitAll({ animate = true } = {}) {
    const w = (maxCol - minCol + WALL_PADDING_CELLS * 2 + 1) * CELL_SIZE;
    const h = (maxRow - minRow + WALL_PADDING_CELLS * 2 + 1) * CELL_SIZE;
    const scale = Math.min(viewportEl.clientWidth / w, viewportEl.clientHeight / h);
    const centre = {
      x: ((minCol + maxCol + 1) / 2) * CELL_SIZE,
      y: ((minRow + maxRow + 1) / 2) * CELL_SIZE,
    };
    const tx = viewportEl.clientWidth / 2 - centre.x * scale;
    const ty = viewportEl.clientHeight / 2 - centre.y * scale;
    applyCamera({ scale, tx, ty }, { animate });
    document.body.classList.add('wall-zoomed-out');
    handlers.onZoomOut?.();
  }

  function zoomIntoAlbum(albumId) {
    document.body.classList.remove('wall-zoomed-out');
    panToAlbum(albumId, { animate: true });
  }

  // ---- Wheel zoom, anchored on the cursor ----
  viewportEl.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = viewportEl.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    const fitScale = Math.min(
      viewportEl.clientWidth / ((maxCol - minCol + 1) * CELL_SIZE),
      viewportEl.clientHeight / ((maxRow - minRow + 1) * CELL_SIZE)
    );
    const minScale = Math.min(fitScale, 1);
    const newScale = Math.min(MAX_SCALE, Math.max(minScale, camera.scale * factor));
    const ratio = newScale / camera.scale;
    const tx = px - (px - camera.tx) * ratio;
    const ty = py - (py - camera.ty) * ratio;
    applyCamera({ scale: newScale, tx, ty }, { animate: false });
    if (newScale <= minScale + 0.001) document.body.classList.add('wall-zoomed-out');
    else document.body.classList.remove('wall-zoomed-out');
  }, { passive: false });

  // ---- Pinch zoom + drag pan (touch) ----
  let pinchStartDist = null;
  let pinchStartScale = 1;
  let dragStart = null;
  let dragCameraStart = null;

  viewportEl.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      pinchStartDist = touchDistance(e.touches);
      pinchStartScale = camera.scale;
    } else if (e.touches.length === 1 && !e.target.closest('.wall-cover')) {
      dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      dragCameraStart = { ...camera };
    }
  }, { passive: true });

  viewportEl.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && pinchStartDist) {
      e.preventDefault();
      const dist = touchDistance(e.touches);
      const scale = Math.min(MAX_SCALE, Math.max(0.3, pinchStartScale * (dist / pinchStartDist)));
      const mid = touchMidpoint(e.touches, viewportEl);
      const ratio = scale / camera.scale;
      const tx = mid.x - (mid.x - camera.tx) * ratio;
      const ty = mid.y - (mid.y - camera.ty) * ratio;
      applyCamera({ scale, tx, ty }, { animate: false });
    } else if (e.touches.length === 1 && dragStart) {
      const dx = e.touches[0].clientX - dragStart.x;
      const dy = e.touches[0].clientY - dragStart.y;
      applyCamera({ scale: camera.scale, tx: dragCameraStart.tx + dx, ty: dragCameraStart.ty + dy }, { animate: false });
    }
  }, { passive: false });

  viewportEl.addEventListener('touchend', () => {
    pinchStartDist = null;
    dragStart = null;
  });

  function touchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }
  function touchMidpoint(touches, viewport) {
    const rect = viewport.getBoundingClientRect();
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2 - rect.left,
      y: (touches[0].clientY + touches[1].clientY) / 2 - rect.top,
    };
  }

  // ---- Mouse drag pan ----
  let mouseDragStart = null;
  let mouseDragCameraStart = null;
  viewportEl.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || e.target.closest('.wall-cover')) return;
    mouseDragStart = { x: e.clientX, y: e.clientY };
    mouseDragCameraStart = { ...camera };
  });
  window.addEventListener('mousemove', (e) => {
    if (!mouseDragStart) return;
    const dx = e.clientX - mouseDragStart.x;
    const dy = e.clientY - mouseDragStart.y;
    applyCamera({ scale: camera.scale, tx: mouseDragCameraStart.tx + dx, ty: mouseDragCameraStart.ty + dy }, { animate: false });
  });
  window.addEventListener('mouseup', () => { mouseDragStart = null; });

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

  /** Ceremony hook: dim every cover except the one being dropped (DESIGN-SPEC §3, t=0). */
  function recedeAllExcept(albumId) {
    for (const [id, record] of byId) {
      const btn = record.el.querySelector('.wall-cover');
      btn.classList.remove('is-woken');
      if (id === albumId) btn.classList.add('is-overlaid');
      else btn.classList.add('is-receded');
    }
  }

  /** Ceremony hook: settle into the post-drop resting state (current at 100%, rest at 45%). */
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
    const deltas = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    return deltas
      .map(([dCol, dRow]) => byCoord.get(coordKey(record.col + dCol, record.row + dRow)))
      .filter(Boolean)
      .map((n) => ({ entry: n.entry, played: n.played }));
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

  function isZoomedOut() {
    return document.body.classList.contains('wall-zoomed-out');
  }

  function renderThread(orderedAlbumIds) {
    let svg = containerEl.querySelector('.wall-thread');
    if (svg) svg.remove();
    const points = orderedAlbumIds
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map((r) => cellCentre(r.col, r.row));
    if (points.length < 2) return;

    const ns = 'http://www.w3.org/2000/svg';
    svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'wall-thread');
    svg.setAttribute('width', containerEl.style.width);
    svg.setAttribute('height', containerEl.style.height);
    const path = document.createElementNS(ns, 'path');
    const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    path.setAttribute('d', d);
    const length = points.reduce((sum, p, i) => (i === 0 ? 0 : sum + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y)), 0);
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    svg.appendChild(path);
    containerEl.insertBefore(svg, containerEl.firstChild);
    // Draw itself in on the next frame.
    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 900ms var(--ease)';
      path.style.strokeDashoffset = '0';
    });
  }

  // Initial framing: centred on the Wall's centre (rank 0).
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

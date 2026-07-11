// The Wall: mounts the real react-bits DomeGallery component (forked
// minimally in gallery/src/DomeGallery.tsx, compiled to js/dome-gallery.
// bundle.js) and bridges it to the same API surface the rest of the app
// expects, so ceremony.js/journal integration needed no changes.
//
// Structural note: DomeGallery is a hemispheric dome with clamped vertical
// tilt (unclamped horizontal spin), not a true full sphere, and it tiles a
// fixed grid of slots by cyclically repeating the provided images -- so a
// pool smaller than the slot count shows each album more than once. Both
// are inherent to the component as fetched from the registry, not bugs in
// this bridge. See KNOWN-DEVIATIONS.md.

import { mountDomeGallery } from './dome-gallery.bundle.js';

/**
 * @param {HTMLElement} viewportEl the clipping viewport
 * @param {HTMLElement} containerEl the element the DomeGallery mounts into
 * @param {Array} pool album pool entries
 * @param {{onSelect: (entry: object) => void, onZoomOut?: () => void,
 *   onGalleryDragMove?: () => void, onLongPress?: (entry: object) => void,
 *   onLongPressEnd?: () => void}} handlers
 */
export function initWall(viewportEl, containerEl, pool, handlers) {
  const byId = new Map();
  pool.forEach((entry) => byId.set(entry.id, entry));

  let currentId = null;
  const playedIds = new Set();

  const bySrc = new Map(pool.filter((entry) => entry.image).map((entry) => [entry.image, entry]));

  const images = pool
    .filter((entry) => entry.image)
    .map((entry) => ({ src: entry.image, alt: `${entry.name} by ${entry.artist}` }));

  const mount = mountDomeGallery(containerEl, {
    images,
    onImageClick: (src) => {
      const entry = bySrc.get(src);
      if (!entry) return;
      const tiles = getTileEls(entry.image);
      if (tiles.some((el) => el.classList.contains('is-spent') || el.classList.contains('is-unavailable'))) return;
      handlers.onSelect?.(entry);
    },
    onDragMove: () => handlers.onGalleryDragMove?.(),
    onLongPress: (src) => {
      const entry = bySrc.get(src);
      if (entry) handlers.onLongPress?.(entry);
    },
    onLongPressEnd: () => handlers.onLongPressEnd?.()
  });

  /** All rendered tile elements for a given image src (the dome repeats images to fill its slots). */
  function getTileEls(src) {
    if (!src) return [];
    return Array.from(containerEl.querySelectorAll('[data-src]'))
      .filter((node) => node.dataset.src === src)
      .map((node) => node.querySelector('.item__image'))
      .filter(Boolean);
  }

  function panToAlbum(albumId) {
    const entry = byId.get(albumId);
    if (entry?.image) mount.focusOn(entry.image);
  }

  function zoomToFitAll() {
    mount.resetRotation();
    document.body.classList.add('wall-zoomed-out');
    handlers.onZoomOut?.();
  }

  function zoomIntoAlbum(albumId) {
    document.body.classList.remove('wall-zoomed-out');
    panToAlbum(albumId);
  }

  function isZoomedOut() {
    return document.body.classList.contains('wall-zoomed-out');
  }

  function markPlayed(albumId) {
    const entry = byId.get(albumId);
    if (!entry) return;
    playedIds.add(albumId);
    getTileEls(entry.image).forEach((el) => el.classList.add('is-played'));
  }

  function setCurrent(albumId) {
    if (currentId) {
      const prev = byId.get(currentId);
      if (prev) getTileEls(prev.image).forEach((el) => el.classList.remove('is-current'));
    }
    currentId = albumId;
    const entry = byId.get(albumId);
    if (entry) getTileEls(entry.image).forEach((el) => el.classList.add('is-current'));
  }

  function markSpent(albumId) {
    const entry = byId.get(albumId);
    if (entry) getTileEls(entry.image).forEach((el) => el.classList.add('is-spent'));
  }

  function markUnavailable(albumId) {
    const entry = byId.get(albumId);
    if (entry) getTileEls(entry.image).forEach((el) => el.classList.add('is-unavailable'));
  }

  function recedeAllExcept(albumId) {
    for (const entry of byId.values()) {
      getTileEls(entry.image).forEach((el) => {
        el.classList.remove('is-woken');
        if (entry.id === albumId) el.classList.add('is-overlaid');
        else el.classList.add('is-receded');
      });
    }
  }

  /**
   * @param {string} albumId
   * @param {{keepHidden?: boolean}} [opts] keepHidden: leave albumId's own
   *   tile as is-overlaid (opacity 0) instead of revealing it. Used while
   *   the ceremony's enlarged cover is standing in for it on screen, so the
   *   real tile does not flash into view somewhere else on the wall at the
   *   same time; see revealTile() for the matching handoff.
   */
  function enterRestingState(albumId, { keepHidden = false } = {}) {
    for (const entry of byId.values()) {
      if (keepHidden && entry.id === albumId) continue;
      getTileEls(entry.image).forEach((el) => {
        el.classList.remove('is-receded', 'is-overlaid', 'is-woken');
        if (entry.id !== albumId) el.classList.add('is-resting');
      });
    }
  }

  /** Reveals a tile previously kept hidden via enterRestingState's keepHidden. */
  function revealTile(albumId) {
    const entry = byId.get(albumId);
    if (!entry) return;
    getTileEls(entry.image).forEach((el) => el.classList.remove('is-overlaid'));
  }

  function clearResting() {
    for (const entry of byId.values()) {
      getTileEls(entry.image).forEach((el) => el.classList.remove('is-resting', 'is-receded', 'is-overlaid'));
    }
  }

  /**
   * The dome repeats tiles and has no stable spatial-adjacency concept, so
   * "physical neighbours" (PRD F5/F6, runout choices) uses rank adjacency
   * in the score-sorted pool instead: up to 4 before and 4 after.
   */
  function getNeighbors(albumId) {
    const idx = pool.findIndex((e) => e.id === albumId);
    if (idx === -1) return [];
    const offsets = [-4, -3, -2, -1, 1, 2, 3, 4];
    return offsets
      .map((d) => pool[idx + d])
      .filter(Boolean)
      .map((entry) => ({ entry, played: playedIds.has(entry.id) }));
  }

  function getCellRect(albumId) {
    const entry = byId.get(albumId);
    if (!entry) return null;
    const tiles = getTileEls(entry.image);
    if (tiles.length === 0) return null;
    const viewportRect = viewportEl.getBoundingClientRect();
    const rect = tiles[0].getBoundingClientRect();
    return {
      x: rect.left - viewportRect.left,
      y: rect.top - viewportRect.top,
      width: rect.width,
      height: rect.height
    };
  }

  function getCellEl(albumId) {
    const entry = byId.get(albumId);
    if (!entry) return null;
    return getTileEls(entry.image)[0] ?? null;
  }

  function getEntry(albumId) {
    return byId.get(albumId) ?? null;
  }

  // ---- Journey thread: screen-space SVG overlay, redrawn on a short poll
  // while active (the mount has no exposed drag/inertia lifecycle events
  // to hook a per-frame update into). ----
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

  setInterval(updateThreadPositions, 100);

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
    revealTile,
    clearResting,
    getNeighbors,
    getCellRect,
    getCellEl,
    isZoomedOut,
    renderThread,
    getEntry
  };
}

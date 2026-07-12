// The Wall: mounts the real react-bits DomeGallery component (forked
// minimally in gallery/src/DomeGallery.tsx, compiled to js/dome-gallery.
// bundle.js) and bridges it to the same API surface the rest of the app
// expects, so ceremony.js/journal integration needed no changes.
//
// Structural note: DomeGallery is a hemispheric dome with clamped vertical
// tilt (unclamped horizontal spin), not a true full sphere, and it tiles a
// grid of slots by cyclically repeating the provided images -- so a pool
// smaller than the slot count shows some albums more than once. Both are
// inherent to the component as fetched from the registry, not bugs in this
// bridge. See KNOWN-DEVIATIONS.md.

import { mountDomeGallery } from './dome-gallery.bundle.js';

// DomeGallery's own `segments` prop was previously left at its fixed
// default (34 columns) regardless of pool size, and each column always
// holds exactly 5 rows (DomeGallery.tsx's evenYs/oddYs arrays) -- a
// 34-column dome is 170 slots, so a 40-album pool repeated every album
// roughly 4 times, confirmed as visibly excessive on live testing. Sizing
// `segments` to the pool itself (one column per 5 images, rounded up)
// means the dome only ever needs enough duplicates to complete its last
// partial column, not to fill the whole fixed grid regardless of how many
// albums are actually in the pool.
const DOME_ROWS_PER_COLUMN = 5;
const MIN_DOME_SEGMENTS = 4; // keeps the rotation math sane for a very small pool; not a duplicate-padding floor.
const MAX_DOME_SEGMENTS = 34; // the component's original fixed default, kept as an upper bound.

function segmentsForPool(imageCount) {
  return Math.min(MAX_DOME_SEGMENTS, Math.max(MIN_DOME_SEGMENTS, Math.ceil(imageCount / DOME_ROWS_PER_COLUMN)));
}

// DomeGallery's own CSS derives each tile's on-screen width as
// (radius * PI) / segments (--item-width in DomeGallery.css). A *fixed*
// minRadius, independent of segments, means tile size is inversely
// proportional to segments -- so once segments started varying with pool
// size (above), a small record bag (few segments) rendered its tiles
// enormous (confirmed live: "huge, only 2 on screen"), while a large pool
// like the user's own wall (many segments) rendered them small. Both were
// the same underlying bug. Radius now scales WITH segments, solving for
// the radius that keeps each tile's width close to a fixed target
// regardless of how many segments the pool needed, so record bags, search
// results, and the full wall all render comparably sized tiles: smaller
// deliberately on phone, matching the two explicit "too big" / "too
// small" corrections already made on that side.
const PHONE_MAX_WIDTH_PX = 480;
const DESKTOP_TARGET_TILE_PX = 90; // close to the original fixed setup's own effective tile size (900px radius / 34 segments * PI =~ 83px), which was never reported as wrong on desktop.
const PHONE_TARGET_TILE_PX = 55;
// Purely defensive against a pathological near-zero radius; MIN_DOME_SEGMENTS
// already keeps the formula-driven value sane (70px on the smallest phone
// case) well above this, so this floor should never actually bind.
const ABSOLUTE_MIN_RADIUS = 50;
const ABSOLUTE_MAX_RADIUS = 1000; // ceiling matching the original desktop default's order of magnitude.

function domeRadiusForSegments(segments) {
  const targetTilePx = window.innerWidth <= PHONE_MAX_WIDTH_PX ? PHONE_TARGET_TILE_PX : DESKTOP_TARGET_TILE_PX;
  const solvedRadius = Math.round((targetTilePx * segments) / Math.PI);
  return Math.min(ABSOLUTE_MAX_RADIUS, Math.max(ABSOLUTE_MIN_RADIUS, solvedRadius));
}

// domeRadiusForSegments() only ever got passed as `minRadius`, a FLOOR --
// DomeGallery still separately computes its own viewport-driven radius
// (basis * fit) and only falls back to the floor if that computed value is
// SMALLER. On desktop, a small record bag's solved radius is itself small
// (e.g. ~115px for 4 segments), almost always well below whatever a
// normal-sized browser window computes from its own viewport -- so the
// floor never actually won, the uncontrolled viewport-driven radius was
// used instead, and dividing that by a small segment count produced
// exactly the oversized, overlapping tiles reported live a second time
// after the first fix. mount.tsx did not even expose maxRadius as a
// passthrough option before this. Passing the same computed value as both
// minRadius and maxRadius pins the radius exactly, so the segments-aware
// target tile size actually takes effect regardless of what the viewport
// would otherwise have computed.

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

  const domeSegments = segmentsForPool(images.length);
  const domeRadius = domeRadiusForSegments(domeSegments);
  const mount = mountDomeGallery(containerEl, {
    images,
    segments: domeSegments,
    minRadius: domeRadius,
    maxRadius: domeRadius,
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

  const threadPollTimer = setInterval(updateThreadPositions, 100);

  /** Tears this mount down cleanly so a bag switch can remount a fresh pool. */
  function destroy() {
    clearInterval(threadPollTimer);
    if (threadSvg) threadSvg.remove();
    mount.unmount();
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
    getEntry,
    destroy
  };
}

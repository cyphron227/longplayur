// Forked from react-bits' DomeGallery-TS-TW (fetched from the shadcn
// registry at reactbits.dev) with several deliberate, minimal changes from
// the original, everything else left verbatim:
//   1. An `onImageClick` prop that, when provided, replaces the built-in
//      tap-to-enlarge lightbox with a plain callback (Longplayur needs
//      taps to trigger its own needle-drop ceremony, not an internal zoom).
//   2. A forwardRef exposing `focusOn(src)` / `resetRotation()` so the
//      host app can drive the camera programmatically, reusing the
//      component's own computeItemBaseRotation() math.
//   3. The handful of Tailwind utility classNames used in the original
//      are replaced with a small hand-written CSS block, so this can
//      compile without pulling in a Tailwind build step. No visual
//      behaviour changes.
//   4. An onKeyDown handler on each tile firing the same activation as a
//      click. The original gives tiles role="button" + tabIndex={0} but
//      never wires Enter/Space, so keyboard activation silently did
//      nothing even in the upstream component.
//   5. The original injects its CSS at runtime via
//      <style dangerouslySetInnerHTML>. Longplayur's CSP is `style-src
//      'self'` with no 'unsafe-inline', which blocks that (React's
//      style={{...}} props elsewhere are unaffected -- those go through
//      the CSSOM property setter, which style-src does not restrict; only
//      literal <style> elements and style="..." attributes are). Moved
//      verbatim into DomeGallery.css and imported normally instead.
//   6. An `onDragMove` prop firing once per gesture, right when a
//      pointer-down actually crosses the movement threshold that becomes a
//      drag (the same threshold the component's own tap/drag
//      disambiguation already uses). Longplayur uses this to dismiss its
//      "now playing" enlarged cover the moment the gallery is actually
//      moved, not on every tap.
//   7. `onLongPress`/`onLongPressEnd`/`longPressMs` props: holding a tile
//      fires onLongPress instead of the normal tap-select, and suppresses
//      that tap so a long-press does not also select the tile on release.
//      Ships with onContextMenu prevention and -webkit-touch-callout:none
//      (DomeGallery.css), since without them iOS/Android's own native
//      long-press handling (save-image menu, haptics) races this and
//      usually wins, so onLongPress never gets a clean signal.
//   8. buildItems() fills a pool smaller than the slot count with
//      independently shuffled full passes instead of a straight modulo
//      repeat, so a given image only reappears after a full lap through the
//      whole pool (and in a different order each time) rather than at a
//      fixed, small stride. It also repairs true spatial adjacency (each
//      tile's real neighbours in the honeycomb layout: same column above/
//      below, plus the nearest row(s) in the columns either side,
//      including the wrap-around seam), not just adjacent array indices --
//      the original modulo repeat, and an earlier version of this fix,
//      could both still put two spatially-adjacent tiles on the same
//      duplicated album, confirmed live and by simulation as far more
//      likely with a small pool and few columns.
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

type ImageItem = string | { src: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  onImageClick?: (src: string) => void;
  /** Fires once per gesture, the moment a pointer-down actually becomes a
   * drag (crosses the same movement threshold the component's own tap/drag
   * disambiguation uses) -- not on every pointer-down, which would also
   * fire for plain taps before they are known to be taps. */
  onDragMove?: () => void;
  /** Fires after holding a tile for longPressMs without enough movement to
   * count as a drag. Suppresses the normal click/tap selection for that
   * same press so long-pressing does not also select the tile. */
  onLongPress?: (src: string) => void;
  /** Fires on release (or cancel) of a press that triggered onLongPress. */
  onLongPressEnd?: () => void;
  longPressMs?: number;
};

export type DomeGalleryHandle = {
  /** Rotates the dome so the first tile matching `src` faces forward. */
  focusOn: (src: string) => void;
  /** Rotates the dome back to its resting (0, 0) orientation. */
  resetRotation: () => void;
};

type ItemDef = {
  src: string;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULT_IMAGES: ImageItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Abstract art'
  },
  {
    src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Modern sculpture'
  },
  {
    src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Digital artwork'
  },
  {
    src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Contemporary art'
  },
  {
    src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Geometric pattern'
  },
  {
    src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Textured surface'
  },
  {
    src: 'https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large',
    alt: 'Social media image'
  }
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function shuffled<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type NormalizedImage = { src: string; alt: string };

/**
 * One attempt at filling `totalSlots` from independently shuffled full
 * passes of `normalizedImages`, then repairing true spatial adjacency
 * (each tile's real neighbours in the honeycomb layout: same column
 * above/below, plus the nearest row(s) in the columns either side,
 * including the wrap-around seam) via forward swaps. A forward-only swap
 * can run out of later slots to swap into near the end of the fill (there
 * is nothing after the very last slot), so this can still return with
 * `conflicts > 0` -- buildItems() below retries a fresh shuffle when that
 * happens rather than trying to make one single pass provably perfect,
 * since a fresh shuffle succeeds outright the large majority of the time
 * (confirmed by simulation: ~1-2 attempts on average for pool sizes from
 * 5 to 25 images).
 */
function attemptFill(
  normalizedImages: NormalizedImage[],
  totalSlots: number,
  columns: { x: number; y: number }[][],
  columnStart: number[],
  neighborsOf: (col: number, row: number) => number[]
): { usedImages: NormalizedImage[]; conflicts: number } {
  const usedImages: NormalizedImage[] = [];
  while (usedImages.length < totalSlots) {
    usedImages.push(...shuffled(normalizedImages));
  }
  usedImages.length = totalSlots;

  let conflicts = 0;
  let flat = 0;
  for (let c = 0; c < columns.length; c++) {
    for (let r = 0; r < columns[c].length; r++) {
      const assignedNeighbors = neighborsOf(c, r).filter(n => n < flat);
      const hasConflict = assignedNeighbors.some(n => usedImages[n].src === usedImages[flat].src);
      if (hasConflict) {
        let swapped = false;
        for (let j = flat + 1; j < usedImages.length; j++) {
          const wouldStillConflict = assignedNeighbors.some(n => usedImages[n].src === usedImages[j].src);
          if (!wouldStillConflict) {
            const tmp = usedImages[flat];
            usedImages[flat] = usedImages[j];
            usedImages[j] = tmp;
            swapped = true;
            break;
          }
        }
        if (!swapped) conflicts++;
      }
      flat++;
    }
  }
  return { usedImages, conflicts };
}

const BUILD_ITEMS_MAX_ATTEMPTS = 20;

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  // Kept per-column (not flattened yet) so the repair pass below can find
  // each tile's real spatial neighbours, not just its neighbours in the
  // flat array.
  const columns = xCols.map((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });
  const coords = columns.flat();

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`
    );
  }

  const normalizedImages = pool.map(image => {
    if (typeof image === 'string') {
      return { src: image, alt: '' };
    }
    return { src: image.src || '', alt: image.alt || '' };
  });

  // The full-passes shuffle (a pool smaller than the slot count has to
  // repeat, but repeating it in the same order every lap -- image[0]
  // always at slot 0, slot N, slot 2N... -- meant near-duplicates could
  // land close enough together to both be visible on screen at once) used
  // to only ever compare adjacent ARRAY indices, which happens to catch
  // same-column vertical neighbours (coords are built column by column)
  // but misses angularly-adjacent tiles in the NEXT column entirely --
  // confirmed live (two visibly adjacent tiles on the dome showing the
  // same cover, most noticeable with a small pool and few columns) and by
  // simulation (dozens to hundreds of such collisions per hundred builds
  // for an 18-image, 4-column dome; zero for a 120-image, 24-column one).
  //
  // attemptFill() instead checks each tile's true spatial neighbours: the
  // row above/below in its own column, plus the nearest row(s) in the
  // columns either side -- which, because odd/even columns use offset row
  // sets to create the honeycomb layout, are not simply "the same index
  // shifted by one column's length". Walking column by column (the same
  // order the dome wraps its columns in) means a column's neighbouring
  // column is always already assigned by the time it's checked, including
  // the wrap-around seam between the first and last column.
  //
  // Its forward-only swap can still leave a handful of conflicts unresolved
  // right near the end of the fill (nothing left to swap into), so a fresh
  // shuffle is retried on conflict rather than accepting the first attempt
  // outright -- confirmed by simulation to reach zero conflicts within 1-2
  // attempts on average for every pool size that has enough distinct
  // images to make zero achievable at all; a pool too small for that
  // (fewer unique images than a single column has rows) keeps whichever
  // attempt had the fewest conflicts once the budget below is spent, since
  // no shuffle of an inherently too-small pool can avoid every repeat.
  const columnStart: number[] = [];
  {
    let acc = 0;
    for (const col of columns) {
      columnStart.push(acc);
      acc += col.length;
    }
  }
  const flatIndexOf = (col: number, row: number) => columnStart[col] + row;
  const neighborsOf = (col: number, row: number): number[] => {
    const out: number[] = [];
    if (row > 0) out.push(flatIndexOf(col, row - 1));
    if (row < columns[col].length - 1) out.push(flatIndexOf(col, row + 1));
    const y = columns[col][row].y;
    for (const nc of [(col - 1 + seg) % seg, (col + 1) % seg]) {
      if (nc === col) continue; // guards a degenerate seg<=1, not expected in practice.
      columns[nc].forEach((coord, nr) => {
        if (Math.abs(coord.y - y) <= 1) out.push(flatIndexOf(nc, nr));
      });
    }
    return out;
  };

  let best = attemptFill(normalizedImages, totalSlots, columns, columnStart, neighborsOf);
  for (let attempt = 1; best.conflicts > 0 && attempt < BUILD_ITEMS_MAX_ATTEMPTS; attempt++) {
    const next = attemptFill(normalizedImages, totalSlots, columns, columnStart, neighborsOf);
    if (next.conflicts < best.conflicts) best = next;
  }

  return coords.map((c, i) => ({
    ...c,
    src: best.usedImages[i].src,
    alt: best.usedImages[i].alt
  }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

const DomeGallery = forwardRef<DomeGalleryHandle, DomeGalleryProps>(function DomeGallery(
  {
    images = DEFAULT_IMAGES,
    fit = 0.5,
    fitBasis = 'auto',
    minRadius = 600,
    maxRadius = Infinity,
    padFactor = 0.25,
    overlayBlurColor = '#120F17',
    maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
    dragSensitivity = DEFAULTS.dragSensitivity,
    enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
    segments = DEFAULTS.segments,
    dragDampening = 2,
    openedImageWidth = '400px',
    openedImageHeight = '400px',
    imageBorderRadius = '30px',
    openedImageBorderRadius = '30px',
    grayscale = true,
    onImageClick,
    onDragMove,
    onLongPress,
    onLongPressEnd,
    longPressMs = 500
  },
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef<'mouse' | 'pen' | 'touch'>('mouse');
  const tapTargetRef = useRef<HTMLElement | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const longPressTimerRef = useRef<number | null>(null);
  const longPressFiredRef = useRef(false);
  const longPressStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const LONG_PRESS_MOVE_THRESH_PX = 10;

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const endLongPressIfActive = useCallback(() => {
    clearLongPressTimer();
    if (longPressFiredRef.current) {
      longPressFiredRef.current = false;
      onLongPressEnd?.();
    }
  }, [clearLongPressTimer, onLongPressEnd]);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add('dg-scroll-lock');
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    document.body.classList.remove('dg-scroll-lock');
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      focusOn: (src: string) => {
        const nodes = sphereRef.current?.querySelectorAll<HTMLElement>('[data-src]');
        if (!nodes) return;
        let target: HTMLElement | null = null;
        for (const node of Array.from(nodes)) {
          if (node.dataset.src === src) {
            target = node;
            break;
          }
        }
        if (!target) return;

        const offsetX = getDataNumber(target, 'offsetX', 0);
        const offsetY = getDataNumber(target, 'offsetY', 0);
        const sizeX = getDataNumber(target, 'sizeX', 2);
        const sizeY = getDataNumber(target, 'sizeY', 2);
        const rot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
        const nextX = clamp(-rot.rotateX, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(-rot.rotateY);
        rotationRef.current = { x: nextX, y: nextY };
        if (sphereRef.current) sphereRef.current.style.transition = 'transform 600ms ease';
        applyTransform(nextX, nextY);
        window.setTimeout(() => {
          if (sphereRef.current) sphereRef.current.style.transition = '';
        }, 650);
      },
      resetRotation: () => {
        rotationRef.current = { x: 0, y: 0 };
        if (sphereRef.current) sphereRef.current.style.transition = 'transform 600ms ease';
        applyTransform(0, 0);
        window.setTimeout(() => {
          if (sphereRef.current) sphereRef.current.style.transition = '';
        }, 650);
      }
    }),
    [segments, maxVerticalRotationDeg]
  );

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const enlargedOverlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement;
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();

        const hasCustomSize = openedImageWidth && openedImageHeight;
        if (hasCustomSize) {
          const tempDiv = document.createElement('div');
          tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          document.body.removeChild(tempDiv);

          const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;
          const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;

          enlargedOverlay.style.left = `${centeredLeft}px`;
          enlargedOverlay.style.top = `${centeredTop}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();

        const evt = event as PointerEvent;
        pointerTypeRef.current = (evt.pointerType as any) || 'mouse';
        if (pointerTypeRef.current === 'touch') evt.preventDefault();
        if (pointerTypeRef.current === 'touch') lockScroll();
        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        const potential = (evt.target as Element).closest?.('.item__image') as HTMLElement | null;
        tapTargetRef.current = potential || null;
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;

        const evt = event as PointerEvent;
        if (pointerTypeRef.current === 'touch') evt.preventDefault();

        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) {
            movedRef.current = true;
            onDragMove?.();
          }
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;
          let isTap = false;

          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x;
            const dy = evt.clientY - startPosRef.current.y;
            const dist2 = dx * dx + dy * dy;
            const TAP_THRESH_PX = pointerTypeRef.current === 'touch' ? 10 : 6;
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true;
            }
          }

          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          }
          startPosRef.current = null;
          cancelTapRef.current = !isTap;

          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            if (onImageClick) {
              const parent = tapTargetRef.current.parentElement as HTMLElement | null;
              const src = parent?.dataset.src || '';
              if (src) onImageClick(src);
            } else {
              openItemFromElement(tapTargetRef.current);
            }
          }
          tapTargetRef.current = null;

          if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120);
          if (pointerTypeRef.current === 'touch') unlockScroll();
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      }
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement as HTMLElement;
      const overlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement | null;
      if (!overlay) return;

      const refDiv = parent.querySelector('.item__image--reference') as HTMLElement | null;

      const originalPos = originalTilePositionRef.current;
      if (!originalPos) {
        overlay.remove();
        if (refDiv) refDiv.remove();
        parent.style.setProperty('--rot-y-delta', `0deg`);
        parent.style.setProperty('--rot-x-delta', `0deg`);
        el.style.visibility = '';
        (el.style as any).zIndex = 0;
        focusedElRef.current = null;
        rootRef.current?.removeAttribute('data-enlarging');
        openingRef.current = false;
        return;
      }

      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current!.getBoundingClientRect();

      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height
      };

      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height
      };

      const animatingOverlay = document.createElement('div');
      animatingOverlay.className = 'enlarge-closing';
      animatingOverlay.style.cssText = `
        position: absolute;
        left: ${overlayRelativeToRoot.left}px;
        top: ${overlayRelativeToRoot.top}px;
        width: ${overlayRelativeToRoot.width}px;
        height: ${overlayRelativeToRoot.height}px;
        z-index: 9999;
        border-radius: ${openedImageBorderRadius};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${enlargeTransitionMs}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${grayscale ? 'grayscale(1)' : 'none'};
      `;

      const originalImg = overlay.querySelector('img');
      if (originalImg) {
        const img = originalImg.cloneNode() as HTMLImageElement;
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
        animatingOverlay.appendChild(img);
      }

      overlay.remove();
      rootRef.current!.appendChild(animatingOverlay);

      void animatingOverlay.getBoundingClientRect();

      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';
        animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';
        animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';
        animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';
        animatingOverlay.style.opacity = '0';
      });

      const cleanup = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;

        if (refDiv) refDiv.remove();
        parent.style.transition = 'none';
        el.style.transition = 'none';

        parent.style.setProperty('--rot-y-delta', `0deg`);
        parent.style.setProperty('--rot-x-delta', `0deg`);

        requestAnimationFrame(() => {
          el.style.visibility = '';
          el.style.opacity = '0';
          (el.style as any).zIndex = 0;
          focusedElRef.current = null;
          rootRef.current?.removeAttribute('data-enlarging');

          requestAnimationFrame(() => {
            parent.style.transition = '';
            el.style.transition = 'opacity 300ms ease-out';

            requestAnimationFrame(() => {
              el.style.opacity = '1';
              setTimeout(() => {
                el.style.transition = '';
                el.style.opacity = '';
                openingRef.current = false;
                if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true') {
                  document.body.classList.remove('dg-scroll-lock');
                }
              }, 300);
            });
          });
        });
      };

      animatingOverlay.addEventListener('transitionend', cleanup, {
        once: true
      });
    };

    scrim.addEventListener('click', close);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      scrim.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [enlargeTransitionMs, openedImageBorderRadius, grayscale]);

  const openItemFromElement = (el: HTMLElement) => {
    if (openingRef.current) return;
    openingRef.current = true;
    openStartedAtRef.current = performance.now();
    lockScroll();
    const parent = el.parentElement as HTMLElement;
    focusedElRef.current = el;
    el.setAttribute('data-focused', 'true');
    const offsetX = getDataNumber(parent, 'offsetX', 0);
    const offsetY = getDataNumber(parent, 'offsetY', 0);
    const sizeX = getDataNumber(parent, 'sizeX', 2);
    const sizeY = getDataNumber(parent, 'sizeY', 2);
    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(rotationRef.current.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - rotationRef.current.x;
    parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
    parent.style.setProperty('--rot-x-delta', `${rotX}deg`);
    const refDiv = document.createElement('div');
    refDiv.className = 'item__image item__image--reference opacity-0';
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);

    void refDiv.offsetHeight;

    const tileR = refDiv.getBoundingClientRect();
    const mainR = mainRef.current?.getBoundingClientRect();
    const frameR = frameRef.current?.getBoundingClientRect();

    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
      openingRef.current = false;
      focusedElRef.current = null;
      parent.removeChild(refDiv);
      unlockScroll();
      return;
    }

    originalTilePositionRef.current = {
      left: tileR.left,
      top: tileR.top,
      width: tileR.width,
      height: tileR.height
    };
    el.style.visibility = 'hidden';
    (el.style as any).zIndex = 0;
    const overlay = document.createElement('div');
    overlay.className = 'enlarge';
    overlay.style.cssText = `position:absolute; left:${frameR.left - mainR.left}px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${frameR.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);`;
    const rawSrc = parent.dataset.src || (el.querySelector('img') as HTMLImageElement)?.src || '';
    const rawAlt = parent.dataset.alt || (el.querySelector('img') as HTMLImageElement)?.alt || '';
    const img = document.createElement('img');
    img.src = rawSrc;
    img.alt = rawAlt;
    img.style.cssText = `width:100%; height:100%; object-fit:cover; filter:${grayscale ? 'grayscale(1)' : 'none'};`;
    overlay.appendChild(img);
    viewerRef.current!.appendChild(overlay);
    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = tileR.width / frameR.width;
    const sy0 = tileR.height / frameR.height;

    const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
    const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;
    setTimeout(() => {
      if (!overlay.parentElement) return;
      overlay.style.opacity = '1';
      overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
      rootRef.current?.setAttribute('data-enlarging', 'true');
    }, 16);
    const wantsResize = openedImageWidth || openedImageHeight;
    if (wantsResize) {
      const onFirstEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== 'transform') return;
        overlay.removeEventListener('transitionend', onFirstEnd);
        const prevTransition = overlay.style.transition;
        overlay.style.transition = 'none';
        const tempWidth = openedImageWidth || `${frameR.width}px`;
        const tempHeight = openedImageHeight || `${frameR.height}px`;
        overlay.style.width = tempWidth;
        overlay.style.height = tempHeight;
        const newRect = overlay.getBoundingClientRect();
        overlay.style.width = frameR.width + 'px';
        overlay.style.height = frameR.height + 'px';
        void overlay.offsetWidth;
        overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
        const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
        const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
        requestAnimationFrame(() => {
          overlay.style.left = `${centeredLeft}px`;
          overlay.style.top = `${centeredTop}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
        });
        const cleanupSecond = () => {
          overlay.removeEventListener('transitionend', cleanupSecond);
          overlay.style.transition = prevTransition;
        };
        overlay.addEventListener('transitionend', cleanupSecond, {
          once: true
        });
      };
      overlay.addEventListener('transitionend', onFirstEnd);
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('dg-scroll-lock');
      clearLongPressTimer();
    };
  }, [clearLongPressTimer]);

  return (
    <>
      <div
        ref={rootRef}
        className="sphere-root"
        style={
          {
            ['--segments-x' as any]: segments,
            ['--segments-y' as any]: segments,
            ['--overlay-blur-color' as any]: overlayBlurColor,
            ['--tile-radius' as any]: imageBorderRadius,
            ['--enlarge-radius' as any]: openedImageBorderRadius,
            ['--image-filter' as any]: grayscale ? 'grayscale(1)' : 'none'
          } as React.CSSProperties
        }
      >
        <main
          ref={mainRef}
          className="dg-main"
          style={{
            touchAction: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item dg-sphere-item-pos"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={
                    {
                      ['--offset-x' as any]: it.x,
                      ['--offset-y' as any]: it.y,
                      ['--item-size-x' as any]: it.sizeX,
                      ['--item-size-y' as any]: it.sizeY,
                      top: '-999px',
                      bottom: '-999px',
                      left: '-999px',
                      right: '-999px'
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="item__image"
                    role="button"
                    tabIndex={0}
                    aria-label={it.alt || 'Open image'}
                    onContextMenu={e => {
                      // Without this, iOS/Android's native long-press context
                      // menu (save image, haptic feedback, etc.) races the
                      // custom long-press timer above and usually wins,
                      // showing the OS menu instead of onLongPress's preview.
                      if (onLongPress) e.preventDefault();
                    }}
                    onClick={e => {
                      if (longPressFiredRef.current) {
                        longPressFiredRef.current = false;
                        return; // this press was a long-press, not a tap.
                      }
                      if (draggingRef.current) return;
                      if (movedRef.current) return;
                      if (performance.now() - lastDragEndAt.current < 80) return;
                      if (onImageClick) {
                        onImageClick(it.src);
                        return;
                      }
                      if (openingRef.current) return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    onPointerDown={e => {
                      if (!onLongPress) return;
                      longPressFiredRef.current = false;
                      longPressStartPosRef.current = { x: e.clientX, y: e.clientY };
                      clearLongPressTimer();
                      const src = it.src;
                      longPressTimerRef.current = window.setTimeout(() => {
                        longPressTimerRef.current = null;
                        if (draggingRef.current || movedRef.current) return;
                        longPressFiredRef.current = true;
                        onLongPress(src);
                      }, longPressMs);
                    }}
                    onPointerMove={e => {
                      if (longPressTimerRef.current === null || !longPressStartPosRef.current) return;
                      const dx = e.clientX - longPressStartPosRef.current.x;
                      const dy = e.clientY - longPressStartPosRef.current.y;
                      if (dx * dx + dy * dy > LONG_PRESS_MOVE_THRESH_PX * LONG_PRESS_MOVE_THRESH_PX) {
                        clearLongPressTimer();
                      }
                    }}
                    onPointerUp={e => {
                      const wasLongPress = longPressFiredRef.current;
                      endLongPressIfActive();
                      if (wasLongPress) return; // release after a long-press: do not also select.

                      if ((e.nativeEvent as PointerEvent).pointerType !== 'touch') return;
                      if (draggingRef.current) return;
                      if (movedRef.current) return;
                      if (performance.now() - lastDragEndAt.current < 80) return;
                      if (onImageClick) return; // handled by onClick above.
                      if (openingRef.current) return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    onPointerLeave={endLongPressIfActive}
                    onPointerCancel={endLongPressIfActive}
                    onKeyDown={e => {
                      if (e.key !== 'Enter' && e.key !== ' ') return;
                      e.preventDefault();
                      if (onImageClick) {
                        onImageClick(it.src);
                        return;
                      }
                      if (openingRef.current) return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    style={{
                      inset: '10px',
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      className="dg-tile-img"
                      style={{
                        backfaceVisibility: 'hidden',
                        filter: `var(--image-filter, ${grayscale ? 'grayscale(1)' : 'none'})`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="dg-overlay-radial"
            style={{
              backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`
            }}
          />

          <div
            className="dg-overlay-radial"
            style={{
              WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`,
              maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`,
              backdropFilter: 'blur(3px)'
            }}
          />

          <div
            className="dg-edge-top"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
            }}
          />
          <div
            className="dg-edge-bottom"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
            }}
          />

          <div ref={viewerRef} className="dg-viewer" style={{ padding: 'var(--viewer-pad)' }}>
            <div
              ref={scrimRef}
              className="scrim dg-scrim"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(3px)'
              }}
            />
            <div
              ref={frameRef}
              className="viewer-frame dg-viewer-frame"
              style={{
                borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})`
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
});

export default DomeGallery;

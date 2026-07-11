// The only bridge between the React DomeGallery and the rest of Longplayur
// (plain vanilla JS). Compiled by Vite into a single self-contained ES
// module (React/ReactDOM/use-gesture inlined) so js/wall.js can just
// `import` the build output like any other static file, with no runtime
// build step for deployment.
import { createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import DomeGallery, { type DomeGalleryHandle } from './DomeGallery';

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface MountOptions {
  images: GalleryImage[];
  onImageClick: (src: string) => void;
  fit?: number;
  minRadius?: number;
  maxVerticalRotationDeg?: number;
  segments?: number;
  dragDampening?: number;
  grayscale?: boolean;
}

export interface DomeGalleryMount {
  focusOn: (src: string) => void;
  resetRotation: () => void;
  unmount: () => void;
}

export function mountDomeGallery(container: HTMLElement, options: MountOptions): DomeGalleryMount {
  const handleRef: { current: DomeGalleryHandle | null } = { current: null };
  const root: Root = createRoot(container);

  root.render(
    createElement(DomeGallery, {
      ref: (h: DomeGalleryHandle | null) => {
        handleRef.current = h;
      },
      images: options.images,
      onImageClick: options.onImageClick,
      fit: options.fit ?? 0.8,
      minRadius: options.minRadius ?? 900,
      // Locked back to 0 (no vertical tilt) per explicit request, reverting
      // an earlier "unlock vertical drag" change: dragging vertically must
      // not reveal blank space above/below the tile band.
      maxVerticalRotationDeg: options.maxVerticalRotationDeg ?? 0,
      segments: options.segments ?? 34,
      dragDampening: options.dragDampening ?? 2,
      grayscale: options.grayscale ?? false
    })
  );

  return {
    focusOn: (src: string) => handleRef.current?.focusOn(src),
    resetRotation: () => handleRef.current?.resetRotation(),
    unmount: () => root.unmount()
  };
}

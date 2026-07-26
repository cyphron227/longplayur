// The only bridge between the React transport (Transport.tsx) and the rest
// of Longplayur (plain vanilla JS). Compiled by Vite into a single
// self-contained ES module (React/ReactDOM/react-h5-audio-player inlined)
// so js/main.js can just `import` the build output like any other static
// file, with no runtime build step for deployment. Same pattern as
// gallery/src/mount.tsx.
import { createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import Transport, { type TransportViewModel, type TransportHandlers } from './Transport';

export type { TransportViewModel, TransportHandlers };

export interface TransportMount {
  /** Re-renders with a fresh view model. Cheap to call on every playback poll/tick -- React only touches the DOM nodes that actually changed. */
  update: (viewModel: TransportViewModel) => void;
  unmount: () => void;
}

export function mountTransport(container: HTMLElement, handlers: TransportHandlers): TransportMount {
  const root: Root = createRoot(container);

  return {
    update(viewModel: TransportViewModel) {
      root.render(createElement(Transport, { viewModel, handlers }));
    },
    unmount() {
      root.unmount();
    },
  };
}

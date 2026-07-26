import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Library build only, same pattern as ../gallery: compiles src/mount.tsx
// into a single self-contained ES module written straight into ../js, so
// the deployed site stays a plain static build with no runtime build step.
// Re-run `npm run build` in this folder after editing anything in src/.
export default defineConfig({
  plugins: [react()],
  // See gallery/vite.config.ts's own comment on this: library mode does
  // not statically replace process.env.NODE_ENV the way Vite's normal
  // app-build mode does, and react-dom's entry point branches on it at
  // module-evaluation time. Without this the build throws "process is not
  // defined" in a browser tab, which has no process global.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    lib: {
      entry: 'src/mount.tsx',
      formats: ['es'],
      fileName: () => 'transport.bundle.js'
    },
    outDir: '../js',
    emptyOutDir: false,
    minify: true,
    rollupOptions: {
      // As in gallery/vite.config.ts: force everything inlined rather than
      // externalized, since there is no import map for a browser to
      // resolve bare "react"/"react-dom" specifiers against.
      external: [],
      output: {
        inlineDynamicImports: true,
        // react-h5-audio-player's own stylesheet and this component's CSS
        // are both imported normally (see Transport.tsx), so Vite extracts
        // them as one real stylesheet rather than injecting via a
        // JS-created <style> tag -- required by the site's CSP (style-src
        // 'self', no 'unsafe-inline'), same reasoning as
        // dome-gallery.bundle.css.
        assetFileNames: 'transport.bundle.css'
      }
    }
  }
});

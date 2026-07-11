import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Library build only: compiles src/mount.tsx (+ DomeGallery.tsx) into a
// single self-contained ES module written straight into ../js, so the
// deployed site stays a plain static build with no runtime build step.
// Re-run `npm run build` in this folder after editing anything in src/.
export default defineConfig({
  plugins: [react()],
  // React (react-dom's own entry point) branches on process.env.NODE_ENV
  // at module-evaluation time to pick its production build internally.
  // Vite's normal app-build mode statically replaces that automatically;
  // library mode does not, so without this it survives into the output
  // and throws "process is not defined" in a browser, which has no
  // process global. This is what silently broke the whole page: the
  // failed import halted every module that depended on it, including
  // main.js, so nothing after it (redirect URI text, the Connect button's
  // click handler) ever ran.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    lib: {
      entry: 'src/mount.tsx',
      formats: ['es'],
      fileName: () => 'dome-gallery.bundle.js'
    },
    outDir: '../js',
    emptyOutDir: false,
    minify: true,
    rollupOptions: {
      // Vite's library mode externalizes package.json dependencies by
      // default (assuming a consuming app will provide them, npm-library
      // style). This build needs the opposite: a single fully
      // self-contained file with no bare "react"/"react-dom" specifiers
      // left behind, since a browser can't resolve those without an
      // import map. Force everything to be inlined.
      external: [],
      output: {
        inlineDynamicImports: true,
        // DomeGallery.css is imported normally (see DomeGallery.tsx) so
        // Vite extracts it as a real, separate stylesheet rather than
        // injecting it via a JS-created <style> tag at runtime -- the
        // whole point, since the site's CSP (style-src 'self', no
        // 'unsafe-inline') blocks inline <style> elements. Default
        // asset naming would call this "longplayur-gallery-build.css"
        // (after package.json's name); name it to match the JS bundle.
        assetFileNames: 'dome-gallery.bundle.css'
      }
    }
  }
});

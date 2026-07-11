import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Library build only: compiles src/mount.tsx (+ DomeGallery.tsx) into a
// single self-contained ES module written straight into ../js, so the
// deployed site stays a plain static build with no runtime build step.
// Re-run `npm run build` in this folder after editing anything in src/.
export default defineConfig({
  plugins: [react()],
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
      output: {
        inlineDynamicImports: true
      }
    }
  }
});

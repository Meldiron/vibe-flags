import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'iife'],
      name: 'VibeFlags',
      fileName: (format) => `vibe-flags.cdn.${format === 'es' ? 'mjs' : 'js'}`,
    },
    outDir: 'dist',
    emptyOutDir: false,
    target: 'es2021',
    minify: 'esbuild',
  },
});

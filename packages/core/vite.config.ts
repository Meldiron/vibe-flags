import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'vibe-flags',
    },
    rollupOptions: {
      external: [/^lit/, /^@lit/],
    },
    target: 'es2021',
    minify: 'esbuild',
  },
  plugins: [
    dts({ include: ['src'], rollupTypes: true }),
  ],
});

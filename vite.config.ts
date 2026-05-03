import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Pages this site is served from /Humerus-website/.
// Locally and in `npm run preview` we want the root path. Override with
// VITE_BASE='/foo/' if the repo is ever renamed or moved to a custom domain.
const base = process.env.VITE_BASE ?? (process.env.GITHUB_PAGES === 'true' ? '/Humerus-website/' : '/');

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});

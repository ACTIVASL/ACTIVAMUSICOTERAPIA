import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    react(),
    // ViteImageOptimizer({
    //     png: { quality: 80 },
    //     jpeg: { quality: 75 },
    //     webp: { quality: 80, lossless: true },
    //     avif: { quality: 70, lossless: true },
    // }),
  ],
  server: {
    port: 3001,
  },
});

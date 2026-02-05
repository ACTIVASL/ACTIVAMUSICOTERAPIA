import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM Shim for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        id: '/',
        name: 'Activa Musicoterapia Clínica',
        short_name: 'ActivaCRM',
        description: 'Sistema Operativo Clínico Soberano',
        theme_color: '#EC008C',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['medical', 'productivity', 'health'],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: 'screenshot-clinic-1.jpg',
            sizes: '1170x2532',
            type: 'image/jpg',
            form_factor: 'narrow',
            label: 'Dashboard Clínico Móvil',
          },
          {
            src: 'screenshot-clinic-4.jpg',
            sizes: '2880x1800',
            type: 'image/jpg',
            form_factor: 'wide',
            label: 'Gestión de Pacientes Escritorio',
          },
        ],
        shortcuts: [
          {
            name: 'Nuevo Paciente',
            short_name: 'Paciente',
            description: 'Registrar una nueva ficha clínica',
            url: '/patients',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', '@tanstack/react-query', 'react-router-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@tanstack/react-query'],
  },
});

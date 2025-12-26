import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', // ✅ This is crucial for Instagram and other WebViews
  plugins: [
    react(), tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Brancha',
        short_name: 'Brancha',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#FF6B6B',
        icons: [
          {
            src: '/pwa-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});

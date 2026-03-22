import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dashboard Elecciones Vinto 2026',
        short_name: 'Elecciones Vinto',
        description: 'Dashboard en tiempo real para las elecciones subnacionales',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone',
        icons: [
          {
            src: '/img/p11-logo.png', // Fallback icon
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/p11-logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})

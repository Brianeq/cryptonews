// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // ¡NUEVO BLOQUE AÑADIDO!
  server: {
    // Configura el proxy
    proxy: {
      // Cuando la aplicación pida /api/cmc, lo redirige al servidor real de CMC
      '/api/cmc': {
        // El destino real de la API
        target: 'https://pro-api.coinmarketcap.com',
        // Cambia el encabezado 'Host' al destino (CMC)
        changeOrigin: true, 
        // Elimina el prefijo /api/cmc antes de enviarlo a CMC
        rewrite: (path) => path.replace(/^\/api\/cmc/, ''), 
      },
    },
  },
  // FIN DEL NUEVO BLOQUE
})
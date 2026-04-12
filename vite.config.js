import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // Browser uses the same host as the Vite page (e.g. phone → 192.168.x.x:5173).
    // Relative /api calls are proxied to Express so "localhost:3001" is not required in the client.
    proxy: {
      '/api': { target: 'http://127.0.0.1:3001', changeOrigin: true },
      '/health': { target: 'http://127.0.0.1:3001', changeOrigin: true },
    },
  },
  preview: {
    proxy: {
      '/api': { target: 'http://127.0.0.1:3001', changeOrigin: true },
      '/health': { target: 'http://127.0.0.1:3001', changeOrigin: true },
    },
  },
})
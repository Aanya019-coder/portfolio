import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/resume.pdf': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // Proxy any PDF requests to the Express server
      '^/.*\\.pdf$': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})

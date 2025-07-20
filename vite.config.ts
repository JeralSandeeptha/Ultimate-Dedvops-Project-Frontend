import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // Bind to 0.0.0.0 to allow access from outside the container
    port: 5173,           // Optional: ensures consistency
    strictPort: true,     // Optional: fail if port is taken
    watch: {
      usePolling: true,   // Important: Enables file watching via polling inside Docker
    },
  },
})

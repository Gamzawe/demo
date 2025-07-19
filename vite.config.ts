import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '')
  
  return {
    plugins: [react()],
    define: {
      // Expose env variables to the client
      __APP_ENV__: JSON.stringify(env.APP_ENV || mode),
    },
    server: {
      // Configure dev server
      port: 5173,
      host: true,
    },
    build: {
      // Build configuration
      outDir: 'dist',
      sourcemap: mode === 'development',
    },
  }
})

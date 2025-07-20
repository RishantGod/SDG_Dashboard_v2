import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SDG_Dashboard_v2/', // This now matches your homepage
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

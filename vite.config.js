import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base '/' works for Vercel/Netlify. For GitHub Pages, set base to '/<repo-name>/'
// either here or via the VITE_BASE_PATH env variable at build time.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base '/' works for Vercel/Netlify. For GitHub Pages, set base to '/<repo-name>/'
// either here or via the VITE_BASE_PATH env variable at build time.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    rollupOptions: {
      // Ces librairies sont optionnelles (notifications Email/Supabase/Firebase).
      // On les exclut du build tant qu'elles ne sont pas installées, pour éviter
      // une erreur si elles ne sont pas utilisées.
      external: [
        '@emailjs/browser',
        '@supabase/supabase-js',
        'firebase/app',
        'firebase/firestore',
      ],
    },
  },
})

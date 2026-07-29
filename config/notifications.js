// ─────────────────────────────────────────────────────────────
// Configuration des notifications
// ─────────────────────────────────────────────────────────────
// Choisis UN provider et renseigne les variables d'environnement
// correspondantes dans un fichier .env (voir .env.example).
// Aucune autre partie du code n'a besoin d'être modifiée.
//
// Providers disponibles : 'discord' | 'email' | 'supabase' | 'firebase' | 'none'
// ─────────────────────────────────────────────────────────────

export const notificationsConfig = {
  provider: import.meta.env.VITE_NOTIFICATION_PROVIDER || 'none',

  discord: {
    webhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_URL || '',
  },

  // Email envoyé via EmailJS (https://www.emailjs.com), qui fonctionne
  // depuis un site 100% statique (Vercel / Netlify / GitHub Pages)
  // sans backend.
  email: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    toEmail: import.meta.env.VITE_NOTIFICATION_EMAIL || '',
  },

  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    table: import.meta.env.VITE_SUPABASE_TABLE || 'reponses_date',
  },

  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    collection: import.meta.env.VITE_FIREBASE_COLLECTION || 'reponses_date',
  },
}

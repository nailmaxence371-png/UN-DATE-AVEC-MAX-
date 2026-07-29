import { notificationsConfig } from '../../config/notifications.js'

/**
 * Envoie les informations de la réponse au provider configuré dans
 * config/notifications.js. Ne bloque jamais l'expérience utilisateur :
 * les erreurs sont loguées en console plutôt que remontées à l'écran.
 *
 * @param {{
 *   firstName: string,
 *   dateAccepted: string,
 *   mbappeAnswer: string,
 *   day: string,
 *   slot: string,
 * }} payload
 */
export async function sendNotification(payload) {
  const data = {
    ...payload,
    respondedAt: new Date().toISOString(),
  }

  try {
    switch (notificationsConfig.provider) {
      case 'discord':
        await sendDiscord(data)
        break
      case 'email':
        await sendEmail(data)
        break
      case 'supabase':
        await sendSupabase(data)
        break
      case 'firebase':
        await sendFirebase(data)
        break
      default:
        console.info('[notifications] Aucun provider configuré — réponse non transmise.', data)
    }
  } catch (err) {
    console.error('[notifications] Échec de l\'envoi de la notification :', err)
  }
}

async function sendDiscord(data) {
  const { webhookUrl } = notificationsConfig.discord
  if (!webhookUrl) throw new Error('VITE_DISCORD_WEBHOOK_URL manquant')

  const content = [
    '💌 **Nouvelle réponse au date !**',
    `**Prénom :** ${data.firstName}`,
    `**A accepté le date :** ${data.dateAccepted}`,
    `**Ballon d'Or Mbappé :** ${data.mbappeAnswer}`,
    `**Jour choisi :** ${data.day}`,
    `**Horaire :** ${data.slot}`,
    `**Répondu le :** ${data.respondedAt}`,
  ].join('\n')

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
}

async function sendEmail(data) {
  const { serviceId, templateId, publicKey, toEmail } = notificationsConfig.email
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Configuration EmailJS incomplète (voir .env.example)')
  }

  // Importé dynamiquement pour ne pas alourdir le bundle si l'e-mail
  // n'est pas le provider choisi. Installer avec : npm install @emailjs/browser
  const emailjs = await import('@emailjs/browser')

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email: toEmail,
      first_name: data.firstName,
      date_accepted: data.dateAccepted,
      mbappe_answer: data.mbappeAnswer,
      day: data.day,
      slot: data.slot,
      responded_at: data.respondedAt,
    },
    { publicKey }
  )
}

async function sendSupabase(data) {
  const { url, anonKey, table } = notificationsConfig.supabase
  if (!url || !anonKey) throw new Error('Configuration Supabase incomplète (voir .env.example)')

  // Installer avec : npm install @supabase/supabase-js
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(url, anonKey)

  const { error } = await supabase.from(table).insert([
    {
      first_name: data.firstName,
      date_accepted: data.dateAccepted,
      mbappe_answer: data.mbappeAnswer,
      day: data.day,
      slot: data.slot,
      responded_at: data.respondedAt,
    },
  ])
  if (error) throw error
}

async function sendFirebase(data) {
  const { apiKey, authDomain, projectId, appId, collection } = notificationsConfig.firebase
  if (!apiKey || !projectId) throw new Error('Configuration Firebase incomplète (voir .env.example)')

  // Installer avec : npm install firebase
  const { initializeApp, getApps } = await import('firebase/app')
  const { getFirestore, collection: col, addDoc } = await import('firebase/firestore')

  const firebaseConfig = { apiKey, authDomain, projectId, appId }
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  const db = getFirestore(app)

  await addDoc(col(db, collection), {
    firstName: data.firstName,
    dateAccepted: data.dateAccepted,
    mbappeAnswer: data.mbappeAnswer,
    day: data.day,
    slot: data.slot,
    respondedAt: data.respondedAt,
  })
}

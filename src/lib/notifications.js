import { notificationsConfig } from '../../config/notifications.js'

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
    `**Date choisie :** ${data.date}`,
    `**Heure choisie :** ${data.time}`,
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
  const emailjs = await import('@emailjs/browser')
  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email: toEmail,
      first_name: data.firstName,
      date_accepted: data.dateAccepted,
      mbappe_answer: data.mbappeAnswer,
      date: data.date,
      time: data.time,
      responded_at: data.respondedAt,
    },
    { publicKey }
  )
}

async function sendSupabase(data) {
  const { url, anonKey, table } = notificationsConfig.supabase
  if (!url || !anonKey) throw new Error('Configuration Supabase incomplète (voir .env.example)')
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(url, anonKey)
  const { error } = await supabase.from(table).insert([
    {
      first_name: data.firstName,
      date_accepted: data.dateAccepted,
      mbappe_answer: data.mbappeAnswer,
      chosen_date: data.date,
      chosen_time: data.time,
      responded_at: data.respondedAt,
    },
  ])
  if (error) throw error
}

async function sendFirebase(data) {
  const { apiKey, authDomain, projectId, appId, collection } = notificationsConfig.firebase
  if (!apiKey || !projectId) throw new Error('Configuration Firebase incomplète (voir .env.example)')
  const { initializeApp, getApps } = await import('firebase/app')
  const { getFirestore, collection: col, addDoc } = await import('firebase/firestore')
  const firebaseConfig = { apiKey, authDomain, projectId, appId }
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  const db = getFirestore(app)
  await addDoc(col(db, collection), {
    firstName: data.firstName,
    dateAccepted: data.dateAccepted,
    mbappeAnswer: data.mbappeAnswer,
    chosenDate: data.date,
    chosenTime: data.time,
    respondedAt: data.respondedAt,
  })
}

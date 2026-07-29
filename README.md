# 💌 Invitation à un date

Mini web app romantique en React + Tailwind CSS : une enveloppe s'ouvre sur
une invitation, un bouton "Non" impossible à cliquer, une question bonus sur
Mbappé, puis un choix de créneau et une confirmation. 100% statique, prête à
déployer sur Vercel, Netlify ou GitHub Pages.

## 🚀 Démarrer en local

```bash
npm install
npm run dev
```

L'app tourne sur `http://localhost:5173`.

## 🏗️ Build de production

```bash
npm run build
npm run preview   # pour tester le build localement
```

Le résultat est généré dans `dist/`.

## 🎨 Personnaliser

- **Textes** : chaque écran est un composant dans `src/components/`
  (`Envelope.jsx`, `Letter.jsx`, `MbappeStep.jsx`, `SlotPicker.jsx`,
  `Confirmation.jsx`…). Le texte y est écrit tel quel, en français.
- **Créneaux proposés** : tableau `DAYS` en haut de `src/components/SlotPicker.jsx`.
- **Phrases du bouton "Non"** : tableau `TAUNTS` en haut de `src/components/Letter.jsx`.
- **Couleurs / typographies** : `tailwind.config.js` (palette `cream`, `blush`,
  `rose`, `gold`…) et les polices Google Fonts chargées dans `index.html`.

## 🔔 Notifications

Le fichier `config/notifications.js` centralise la configuration. Choisis un
provider et renseigne les variables d'environnement correspondantes (copie
`.env.example` en `.env`) :

| Provider   | Variable principale             | Dépendance à installer          |
|------------|----------------------------------|----------------------------------|
| Discord    | `VITE_DISCORD_WEBHOOK_URL`       | aucune                          |
| Email      | `VITE_EMAILJS_*`                 | `npm install @emailjs/browser`  |
| Supabase   | `VITE_SUPABASE_URL` / `_ANON_KEY`| `npm install @supabase/supabase-js` |
| Firebase   | `VITE_FIREBASE_*`                | `npm install firebase`          |

Aucune autre partie du code n'a besoin d'être modifiée : `src/lib/notifications.js`
lit `notificationsConfig.provider` et route l'envoi vers le bon service dès
qu'un créneau est choisi.

## 📦 Déploiement

### Vercel / Netlify
Connecte le repo GitHub, laisse la commande de build par défaut
(`npm run build`, dossier `dist`), ajoute tes variables d'environnement dans
les réglages du projet, c'est prêt.

### GitHub Pages
1. Dans `vite.config.js` ou via la variable `VITE_BASE_PATH`, mets le chemin
   de ton repo, ex. `/mon-repo/`.
2. `npm run build`
3. Déploie le contenu de `dist/` sur la branche `gh-pages` (par exemple avec
   [`gh-pages`](https://www.npmjs.com/package/gh-pages) ou une GitHub Action).

## 🗂️ Structure

```
├── config/notifications.js     # config centralisée des notifications
├── src/
│   ├── components/              # un composant par écran/étape
│   ├── lib/notifications.js     # logique d'envoi (Discord/Email/Supabase/Firebase)
│   ├── App.jsx                  # orchestration du parcours complet
│   ├── index.css
│   └── main.jsx
├── index.html
├── tailwind.config.js
└── vite.config.js
```

import { useState } from 'react'

export default function MbappeStep({ onResult, onRestart }) {
  const [answer, setAnswer] = useState(null) // null | 'yes' | 'no'

  if (answer === 'no') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-md animate-fade-up">
          <p className="font-display text-3xl text-ink sm:text-4xl">😭 Aïe…</p>
          <p className="mt-6 font-display text-xl text-ink/90 sm:text-2xl">
            Si tu penses que Mbappé ne sera pas Ballon d'Or…
          </p>
          <p className="mt-4 font-display text-xl text-ink/90 sm:text-2xl">
            Alors je suis au regret de t'annoncer que ce date ne pourra
            malheureusement pas avoir lieu. 💔
          </p>
          <p className="mt-4 font-display text-xl text-ink/90 sm:text-2xl">
            Tu peux toujours revenir quand tu auras changé d'avis. 😉⚽
          </p>

          <button
            onClick={onRestart}
            className="mt-10 rounded-full bg-gradient-to-br from-rose to-rose-deep px-10 py-3 font-body text-lg font-medium text-white shadow-soft transition-transform duration-200 hover:scale-105"
          >
            🔄 Revenir au début
          </button>
        </div>
      </div>
    )
  }

  if (answer === 'yes') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <div className="animate-fade-up">
          <p className="text-5xl">✅</p>
          <p className="mt-6 font-display text-2xl text-ink sm:text-3xl">
            Excellent choix. 😌❤️
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="max-w-md animate-fade-up">
        <p className="font-display text-2xl text-ink sm:text-3xl">
          Encore une dernière question très importante… ⚽😇
        </p>
        <p className="mt-4 font-display text-2xl text-ink sm:text-3xl">
          Selon toi… Kylian Mbappé sera-t-il Ballon d'Or ?
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button
            onClick={() => {
              setAnswer('yes')
              setTimeout(() => onResult('yes'), 1400)
            }}
            className="rounded-full bg-gradient-to-br from-rose to-rose-deep px-8 py-3 font-body text-lg font-medium text-white shadow-soft transition-transform duration-200 hover:scale-105"
          >
            ✅ Oui
          </button>
          <button
            onClick={() => setAnswer('no')}
            className="rounded-full border border-ink/15 bg-white/70 px-8 py-3 font-body text-lg font-medium text-ink/70 shadow-card transition-transform duration-200 hover:scale-105"
          >
            ❌ Non
          </button>
        </div>
      </div>
    </div>
  )
}

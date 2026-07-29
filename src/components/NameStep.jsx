import { useState } from 'react'

export default function NameStep({ onContinue }) {
  const [name, setName] = useState('')

  const canContinue = name.trim().length > 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (canContinue) onContinue(name.trim())
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm animate-fade-up">
        <p className="font-display text-2xl text-ink sm:text-3xl">
          ❤️ Avant de choisir ton créneau…
        </p>
        <p className="mt-3 font-display text-2xl text-ink sm:text-3xl">
          J'aimerais savoir comment tu t'appelles.
        </p>

        <label htmlFor="firstName" className="sr-only">
          Ton prénom
        </label>
        <input
          id="firstName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ton prénom"
          autoFocus
          className="mt-10 w-full rounded-full border border-rose/40 bg-white/80 px-6 py-3 text-center font-body text-lg text-ink shadow-card outline-none placeholder:text-ink/40 focus:border-gold"
        />

        <button
          type="submit"
          disabled={!canContinue}
          className="mt-8 w-full rounded-full bg-gradient-to-br from-rose to-rose-deep px-10 py-3 font-body text-lg font-medium text-white shadow-soft transition-all duration-200 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continuer
        </button>
      </form>
    </div>
  )
}

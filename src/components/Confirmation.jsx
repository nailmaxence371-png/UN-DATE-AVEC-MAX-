export default function Confirmation({ name }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="max-w-md animate-fade-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-gold text-2xl text-white shadow-soft">
          ✓
        </div>
        <p className="mt-8 font-display text-2xl text-ink sm:text-3xl">
          ❤️ Parfait, {name} !
        </p>
        <p className="mt-4 font-display text-xl text-ink/90 sm:text-2xl">
          Ton rendez-vous est confirmé.
        </p>
        <p className="mt-2 font-display text-xl text-ink/90 sm:text-2xl">
          J'ai bien reçu ton choix.
        </p>
        <p className="mt-2 font-display text-xl text-ink/90 sm:text-2xl">
          J'ai déjà hâte de te voir. 😊
        </p>
      </div>
    </div>
  )
}

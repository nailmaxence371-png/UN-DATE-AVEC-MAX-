import { useState } from 'react'

export default function Envelope({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)

  const handleClick = () => {
    if (opening) return
    setOpening(true)
    setTimeout(() => setShowPhoto(true), 700)
    setTimeout(() => onOpen(), 2900)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <p className="max-w-md font-display text-2xl italic text-ink/80 sm:text-3xl animate-fade-up">
        Un date avec Max, c'est comme gagner à la loterie… sauf que les
        chances sont bien meilleures 😇
      </p>

      <button
        onClick={handleClick}
        aria-label="Ouvrir l'enveloppe"
        className="group relative mt-14 h-48 w-64 cursor-pointer sm:h-56 sm:w-80"
        style={{ perspective: '1000px' }}
      >
        {/* Envelope body */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-white to-blush shadow-soft transition-transform duration-500 group-hover:-translate-y-1">
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-rose/15"
            style={{ clipPath: 'polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%)' }}
          />
          <div
            className="absolute inset-y-0 left-0 w-1/2 bg-rose/10"
            style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-rose/10"
            style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
          />
        </div>

        {/* Photo qui sort de l'enveloppe */}
        <div
          className="absolute left-1/2 top-1/2 z-20 h-28 w-24 overflow-hidden rounded-xl border-4 border-white bg-white shadow-soft transition-all duration-[1400ms] ease-out sm:h-36 sm:w-28"
          style={{
            transform: showPhoto
              ? 'translate(-50%, -160%) scale(1.5) rotate(-3deg)'
              : 'translate(-50%, -50%) scale(0.2)',
            opacity: showPhoto ? 1 : 0,
          }}
        >
          <img src="/photo.JPG" alt="Une photo de moi" className="h-full w-full object-cover" />
        </div>

        {/* Flap */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-md bg-gradient-to-b from-rose to-rose-deep shadow-md transition-transform duration-[1100ms] ease-in-out"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transform: opening ? 'rotateX(180deg)' : 'rotateX(0deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        />

        {/* Wax seal */}
        <div
          className={`absolute left-1/2 top-[38%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-gold text-cream shadow-md transition-all duration-500 ${
            opening ? 'scale-0 opacity-0' : 'group-hover:scale-105'
          }`}
        >
          <span className="font-display text-xl">M</span>
        </div>
      </button>

      <p className="mt-10 text-sm uppercase tracking-[0.3em] text-ink/50 animate-fade-up">
        Touche l'enveloppe
      </p>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

const TAUNTS = [
  'La seule réponse possible est "Oui"… 😏',
  'Tu peux essayer… mais "Non" ne fonctionne pas. ❤️',
  'Tu ne pensais quand même pas que ce serait aussi simple ? 😇',
  'Le destin a déjà choisi pour toi. ❤️',
]

export default function Letter({ onAccept }) {
  const [showQuestion, setShowQuestion] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [taunt, setTaunt] = useState('')
  const [noPos, setNoPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 })
  const zoneRef = useRef(null)
  const noRef = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setShowQuestion(true), 500)
    const t2 = setTimeout(() => setShowButtons(true), 1800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const dodge = () => {
    const zone = zoneRef.current
    const btn = noRef.current
    if (!zone || !btn) return
    const zoneRect = zone.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    const maxX = Math.max(zoneRect.width - btnRect.width, 0)
    const maxY = Math.max(zoneRect.height - btnRect.height, 0)
    const x = Math.random() * maxX
    const y = Math.random() * maxY
    const rotate = Math.random() * 30 - 15
    const scale = 0.85 + Math.random() * 0.3
    setNoPos({ x, y, rotate, scale })
    setTaunt(TAUNTS[Math.floor(Math.random() * TAUNTS.length)])
  }

  // Flee as soon as a pointer gets close, so the button is never
  // actually reachable — on desktop (hover) and mobile (touchstart).
  const handlePointerMove = (e) => {
    const btn = noRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
    if (dist < 90) dodge()
  }

  return (
    <div
      ref={zoneRef}
      onMouseMove={handlePointerMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
    >
      {showQuestion && (
        <div className="max-w-md animate-fade-up">
          <p className="font-display text-2xl text-ink sm:text-3xl">
            ❤️ J'ai une petite question pour toi…
          </p>
          <p className="mt-4 font-display text-2xl text-ink sm:text-3xl">
            Est-ce que tu accepterais de partir en date avec moi ?
          </p>
        </div>
      )}

      {showButtons && (
        <div className="relative mt-14 h-40 w-full max-w-sm">
          <button
            onClick={onAccept}
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-gradient-to-br from-rose to-rose-deep px-10 py-3 font-body text-lg font-medium text-white shadow-soft transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            ❤️ Oui
          </button>

          <button
            ref={noRef}
            onMouseEnter={dodge}
            onTouchStart={(e) => {
              e.preventDefault()
              dodge()
            }}
            onClick={dodge}
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px) rotate(${noPos.rotate}deg) scale(${noPos.scale})`,
              transition: 'transform 0.25s ease-out',
            }}
            className="absolute left-1/2 top-20 -translate-x-1/2 rounded-full border border-ink/15 bg-white/70 px-10 py-3 font-body text-lg font-medium text-ink/70 shadow-card"
          >
            ❌ Non
          </button>
        </div>
      )}

      <p className="mt-8 h-6 text-sm italic text-ink/60 animate-fade-up">{taunt}</p>
    </div>
  )
}

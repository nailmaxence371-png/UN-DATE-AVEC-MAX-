import { useEffect, useMemo, useState } from 'react'

const CONFETTI_COLORS = ['#E8B4B8', '#C9A15A', '#E4C77E', '#F6E4E4', '#C88B90']

export default function Celebration({ onDone, duration = 2600 }) {
  const [visible, setVisible] = useState(true)

  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.6}s`,
        duration: `${1.8 + Math.random() * 1.4}s`,
        rotate: Math.random() * 360,
        isHeart: Math.random() > 0.5,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 8 + Math.random() * 10,
      })),
    []
  )

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onDone()
    }, duration)
    return () => clearTimeout(t)
  }, [duration, onDone])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-cream/95 px-6 text-center">
      {visible &&
        pieces.map((p) => (
          <span
            key={p.id}
            className="absolute top-[-5%] block"
            style={{
              left: p.left,
              animation: `fall ${p.duration} ease-in forwards`,
              animationDelay: p.delay,
            }}
          >
            {p.isHeart ? (
              <span style={{ color: p.color, fontSize: p.size + 6 }}>❤</span>
            ) : (
              <span
                style={{
                  display: 'block',
                  width: p.size,
                  height: p.size * 0.4,
                  background: p.color,
                  transform: `rotate(${p.rotate}deg)`,
                  borderRadius: 2,
                }}
              />
            )}
          </span>
        ))}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0.9; }
        }
      `}</style>

      <div className="relative z-10 animate-fade-up">
        <p className="font-display text-4xl text-ink sm:text-5xl">🎉 Félicitations !</p>
        <p className="mt-4 font-display text-2xl text-ink/90 sm:text-3xl">
          Tu viens officiellement d'accepter un date.
        </p>
      </div>
    </div>
  )
}

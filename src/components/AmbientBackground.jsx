import { useMemo } from 'react'

/**
 * Soft ambient backdrop shared by every screen: a pale cream-to-blush
 * gradient, a few slow-drifting hearts, and a scattering of light
 * particles. Everything here is decorative and non-interactive
 * (pointer-events disabled) so it never gets in the way of the
 * actual experience.
 */
export default function AmbientBackground() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        left: `${8 + Math.random() * 84}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${9 + Math.random() * 6}s`,
        size: 14 + Math.random() * 16,
        opacity: 0.15 + Math.random() * 0.2,
      })),
    []
  )

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        size: 2 + Math.random() * 3,
      })),
    []
  )

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-[#FDF3F1] to-blush" />

      {/* soft radial glow */}
      <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft/10 blur-3xl" />

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold-soft/50 animate-shimmer"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}

      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 text-rose/40 animate-drift"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.duration,
            opacity: h.opacity,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  )
}

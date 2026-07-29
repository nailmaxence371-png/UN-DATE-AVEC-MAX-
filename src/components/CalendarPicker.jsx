import { useState } from 'react'

// Août et septembre 2026 — adapte l'année si tu réutilises ce projet plus tard.
const MONTHS = [
  { name: 'Août', month: 7, year: 2026, days: 31 },
  { name: 'Septembre', month: 8, year: 2026, days: 30 },
]

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function getMonthGrid(year, month, days) {
  const firstDay = new Date(year, month, 1).getDay() // 0 = dimanche
  const offset = (firstDay + 6) % 7 // recale pour commencer le lundi
  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)
  return cells
}

export default function CalendarPicker({ name, onSelect }) {
  const [activeMonth, setActiveMonth] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [time, setTime] = useState('')
  const [snap, setSnap] = useState('')
  const [insta, setInsta] = useState('')

  const current = MONTHS[activeMonth]
  const cells = getMonthGrid(current.year, current.month, current.days)
  const canConfirm = time && (snap.trim() || insta.trim())

  const handleDayClick = (day) => {
    const dateObj = new Date(current.year, current.month, day)
    const label = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    setSelectedDate({ day, month: current.month, label })
  }

  const handleConfirm = () => {
    if (!canConfirm) return
    onSelect({
      date: selectedDate.label,
      time,
      snapchat: snap.trim(),
      instagram: insta.trim(),
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-full max-w-md animate-fade-up">
        <p className="font-display text-2xl text-ink sm:text-3xl">
          ❤️ Avec plaisir, {name} !
        </p>
        <p className="mt-3 font-display text-2xl text-ink sm:text-3xl">
          Choisis la date et l'heure qui te conviennent.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          {MONTHS.map((m, i) => (
            <button
              key={m.name}
              onClick={() => {
                setActiveMonth(i)
                setSelectedDate(null)
                setTime('')
              }}
              className={`rounded-full px-5 py-2 font-body text-sm transition-all ${
                activeMonth === i
                  ? 'bg-gradient-to-br from-rose to-rose-deep text-white shadow-soft'
                  : 'bg-white/60 text-ink/60'
              }`}
            >
              {m.name} {m.year}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-white/60 bg-white/50 p-5 shadow-card backdrop-blur-md">
          <div className="grid grid-cols-7 gap-1 text-xs text-ink/50">
            {WEEKDAYS.map((w, i) => (
              <div key={i}>{w}</div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />
              const isSelected = selectedDate && selectedDate.day === day
              return (
                <button
                  key={i}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-xl font-body text-sm transition-all duration-150 ${
                    isSelected
                      ? 'bg-gradient-to-br from-gold-soft to-gold text-white shadow-soft'
                      : 'text-ink/80 hover:bg-blush'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="mt-6 animate-fade-up">
            <p className="font-display text-lg capitalize text-ink">{selectedDate.label}</p>

            <label htmlFor="time" className="sr-only">
              Choisis une heure
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-4 w-full rounded-full border border-rose/40 bg-white/80 px-6 py-3 text-center font-body text-lg text-ink shadow-card outline-none focus:border-gold"
            />

            <p className="mt-6 text-sm text-ink/60">
              Pour te contacter avant le date, laisse-moi ton Snap ou ton Insta
              (au moins un des deux).
            </p>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="snap" className="sr-only">
                  Ton Snapchat
                </label>
                <input
                  id="snap"
                  type="text"
                  value={snap}
                  onChange={(e) => setSnap(e.target.value)}
                  placeholder="👻 Ton Snap"
                  className="w-full rounded-full border border-rose/40 bg-white/80 px-6 py-3 text-center font-body text-ink shadow-card outline-none placeholder:text-ink/40 focus:border-gold"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="insta" className="sr-only">
                  Ton Instagram
                </label>
                <input
                  id="insta"
                  type="text"
                  value={insta}
                  onChange={(e) => setInsta(e.target.value)}
                  placeholder="📸 Ton Insta"
                  className="w-full rounded-full border border-rose/40 bg-white/80 px-6 py-3 text-center font-body text-ink shadow-card outline-none placeholder:text-ink/40 focus:border-gold"
                />
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              className="mt-6 w-full rounded-full bg-gradient-to-br from-rose to-rose-deep px-10 py-3 font-body text-lg font-medium text-white shadow-soft transition-all duration-200 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirmer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

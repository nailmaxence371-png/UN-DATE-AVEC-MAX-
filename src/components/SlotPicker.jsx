const DAYS = [
  {
    id: 'friday',
    label: '📅 Vendredi 8 août',
    slots: ['18h00 – 20h00', '20h00 – 22h00'],
  },
  {
    id: 'saturday',
    label: '📅 Samedi 9 août',
    slots: ['18h00 – 20h00', '20h00 – 22h00'],
  },
]

export default function SlotPicker({ name, onSelect }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-full max-w-2xl animate-fade-up">
        <p className="font-display text-2xl text-ink sm:text-3xl">
          ❤️ Avec plaisir, {name} !
        </p>
        <p className="mt-3 font-display text-2xl text-ink sm:text-3xl">
          Maintenant, choisis le moment qui te convient le mieux.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {DAYS.map((day) => (
            <div
              key={day.id}
              className="rounded-3xl border border-white/60 bg-white/50 p-6 shadow-card backdrop-blur-md"
            >
              <p className="font-display text-xl text-ink">{day.label}</p>
              <div className="mt-5 flex flex-col gap-3">
                {day.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => onSelect({ day: day.label, slot })}
                    className="group rounded-2xl border border-rose/30 bg-white/70 px-5 py-3 font-body text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-blush hover:shadow-soft active:scale-95"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

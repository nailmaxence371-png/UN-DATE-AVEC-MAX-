import { useState } from 'react'
import AmbientBackground from './components/AmbientBackground.jsx'
import Envelope from './components/Envelope.jsx'
import Letter from './components/Letter.jsx'
import Celebration from './components/Celebration.jsx'
import NameStep from './components/NameStep.jsx'
import MbappeStep from './components/MbappeStep.jsx'
import CalendarPicker from './components/CalendarPicker.jsx'
import Confirmation from './components/Confirmation.jsx'
import { sendNotification } from './lib/notifications.js'

const STEPS = {
  ENVELOPE: 'envelope',
  LETTER: 'letter',
  CELEBRATION: 'celebration',
  NAME: 'name',
  MBAPPE: 'mbappe',
  SLOTS: 'slots',
  CONFIRMATION: 'confirmation',
}

export default function App() {
  const [step, setStep] = useState(STEPS.ENVELOPE)
  const [firstName, setFirstName] = useState('')
  const [selected, setSelected] = useState(null)

  const restart = () => {
    setStep(STEPS.ENVELOPE)
    setFirstName('')
    setSelected(null)
  }

  const handleDateTimeSelect = async ({ date, time }) => {
    setSelected({ date, time })
    setStep(STEPS.CONFIRMATION)
    sendNotification({
      firstName,
      dateAccepted: 'Oui',
      mbappeAnswer: 'Oui',
      date,
      time,
    })
  }

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />

      {step === STEPS.ENVELOPE && <Envelope onOpen={() => setStep(STEPS.LETTER)} />}

      {step === STEPS.LETTER && <Letter onAccept={() => setStep(STEPS.CELEBRATION)} />}

      {step === STEPS.CELEBRATION && <Celebration onDone={() => setStep(STEPS.NAME)} />}

      {step === STEPS.NAME && (
        <NameStep
          onContinue={(name) => {
            setFirstName(name)
            setStep(STEPS.MBAPPE)
          }}
        />
      )}

      {step === STEPS.MBAPPE && (
        <MbappeStep
          onResult={() => setStep(STEPS.SLOTS)}
          onRestart={restart}
        />
      )}

      {step === STEPS.SLOTS && (
        <CalendarPicker name={firstName} onSelect={handleDateTimeSelect} />
      )}

      {step === STEPS.CONFIRMATION && selected && <Confirmation name={firstName} />}
    </div>
  )
}

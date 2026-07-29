import { useState } from 'react'
import AmbientBackground from './components/AmbientBackground.jsx'
import Envelope from './components/Envelope.jsx'
import Letter from './components/Letter.jsx'
import Celebration from './components/Celebration.jsx'
import NameStep from './components/NameStep.jsx'
import MbappeStep from './components/MbappeStep.jsx'
import SlotPicker from './components/SlotPicker.jsx'
import Confirmation from './components/Confirmation.jsx'
import { sendNotification } from './lib/notifications.js'

// Étapes de l'expérience, dans l'ordre.
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
  const [mbappeAnswer, setMbappeAnswer] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null)

  const restart = () => {
    setStep(STEPS.ENVELOPE)
    setFirstName('')
    setMbappeAnswer('')
    setSelectedSlot(null)
  }

  const handleSlotSelect = async ({ day, slot }) => {
    setSelectedSlot({ day, slot })
    setStep(STEPS.CONFIRMATION)
    // La notification part en arrière-plan : elle ne doit jamais
    // retarder ni bloquer l'affichage de la confirmation.
    sendNotification({
      firstName,
      dateAccepted: 'Oui',
      mbappeAnswer: 'Oui',
      day,
      slot,
    })
  }

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />

      {step === STEPS.ENVELOPE && <Envelope onOpen={() => setStep(STEPS.LETTER)} />}

      {step === STEPS.LETTER && (
        <Letter onAccept={() => setStep(STEPS.CELEBRATION)} />
      )}

      {step === STEPS.CELEBRATION && (
        <Celebration onDone={() => setStep(STEPS.NAME)} />
      )}

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
          onResult={(answer) => {
            setMbappeAnswer(answer)
            setStep(STEPS.SLOTS)
          }}
          onRestart={restart}
        />
      )}

      {step === STEPS.SLOTS && (
        <SlotPicker name={firstName} onSelect={handleSlotSelect} />
      )}

      {step === STEPS.CONFIRMATION && selectedSlot && (
        <Confirmation name={firstName} />
      )}
    </div>
  )
}

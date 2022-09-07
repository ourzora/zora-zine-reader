import { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { useSpeechSynth, SpeechSynthReturn } from './useSpeechSynth'

export type SpeechSynthProps = {
  text?: string
  children?: ReactNode
}

const SpeechSynthContext = createContext<SpeechSynthReturn>({
  speech: undefined,
  text: undefined,
  startSpeach: () => {},
  stopSpeach: () => {},
  pauseSpeach: () => {},
  resumeSpeach: () => {},
})

export function useSpeechSynthProvider() {
  return useContext(SpeechSynthContext)
}

export function SpeechSynthProvider({ text, children }: SpeechSynthProps) {
  const {
    speech,
    text: textToSpeak,
    startSpeach,
    stopSpeach,
    pauseSpeach,
    resumeSpeach,
  } = useSpeechSynth(text)

  return (
    <SpeechSynthContext.Provider
      value={{
        speech,
        text: textToSpeak,
        startSpeach,
        stopSpeach,
        pauseSpeach,
        resumeSpeach,
      }}
    >
      {children}
    </SpeechSynthContext.Provider>
  )
}

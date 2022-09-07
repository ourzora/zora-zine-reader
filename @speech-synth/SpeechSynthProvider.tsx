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
  supported: false,
  startSpeach: () => {},
  stopSpeach: () => {},
  pauseSpeach: () => {},
  resumeSpeach: () => {},
  selectVoice: (e: any) => {console.log(e)}
})

export function useSpeechSynthProvider() {
  return useContext(SpeechSynthContext)
}

export function SpeechSynthProvider({ text, children }: SpeechSynthProps) {
  const {
    supported,
    speech,
    text: textToSpeak,
    startSpeach,
    stopSpeach,
    pauseSpeach,
    resumeSpeach,
    selectVoice,
  } = useSpeechSynth(text)

  return (
    <SpeechSynthContext.Provider
      value={{
        supported,
        speech,
        text: textToSpeak,
        startSpeach,
        stopSpeach,
        pauseSpeach,
        resumeSpeach,
        selectVoice,
      }}
    >
      {children}
    </SpeechSynthContext.Provider>
  )
}

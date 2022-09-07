import { SpeechSynthProvider } from "@speech-synth/SpeechSynthProvider"
import { SpeechSynthUI } from "./SpeechSynthUI"

export function SpeechSynth({text}: {text?: string}) {
  return (
    <SpeechSynthProvider text={text}>
      <SpeechSynthUI />
    </SpeechSynthProvider>
  )
}
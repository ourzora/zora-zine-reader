import { useSpeachSynth } from "hooks/useSpeachSynth"
import { useEffect } from "react"

export function TestReader({text = 'Hollo WURLd'}: {text?: string}) {
  const { speech, text: textToSpeak, startSpeach } = useSpeachSynth(text)

  useEffect(() => {
    console.log(speech, textToSpeak)
  }, [text])

  return (
    <button onClick={startSpeach}>Test Player</button>
  )
}
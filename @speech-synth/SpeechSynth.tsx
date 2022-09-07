import { useSpeechSynth } from "./useSpeechSynth"
import { useEffect } from "react"

export function SpeechSynth({text = 'Hollo WURLd'}: {text?: string}) {
  const {
    speech,
    text: textToSpeak,
    startSpeach,
    stopSpeach,
    pauseSpeach,
    selectVoice
  } = useSpeechSynth(text)

  useEffect(() => {
    console.log(speech, textToSpeak)
  }, [text])

  return (
    <div className="flex gap-x-2.5 justify-between">
      <div className="flex gap-x-2.5">
        <button className="bg-stone-200 px-6 py-2 rounded-full" onClick={startSpeach}>Play</button>
        <button className="bg-stone-200 px-6 py-2 rounded-full" onClick={pauseSpeach}>Pause</button>
        <button className="bg-stone-200 px-6 py-2 rounded-full" onClick={stopSpeach}>Clear</button>
      </div>
      {speech?.voices &&
        <select className="block w-full mt-1" onChange={selectVoice}>
          {speech?.voices.map((item) => <option key={item.voiceURI}>{item.name}</option>)}
        </select>
      }
    </div>
  )
}

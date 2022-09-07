import { useSpeechSynthProvider } from "@speech-synth/SpeechSynthProvider"
import { SpeechSynthButton } from "./SpeechSynthButton"

export function SpeechSynthUI() {
  const {
    speech,
    startSpeach,
    stopSpeach,
    pauseSpeach,
    selectVoice
  } = useSpeechSynthProvider()

  return (
    <div className="flex flex-row gap-x-2.5 justify-between">
      <div className="flex flex-row gap-x-2.5">
        <SpeechSynthButton handler={startSpeach}>Play</SpeechSynthButton>
        <SpeechSynthButton handler={pauseSpeach}>Pause</SpeechSynthButton>
        <SpeechSynthButton handler={stopSpeach}>Clear</SpeechSynthButton>
      </div>
      {speech?.voices &&
        <select className="block w-full mt-1" onChange={selectVoice}>
          {speech?.voices.map((item, index) =>
            <option value={index} key={item.voiceURI}>{item.name}</option>
          )}
        </select>
      }
    </div>
  )
}

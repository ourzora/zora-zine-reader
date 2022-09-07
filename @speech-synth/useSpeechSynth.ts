/*
ᯣ Params ᮡ
Descriptionꪵ 
Inputꪵ 
Outputꪵ 
*/

import { useCallback, useEffect, useMemo, useState } from "react"

export type SpeechSynthReturn = {
  startSpeach: () => void,
  stopSpeach: () => void
  pauseSpeach: () => void
  resumeSpeach: () => void
  selectVoice: (e: any) => void
  speech: {
    synth: SpeechSynthesis
    voices: SpeechSynthesisVoice[]
  } | undefined
  text: any
}

export function useSpeechSynth(text?: any) {
  const [utterance, setUtterance] = useState<any>()

  const speech = useMemo(() => {
    if (typeof window != "undefined") {
      return {
        synth: window.speechSynthesis,
        voices: window.speechSynthesis.getVoices()
      }
    }
  }, [])

  useEffect(() => {
    if(speech) {
      try {
        const ut = new SpeechSynthesisUtterance(text)
        ut.voice = speech?.voices[10]
        ut.text = text.replace(/\n/g, '')
        ut.lang = 'en-US'
        ut.pitch = 0.8
        ut.rate = .75
        ut.volume = 1
        setUtterance(ut)
      } catch (err) {
        console.error(err)
      }
    }
  }, [speech, text])

  const startSpeach = useCallback(() => {
    speech?.synth.cancel()
    speech?.synth.speak(utterance)
  }, [utterance, speech])

  const stopSpeach = useCallback(() => {
    speech?.synth.cancel()
  }, [utterance, speech])

  const pauseSpeach = useCallback(() => {
    speech?.synth.pause()
  }, [utterance, speech])

  const resumeSpeach = useCallback(() => {
    speech?.synth.resume()
  }, [utterance, speech])

  const selectVoice = useCallback((e: any) => {
    console.log(e)
  }, [])

  return {
    startSpeach,
    stopSpeach,
    pauseSpeach,
    resumeSpeach,
    selectVoice,
    speech,
    text
  }
}
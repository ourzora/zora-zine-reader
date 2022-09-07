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
  supported: boolean
  speech: {
    synth: SpeechSynthesis | undefined
    voices: SpeechSynthesisVoice[] | undefined
  } | undefined
  text: any
}

export function useSpeechSynth(text?: any) {
  const [utterance, setUtterance] = useState<any>()
  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | undefined>()
  const [voiceIndex, setVoiceIndex] = useState(0)
  const [supported, setSupported] = useState(false)

  const synth = useMemo(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      return window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && synth) {
      setSupported(true);
      const getVoices = synth.getVoices()
      setVoices(getVoices)
    }
  }, [synth]);

  useEffect(() => {
    if(synth && voices) {
      try {
        const ut = new SpeechSynthesisUtterance(text)
        ut.voice = voices[voiceIndex]
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
  }, [synth, voices, text, voiceIndex])

  const startSpeach = useCallback(() => {
    synth?.cancel()
    synth?.speak(utterance)
  }, [utterance, synth])

  const stopSpeach = useCallback(() => {
    synth?.cancel()
  }, [utterance, synth])

  const pauseSpeach = useCallback(() => {
    synth?.pause()
  }, [utterance, synth])

  const resumeSpeach = useCallback(() => {
    synth?.resume()
  }, [utterance, synth])

  const selectVoice = useCallback((e: any) => {
    setVoiceIndex(parseInt(e?.target?.value))
  }, [])

  return {
    startSpeach,
    stopSpeach,
    pauseSpeach,
    resumeSpeach,
    selectVoice,
    speech: {
      synth: synth,
      voices: voices,
    },
    supported,
    text
  }
}

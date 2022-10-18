import React from "react";
import { fetchUDSpeakEndpoint } from 'lib/uberduck';
import { wait } from "lib/wait";

export function useUberDuck(speech?: string) {
  const [voices, setVoices] = React.useState<any | undefined>(undefined)
  const [asset, setAsset] = React.useState<any | undefined>(undefined)
  const [assetLoading, setAssetLoading] = React.useState(false)
  const [assetErrored, setAssetErrored] = React.useState(false)
  const [speakUUID, setSpeakUUID] = React.useState<any | undefined>(undefined)
  const [speakUUIDLoading, setSpeakUUIDLoading] = React.useState(false)
  const [voiceUUID, setVoiceUUID] = React.useState<any | undefined>(undefined)

  const selectVoiceUUID = React.useCallback((event: any) => {
    const voiceData = JSON.parse(event?.target?.value)
    setVoiceUUID(voiceData)
  }, [voiceUUID, setVoiceUUID])

  const getSpeakUUID = React.useCallback(() => {
    if (!voiceUUID) {
      alert('PICK A VOICE')
    } else if (!speech) {
      alert('Generate Speech')
    } else {
      setSpeakUUIDLoading(true)
      setSpeakUUID(undefined)
      async function fetchSpeakUUID() {
        const uuid = await fetchUDSpeakEndpoint(speech).then(res => res)
        setSpeakUUID(uuid)
        setSpeakUUIDLoading(false)
      }
      fetchSpeakUUID()
    }
  }, [voiceUUID])

  const getAsset = React.useCallback(() => {
    async function fetchAsset() {
      setAssetLoading(true)
      const options = { method: 'GET', headers: { accept: 'application/json' } };
      
      async function checkStatus(result: any) {
        await wait(1000);
        console.log(result)
        if (result?.path === null && result?.failed_at === null) {
          getSpeakStatus()
        } else {
          if(result?.failed_at === null) {
            setAsset(result?.path)
            setAssetLoading(false)
          } else {
            setAssetErrored(true)
            setAssetLoading(false)
            setAsset(undefined)
          }
        }
      }
  
      async function getSpeakStatus() {
        await fetch(`https://api.uberduck.ai/speak-status?uuid=${speakUUID}`, options)
          .then(response => response.json())
          .then(response => {
            checkStatus(response)
          })
          .catch(err => console.error(err));
      }
      getSpeakStatus()
    }

    fetchAsset()
  }, [asset, setAsset, speakUUID])

  const resetHandler = React.useCallback(() => {
    setAsset(undefined)
    setVoiceUUID(undefined)
    setSpeakUUID(undefined)
    setAssetLoading(false)
    setAssetErrored(false)
  }, [setAsset, setSpeakUUID,  setVoiceUUID, setAssetLoading])

  const getVoices = React.useCallback(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Basic ${process.env.NEXT_PUBLIC_UBERDUCK_AUTH}`
      }
    };
    async function fetchVoices() {
      const voiceList = await fetch('https://api.uberduck.ai/voices?mode=tts-all&language=english', options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
      if (voiceList) setVoices(voiceList)
    }
    fetchVoices()
  }, [voices, setVoices])

  return {
    getSpeakUUID,
    speakUUID,
    speakUUIDLoading,
    getAsset,
    asset,
    assetLoading,
    assetErrored,
    getVoices,
    voices,
    voiceUUID,
    selectVoiceUUID,
    resetHandler
  }
}

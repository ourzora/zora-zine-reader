import React from "react";

export function useUberDuck(speech?: string, voiceUUID?: string) {
  const [asset, setAsset] = React.useState<any | undefined>(undefined)
  const [uuid, setUUID] = React.useState<any | undefined>(undefined)
  const [voices, setVoices] = React.useState<any | undefined>(undefined)

  const getUUID = React.useCallback(() => {
    if (!voiceUUID) {
      alert('PICK A VOICE')
    } else {
      console.log(voiceUUID)
      async function readSpeach() {
        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'uberduck-id': 'anonymous',
            'content-type': 'application/json',
            authorization: `Basic ${process.env.NEXT_PUBLIC_UBERDUCK_AUTH}`
          },
          body: JSON.stringify({
            voicemodel_uuid: voiceUUID,
            pace: 1,
            speech: speech
          })
        };

        const reader = await fetch('https://api.uberduck.ai/speak', options)
          .then(response => response.json())
          .then(response => response)
          .catch(err => console.error(err));
        
        if (reader?.uuid) {
          setUUID(reader?.uuid)
        } else {
          console.log('cant get uuid')
        }
      }
      readSpeach()
    }
  }, [speech, voiceUUID])
  
  const getAsset = React.useCallback((uuid?: string) => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    async function fetchAsset() {
      const readerAsset = await fetch(`https://api.uberduck.ai/speak-status?uuid=${uuid}`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

      setAsset(readerAsset)
    }
    fetchAsset()
  }, [])

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
    getUUID,
    uuid: uuid,
    getAsset,
    asset: asset,
    getVoices,
    voices
  }
}

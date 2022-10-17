import React from "react";

export function useUberDuck({speech}: {speech?: string}) {
  const [asset, setAsset] = React.useState<any | undefined>(undefined)
  const [uuid, setUUID] = React.useState<any | undefined>(undefined)
  
  const getUUID = React.useCallback(() => {
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
          voice: 'lj',
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
  }, [speech])
  
  const getAsset = React.useCallback((uuid?: string) => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    
    console.log(uuid)
    async function fetchAsset() {
      const readerAsset = await fetch(`https://api.uberduck.ai/speak-status?uuid=${uuid}`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

      setAsset(readerAsset)
    }
    fetchAsset()
  }, [])

  return {
    getUUID,
    uuid: uuid,
    getAsset,
    asset: asset,
  }
}

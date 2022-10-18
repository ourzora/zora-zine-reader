import { wait } from "./wait";

export async function fetchUDSpeakStatusEndpoint(speakUUID?: string) {
  async function getAsset() {
    let speakStatus = undefined as any
    
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    
    async function checkStatus(result: any) {
      await wait(1000);
      if(result?.path === null && result?.failed_at === null) getSpeakStatus()
    }

    async function getSpeakStatus() {
      await fetch(`https://api.uberduck.ai/speak-status?uuid=${speakUUID}`, options)
        .then(response => response.json())
        .then(response => {
          checkStatus(response)
          speakStatus = response
        })
        .catch(err => console.error(err));
    }
    getSpeakStatus()
    return speakStatus && speakStatus?.path
  }
  const data = getAsset().then(res => {console.log(res)})
  return data
}

export async function fetchUDSpeakEndpoint(copy?: string, voiceUUID?: string) {
  if(copy) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'uberduck-id': 'anonymous',
        'content-type': 'application/json',
        authorization: `Basic ${process.env.NEXT_PUBLIC_UBERDUCK_AUTH}`
      },
      body: JSON.stringify({
        voicemodel_uuid: voiceUUID || 'abac4ec9-8e69-4dae-a46d-f57712588060',
        pace: 1,
        speech: copy
      })
    };

    const reader = await fetch('https://api.uberduck.ai/speak', options)
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));
    
    if (reader?.uuid) {
      return reader?.uuid
    }
  } else {
    console.log('get copy')
  }
}

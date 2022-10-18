export async function fetchUberduckAsset(uuid?: string) {
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  const readerAsset = await fetch(`https://api.uberduck.ai/speak-status?uuid=${uuid}`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
  return readerAsset
}

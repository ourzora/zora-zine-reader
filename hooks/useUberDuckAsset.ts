import React from 'react'
import { useInterval } from './useInterval';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function useUberDuckAsset(uuid?: string) {
  const [data, setData] = React.useState<any | undefined>(undefined)
  const [assetLoaded, setAssetLoaded] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  
  const fetchAsset = React.useCallback(() => {
    if(uuid) {
      setLoading(true)
      async function getAsset() {
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        
        const readerAsset = await fetch(`https://api.uberduck.ai/speak-status?uuid=${uuid}`, options)
          .then(response => response.json())
          .then(response => response)
          .catch(err => console.error(err));
        console.log(readerAsset)
        setData(readerAsset?.path)
      }
      getAsset()
    }
  }, [uuid, setData])
  
  useInterval(() => {
    console.log(data)
    // fetchAsset()
  }, 1000)
  
  return {
    data: data,
    loading: loading,
  }
}
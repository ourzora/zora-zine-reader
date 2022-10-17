// import useSWR from "swr"
import React from "react"
import { useUberDuck } from "hooks/useUberDuck"
import { RawDisplayer } from "./RawDisplayer"

function Reader({speech, voice}: {speech: string, voice?: any}) {
  const { 
    getUUID,
    uuid: uuid,
    getAsset,
    asset: asset,
  } = useUberDuck(speech, voice?.voicemodel_uuid)
  
  console.log(voice)

  return (
    <div className="flex flex-col gap-4">
      <div className="p-2 border-[1px] rounded-xl flex flex-col gap-2">
        <h2>Copy</h2>
        <RawDisplayer data={speech} />
      </div>
      <div className="p-2 border-[1px] rounded-xl flex flex-col gap-2">
        <button
          className="rounded-full bg-slate-200 m-auto px-4 py-2"
          onClick={getUUID}
        >Get UUID | voice: {voice?.display_name}</button>
        <RawDisplayer data={{ uuid }} />
      </div>
      {uuid &&
        <div className="p-2 border-[1px] rounded-xl flex flex-col gap-2">
          <button
            className="rounded-full bg-slate-200 m-auto px-4 py-2"
            onClick={() => getAsset(uuid)}
          >Get Asset</button>
          <RawDisplayer data={{ asset }} />
          {asset?.path && <audio src={asset?.path} controls />}
        </div>
      }
    </div>
  )
}

export function AiReader({
  slug
}: {
  slug?: string
}) {
  const [copy, setCopy] = React.useState<string | undefined>(undefined)
  const [voiceUUID, setVoiceUUID] = React.useState<string | undefined>(undefined)
  
  const { voices, getVoices } = useUberDuck()

  const getArticle = React.useCallback(() => {
    async function fetchArticle() {
      const data = await fetch(`/api/blog/${slug}`)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
      if (data?.content) setCopy(data?.content)
    }
    fetchArticle()
  }, [copy, setCopy, slug])

  const handleSelect = React.useCallback((event: any) => {
    
    const voiceData = JSON.parse(event?.target?.value)
    console.log(voiceData)
    setVoiceUUID(voiceData)
  }, [voiceUUID, setVoiceUUID])

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 p-2 border-[1px] rounded-xl flex flex-col gap-2">
        <button
          className="rounded-full bg-slate-200 m-auto px-4 py-2"
          onClick={getArticle}
        >Get Article</button>
        {copy && voiceUUID && <Reader speech={copy} voice={voiceUUID} />}
      </div>
      <div className="col-span-1 p-2 border-[1px] rounded-xl flex flex-col gap-2">
        {voices
          ? <div>
              <span>Select a voice:</span>
              <select className="block w-full mt-1" onChange={handleSelect}>
                {voices.map((item: any) => <option value={JSON.stringify(item)} key={item.voicemodel_uuid}>{item.display_name}</option>)}
              </select>
            </div>
          : <button
              className="rounded-full bg-slate-200 m-auto px-4 py-2"
              onClick={getVoices}
            >Get Voices</button>
        }
      </div>
    </div>
  )
}
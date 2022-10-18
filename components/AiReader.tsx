// import useSWR from "swr"
import React from "react"
import { useUberDuck } from "hooks/useUberDuck"
import { useUberDuckAsset } from "hooks/useUberDuckAsset"
import { RawDisplayer } from "./RawDisplayer"

function Reader({speech, voice}: {speech: string, voice?: any}) {
  const { 
    getUUID,
    uuid: uuid,
  } = useUberDuck(speech, voice?.voicemodel_uuid)

  const { data } = useUberDuckAsset(uuid)

  return (
    <div className="flex flex-col gap-4">
      <div className="p-2 border-[1px] rounded-xl flex flex-col gap-2">
        <h2>Copy</h2>
        <RawDisplayer data={speech} />
      </div>
      <div className="p-2 border-[1px] rounded-xl grid grid-cols-12">
        <button
          className="rounded-full bg-slate-200 m-auto px-4 py-2 col-span-3"
          onClick={getUUID}
        >Get UUID | voice: {voice?.display_name}</button>
        {data && <div className="col-span-3 items-center flex"><audio src={data} controls /></div>}
        <div className="col-span-6">{data ? data : 'loading'}</div>
      </div>
    </div>
  )
}

export function AiReader({
  slug,
  voices
}: {
  slug?: string
  voices?: any
}) {
  const [copy, setCopy] = React.useState<string | undefined>(undefined)
  const [voiceUUID, setVoiceUUID] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    async function fetchArticle() {
      const data = await fetch(`/api/blog/${slug}`)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
      setCopy(data?.content)
    }
    fetchArticle()
  }, [slug])

  const handleSelect = React.useCallback((event: any) => {
    const voiceData = JSON.parse(event?.target?.value)
    setVoiceUUID(voiceData)
  }, [voiceUUID, setVoiceUUID])

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 p-2 border-[1px] rounded-xl flex flex-col gap-2">
        {copy && <Reader speech={copy} voice={voiceUUID} />}
      </div>
      <div className="col-span-1 p-2 border-[1px] rounded-xl flex flex-col gap-2">
        {voices
          ? <div>
              <span>Select a voice:</span>
              <select className="block w-full mt-1" onChange={handleSelect}>
                {voices.map((item: any) => <option value={JSON.stringify(item)} key={item.voicemodel_uuid}>{item.display_name}</option>)}
              </select>
            </div>
          : <div>Loading Voices...</div>
        }
      </div>
    </div>
  )
}
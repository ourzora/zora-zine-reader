import React from "react"
import { useUberDuck } from "hooks/useUberDuck"
import { RawDisplayer } from "./RawDisplayer"

export function SpeakGenerator({speech, voices}: {speech: string, voices?: any[]}) {
  const { 
    getSpeakUUID,
    speakUUID,
    getAsset,
    asset,
    assetLoading,
    voiceUUID,
    speakUUIDLoading,
    selectVoiceUUID,
    resetHandler
  } = useUberDuck(speech)

  return (
    <div className="flex flex-col gap-4">
      <h2>Copy</h2>
      <RawDisplayer data={speech} />
      {voices &&
        <select className="block w-full mt-1" onChange={selectVoiceUUID}>
          {!voiceUUID && <option>Select a voice</option>}  
          {voices.map((item: any) => <option value={JSON.stringify(item)} key={item.voicemodel_uuid}>{item.display_name}</option>)}
        </select>
      }
      {voiceUUID &&
        <div className="p-2 border-[1px] rounded-xl flex flex-row justi">
          {asset
            ? <div className="w-full flex flex-row justify-between">
                <audio src={asset} controls />
                 <button
                  className="rounded-full bg-slate-200 m-auto px-4 py-2 col-span-3"
                  onClick={resetHandler}
                >Reset</button>
              </div>
            : <>
              {!speakUUID
                ? <button
                    className="rounded-full bg-slate-200 m-auto px-4 py-2 col-span-3"
                    onClick={getSpeakUUID}
                  >{!speakUUIDLoading ? `Get UUID | voice: ${voiceUUID?.display_name}` : 'Loading'}</button>
                : <button
                    className="rounded-full bg-slate-200 m-auto px-4 py-2 col-span-3"
                    onClick={getAsset}
                    disabled={assetLoading}
                  >{!assetLoading ? `Get Asset | ${speakUUID}` : 'Loading'}</button>
              }
            </>
          }
        </div>
      }
    </div>
  )
}

import useSWR from "swr"
import React from "react"
import { useUberDuck } from "hooks/useUberDuck"
import { RawDisplayer } from "./RawDisplayer"

function Reader({speech}: {speech: string}) {
  const { 
    getUUID,
    uuid: uuid,
    getAsset,
    asset: asset,
  } = useUberDuck({ speech: speech })
  
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
        >Get UUID</button>
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
  // const { data, isValidating } = useSWR(`/api/blog/${slug}`)
  // if (isValidating) return <div>Loading...</div>
  const [copy, setCopy] = React.useState<string | undefined>(undefined)
  
  const getArticle = React.useCallback(() => {
    async function fetchArticle() {
      const data = await fetch(`/api/blog/${slug}`)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
      console.log(data?.content)
      if (data?.content) setCopy(data?.content)
    }
    fetchArticle()
  }, [copy, setCopy, slug])

  return (
    <div className="p-2 border-[1px] rounded-xl flex flex-col gap-2">
      <button
        className="rounded-full bg-slate-200 m-auto px-4 py-2"
        onClick={getArticle}
      >Get Article</button>
      {copy && <Reader speech={copy} />}
    </div>
  )
}

/*
{
  "failed_at": null,
  "finished_at": "2022-10-17T19:27:56.065270",
  "meta": null,
  "path": "https://uberduck-audio-outputs.s3-us-west-2.amazonaws.com/9c014056-c98e-423c-9953-c827359e2c6a/audio.wav",
  "started_at": "2022-10-17T19:27:43.142458"
}
*/
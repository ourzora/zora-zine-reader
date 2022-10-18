// import useSWR from "swr"
import React from "react"
import { useUberDuck } from "hooks/useUberDuck"
import { SpeakGenerator } from "./SpeakGenerator"

export function UberDuckReader({
  slug
}: {
  slug?: string
}) {
  const [copy, setCopy] = React.useState<string | undefined>(undefined)

  const {
    getVoices,
    voices,
  } = useUberDuck()

  React.useEffect(() => {
    getVoices()
  }, [])

  React.useEffect(() => {
    setCopy(undefined)
    async function fetchArticle() {
      fetch(`/api/blog/${slug}`)
        .then(response => response.json())
        .then(response => {
          setCopy(response?.content)
        })
        .catch(err => console.error(err));
    }
    fetchArticle()
  }, [slug])

  return (
    <div className="m-auto w-full max-w-[1200px] p-4">
      <div className="border-[1px] rounded-xl flex flex-col gap-2 p-4">
        {copy && voices && <SpeakGenerator speech={copy} voices={voices} />}
      </div>
    </div>
  )
}
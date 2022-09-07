import { useEffect } from 'react'
import useSWR from 'swr'
import Marquee from "react-fast-marquee"
import { SpeechSynth } from '@speech-synth'

export function Reader({
  slug
}: {
  slug?: string
}) {
  const { data } = useSWR(`/api/blog/${slug}`)
  
  useEffect(() => {
    console.log(slug, data)
  }, [data])

  return (
    <div className="w-full">
      <Marquee
        speed={5}
        gradientWidth={50}
      >
        <code>
          <pre>{JSON.stringify(data?.content, null, 2)}</pre>
        </code>
      </Marquee>
      <hr className="my-4" />
      <SpeechSynth text={data?.content} />
    </div>
  )
}
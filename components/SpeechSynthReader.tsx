import useSWR from 'swr'
import Marquee from "react-fast-marquee"
import { SpeechSynth } from '@derpyvision/react-speech-synth'

export function SpeechSynthReader({
  slug
}: {
  slug?: string
}) {
  const { data } = useSWR(`/api/blog/${slug}`)
  return (
    <div className="w-full flex flex-col">
      <Marquee
        speed={5}
        gradientWidth={50}
      >
        <code>
          <pre>{JSON.stringify(data?.content, null, 2)}</pre>
        </code>
      </Marquee>
      <div>
        <hr className="my-4" />
        <SpeechSynth text={data?.content} />
      </div>
    </div>
  )
}
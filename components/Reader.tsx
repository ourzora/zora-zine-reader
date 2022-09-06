import { useEffect } from 'react'
import useSWR from 'swr'

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
    <div>
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </div>
  )
}
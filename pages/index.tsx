import React, { useMemo, useState, useCallback, useEffect } from 'react'
import {
  featuredQuery,
  getClient,
  overlayDrafts,
  popularQuery,
  recentQuery,
  SanityPostPreviewProps,
} from '../lib/sanity'
import { Reader } from 'components/Reader'

const BlogPage: React.FC<{
  recentPosts: SanityPostPreviewProps[]
  featuredPosts: SanityPostPreviewProps[]
  popularPosts: SanityPostPreviewProps[]
}> = ({ recentPosts, featuredPosts, popularPosts }) => {
  const [slug, setSlug] = useState<string | undefined>(undefined)
  
  const posts = useMemo(() => {
    const postsArray = [...recentPosts, ...featuredPosts, ...popularPosts]
    return [...new Map(postsArray.map((m) => [m._id, m])).values()]
  }, [])

  const handleSelect = useCallback((event: any) => {
    setSlug(event?.target?.value)
  }, [slug, setSlug])

  useEffect(() => {
    setSlug(posts[0]?.slug?.current)
  }, [posts])

  return (
    <div className="p-4">
      <h1 className="text-2xl">zine reader</h1>
      <hr className="my-4" />
      <select className="block w-full mt-1" onChange={handleSelect}>
        {posts.map((item) => <option value={item.slug.current} key={item._id}>{item.title}</option>)}
      </select>
      <hr className="my-4" />
      {slug && 
        <Reader slug={slug} />
      }
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  const recentPosts: SanityPostPreviewProps[] = overlayDrafts(
    await getClient(preview).fetch(recentQuery)
  )
  const featuredPosts: SanityPostPreviewProps[] = overlayDrafts(
    await getClient(preview).fetch(featuredQuery)
  )
  const popularPosts: SanityPostPreviewProps[] = overlayDrafts(
    await getClient(preview).fetch(popularQuery)
  )

  return {
    props: {
      recentPosts,
      featuredPosts,
      popularPosts,
    },
    revalidate: 60,
  }
}

export default BlogPage

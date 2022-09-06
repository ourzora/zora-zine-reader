import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const token = process.env.NEXT_PUBLIC_SANITY_READ_TOKEN

const postFields = `
_id,
name,
title,
slug,
date,
twitterImage,
excerpt,
coverImage,
superFeatured,
gallery,
"author": author->{name, picture, role, link},
"illustrator": illustrator->{name, picture, role, link},
`

const recentQuery = `
*[_type == "post" && !('featured' in categories[]->title || featured == true)  && isPublic == true] | order(date desc) {
  ${postFields}
}`

const featuredQuery = `
*[_type == "post" && ('featured' in categories[]->title || featured == true) && isPublic == true] | order(date desc) {
  ${postFields}
}`

const popularQuery = `
*[_type == "post" && ('popular' in categories[]->title ||  popular == true) && isPublic == true] | order(date desc) {
  ${postFields}
}`

const sanityConfig = {
  dataset: 'production',
  projectId: 'cnj9z35v',
  // apiVersion: '2021-08-31',
  useCdn: process.env.NEXT_PUBLIC_STAGE === 'production',
  token: token,
}

const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) | [0] {    
    'content': content[]{
    	_type == 'reference' => @->,
    	_type != 'reference' => @,
		},
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug && isPublic == true && !(_id in path("drafts.**"))] | order(date desc) | [0...2] {
    ${postFields}
  }
}`

const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)][].slug.current
`

const generateImageUrl = (image: any): string => {
  const url: string | null = urlFor(image).url()

  return url ? url : ''
}

const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields}
  }
`

const sanityClient = createClient(sanityConfig)

const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
})

const getClient = (preview: any) => (preview ? previewClient : sanityClient)

function overlayDrafts(docs: any): SanityPostPreviewProps[] {
  const documents = docs || []
  const overlayed = documents.reduce((map: any, doc: any) => {
    if (!doc._id) {
      throw new Error('Ensure that `_id` is included in query projection')
    }

    const isDraft = doc._id.startsWith('drafts.')
    const id = isDraft ? doc._id.slice(7) : doc._id
    return isDraft || !map.has(id) ? map.set(id, doc) : map
  }, new Map())

  return Array.from(overlayed.values())
}

const builder = imageUrlBuilder(sanityClient)

function urlFor(source: any) {
  return builder.image(source)
}

export type SanityAuthor = {
  name: string
  picture: any
}

export type SanityPostProps = {
  _id: string
  slug: {
    current: string
  }
  title: string
  excerpt: string
  coverImage: string
  date: any
  twitterImage?: string
  gallery?: any
  author: {
    name: string
    link: string
    role: string
    picture: {
      _type: 'image'
      asset: { _ref: string; _type: 'reference' }
    }
  }
  illustrator: {
    name: string
    link: string
    role: string
    picture: {
      _type: 'image'
      asset: { _ref: string; _type: 'reference' }
    }
  }
  content: any
}

export type SanityPostPreviewProps = {
  _id: string
  slug: {
    current: string
  }
  title: string
  excerpt: string
  coverImage: string
  date: any
  superFeatured: boolean
  author: {
    name: string
  }
}

export type ArticleCardProps = {
  title: string
  slug: string
  date: Date
  excerpt: string
  coverImage: string
  author: string
  featured?: boolean
}

export type SanityPostQueryProps = {
  post: SanityPostProps
  morePosts: SanityPostProps[]
}

export {
  postFields,
  recentQuery,
  postBySlugQuery,
  previewClient,
  popularQuery,
  featuredQuery,
  sanityClient,
  postQuery,
  sanityConfig,
  postSlugsQuery,
  token,
  generateImageUrl,
  overlayDrafts,
  getClient,
}

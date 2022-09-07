import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getClient,
  postQuery,
  SanityPostQueryProps,
} from '../../../lib/sanity'

const blogPostHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { slug } = req.query

  const { post }: SanityPostQueryProps = await getClient(false).fetch(
    postQuery,
    {
      slug: slug,
    }
  )

  const cleanedPostContent = post?.content.map((item: any) => {
    if (item?._type === 'block') {
      return item.children.map((child: any) => { return child?.text })
    }
  }).flat()

  return res.status(200).json({
    slug: slug,
    content: cleanedPostContent.length && cleanedPostContent.toString(),
    post: post?.content,
  })

}

export default blogPostHandler
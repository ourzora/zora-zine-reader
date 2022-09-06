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
    return item.children ? item.children.map((child: any) => { return child?.text }) : item?.text
  }).flat()

  return res.status(200).json({
    slug: slug,
    content: cleanedPostContent,
    post: post,
  })

}

export default blogPostHandler
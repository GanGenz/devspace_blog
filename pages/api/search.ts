// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Data = {
  name: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let posts:any

  if(process.env.NODE_ENV === 'production'){
    // @todo - fetch from cache

  }else{
    const files = fs.readdirSync(path.join('posts'))

    posts = files.map((filename) => {
      const slug = filename.replace('.md', '')

      const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

      const {data: frontmatter} = matter(markdownWithMeta)

      return {
        slug,
        frontmatter
      }
    })


  }

  const results: [] = posts.filter(
    ({ frontmatter: {title, excerpt, category} }: { frontmatter: any }) => 
    title.toLowerCase().indexOf(req.query.q) != -1 || 
    excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
    category.toLowerCase().indexOf(req.query.q) != -1
    )
  


  // console.log(results)
  res.status(200).json(JSON.stringify({ results }))
}

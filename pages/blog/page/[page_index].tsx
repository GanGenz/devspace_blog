import type { NextPage } from 'next'
import fs from 'fs'
import path from 'path'
// import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
// import { sortByDate } from '@/utils/index'
import Pagination from '@/components/Pagination'
import CategoryList from '@/components/CategoryList'
import { POSTS_PER_PAGE } from '@/config/index'
import { getPosts } from '@/lib/posts'


type Props = {
  posts: any;
  numPages: any;
  currentPage: any;
  categories: [];
}
const BlogPage = ({ posts, numPages, currentPage, categories }: Props) => {
  
  return (
    <Layout>
      

      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {
            posts.map((item:any, index: number) => {
              return (
                <Post key={index} post={item} />
              )
            })
          }
        </div>
        
          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
    </div>


      

      
      {/* <Link href='/blog'>
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
          All Posts
        </a>
      </Link> */}
    </Layout>
  )
}

export default BlogPage


export async function getStaticPaths(){
  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  
  let paths = []

  for(let i = 1; i<=numPages; i++){
    paths.push(
      {
        params: {page_index: i.toString()}
      }
    )
  }
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }: any) {
  const page = parseInt((params && params.page_index) || 1)

  const files = fs.readdirSync(path.join('posts'))

  const posts = getPosts()

  const categories = posts.map(post => post.frontmatter.category)

  // console.log(categories)
  const uniqueCategories = [...new Set(categories)]

  // console.log('unique', uniqueCategories)



  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  )

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories
    }
  }
}

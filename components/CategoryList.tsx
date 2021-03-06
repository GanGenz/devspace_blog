import React from 'react'
import Link from 'next/link'

type Props = {
  categories: String[];
}

export default function CategoryList({ categories }: Props) {
  return (
    <div className='w-full p-5 bg-white rounded-lg shadow-md mt-6'>
      <h3 className='text-2xl bg-gray-800 text-white p-3 rounded'>
        Blog Categories
      </h3>

      <ul className="divide-y divide-gray-300">
        {
          categories.map((category, index) => {
              return (
                // eslint-disable-next-line @next/next/link-passhref
                <Link key={index} href={`/blog/category/${category.toLowerCase()}`}>
                  <li className="p-4 cursor-pointer hover:bg-gray-50">{category}</li>
                </Link>
              )
          })
        }
      </ul>


      
    </div>
  )
}

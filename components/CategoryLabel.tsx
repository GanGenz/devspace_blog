import React from 'react'
import Link from 'next/link'


type Props = {
  children: any
}
export default function CategoryLabel({ children }: Props) {

  // console.log('children is', children)
  const colorKey: any = {
    JavaScript: 'yellow',
    CSS: 'blue',
    Python: 'green',
    PHP: 'purple',
    Ruby: 'red'
  }
  return (
    <div className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}>
      <Link href={`/blog/category/${children.toLowerCase()}`}>
        {children}
      </Link>
    </div>
  )
}

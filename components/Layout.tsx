import type { NextPage } from 'next'
import Head from 'next/head'
import Header from './Header'
import Search from './Search'
type Props = {
  title: string;
  children: any;
  keywords: string;
  description: string
}

const Layout = ({ title, children, keywords, description }: Props) => {
  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Search />
      <main className='container mx-auto my-7'>{children}</main>
    </div>
  )
}
Layout.defaultProps = {
  title: "Welcome to DevSpace",
  keywords: "development, coding, programming",
  description: "The best introduce"
}

export default Layout

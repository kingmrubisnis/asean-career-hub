import Head from 'next/head'
import dynamic from 'next/dynamic'

const JobBlog = dynamic(() => import('../components/JobBlog'), { ssr: true })

export default function Home() {
  return (
    <>
      <Head>
        <title>ASEAN Career Hub - Find Jobs in Southeast Asia | Latest Opportunities</title>
        <link rel="canonical" href="https://your-domain.vercel.app" />
      </Head>
      <JobBlog />
    </>
  )
}

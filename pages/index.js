import Head from 'next/head'
import JobBlog from '../components/JobBlog'

export default function Home() {
  return (
    <>
      <Head>
        <title>ASEAN Career Hub - Find Jobs in Southeast Asia | Latest Opportunities</title>
      </Head>
      <JobBlog />
    </>
  )
}

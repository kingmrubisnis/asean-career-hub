import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const JobBlog = dynamic(() => import('../../../../components/JobBlog'), { ssr: true })

const COUNTRIES = {
  sg: 'Singapore',
  my: 'Malaysia',
  id: 'Indonesia',
  ph: 'Philippines',
  th: 'Thailand'
}

const CATEGORIES = {
  'it-software': 'IT & Software',
  'sales-marketing': 'Sales & Marketing',
  'finance-accounting': 'Finance & Accounting',
  'healthcare': 'Healthcare & Medical',
  'engineering': 'Engineering',
  'education': 'Education & Training'
}

export default function CategoryPage() {
  const router = useRouter()
  const { country, category } = router.query

  const countryName = COUNTRIES[country] || 'Southeast Asia'
  const categoryName = CATEGORIES[category] || 'All Jobs'

  return (
    <>
      <Head>
        <title>{categoryName} Jobs in {countryName} | ASEAN Career Hub</title>
        <meta name="description" content={`Find the latest ${categoryName} opportunities in ${countryName}. Browse hundreds of verified job listings updated daily.`} />
        <link rel="canonical" href={`https://your-domain.vercel.app/jobs/${country}/${category}`} />
      </Head>
      <JobBlog />
    </>
  )
}

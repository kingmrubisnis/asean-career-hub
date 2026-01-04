const SITE_URL = 'https://your-domain.vercel.app'

function generateSiteMap() {
  const countries = ['sg', 'my', 'id', 'ph', 'th']
  const categories = ['it-software', 'sales-marketing', 'finance-accounting', 'healthcare', 'engineering', 'education']
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${SITE_URL}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     ${countries.map(country => {
       return categories.map(category => {
         return `
         <url>
           <loc>${SITE_URL}/jobs/${country}/${category}</loc>
           <changefreq>daily</changefreq>
           <priority>0.8</priority>
         </url>
       `
       }).join('')
     }).join('')}
   </urlset>
 `
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function SiteMap() {}

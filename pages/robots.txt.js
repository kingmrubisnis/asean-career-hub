export async function getServerSideProps({ res }) {
  const robots = `User-agent: *
Allow: /

Sitemap: https://your-domain.vercel.app/sitemap.xml`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robots)
  res.end()

  return {
    props: {},
  }
}

export default function Robots() {}

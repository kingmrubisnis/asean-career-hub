import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Discover your dream career in Southeast Asia. Browse thousands of job opportunities across Singapore, Malaysia, Indonesia, Philippines, and Thailand. Updated daily with the latest positions." />
        <meta name="keywords" content="ASEAN jobs, Southeast Asia careers, Singapore jobs, Malaysia jobs, Indonesia jobs, Philippines jobs, Thailand jobs, IT jobs, engineering jobs, healthcare jobs, finance jobs" />
        <meta name="author" content="ASEAN Career Hub" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ASEAN Career Hub - Find Jobs in Southeast Asia" />
        <meta property="og:description" content="Your gateway to thousands of job opportunities across ASEAN countries. Find your next career move today." />
        <meta property="og:site_name" content="ASEAN Career Hub" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ASEAN Career Hub - Find Jobs in Southeast Asia" />
        <meta name="twitter:description" content="Your gateway to thousands of job opportunities across ASEAN countries" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Google AdSense - Replace YOUR_PUBLISHER_ID with your actual ID */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics - Optional */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_ID"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_GA_ID');
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

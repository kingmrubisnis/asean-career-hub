import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Discover your dream career in Southeast Asia. Browse thousands of job opportunities across Singapore, Malaysia, Indonesia, Philippines, and Thailand." />
        <meta name="keywords" content="ASEAN jobs, Southeast Asia careers, Singapore jobs, Malaysia jobs, Indonesia jobs, Philippines jobs, Thailand jobs, IT jobs, engineering jobs, healthcare jobs" />
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
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#e9523d" />
        
        {/* Google AdSense - Ganti YOUR_PUBLISHER_ID dengan ID Anda nanti */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossOrigin="anonymous"></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

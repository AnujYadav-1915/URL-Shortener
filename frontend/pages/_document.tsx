import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Vynkify — The fastest, most reliable URL shortener with analytics and branded links." />
        <meta property="og:title" content="Vynkify — URL Shortening" />
        <meta property="og:description" content="Shorten Links. Analyze Traffic. Experience Vynkify." />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-[#0a051e] text-white antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

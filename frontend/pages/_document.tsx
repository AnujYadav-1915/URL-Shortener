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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Merriweather:wght@400;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet" />
      </Head>
      <body className="antialiased bg-skin-bg text-skin-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

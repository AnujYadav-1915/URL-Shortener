import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'sonner';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/dashboard');
  
  return (
    <>
      <Head>
        <title>Vynkify — Lightning-Fast URL Shortener</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <div style={{ paddingTop: 72 }}>
        <Component {...pageProps} />
      </div>
      {!isDashboard && <Footer />}
      <Toaster 
        position="bottom-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(26, 23, 53, 0.95)',
            border: '1px solid rgba(127, 95, 255, 0.3)',
            color: '#e2e0f0',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
    </>
  );
}

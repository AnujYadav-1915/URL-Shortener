import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 80 }}>
        <Component {...pageProps} />
      </div>
      {/* Toaster removed for build compatibility */}
    </>
  );
}

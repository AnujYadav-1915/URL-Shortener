import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NeonShort - Modern URL Shortener',
  description: 'A vibrant, scalable, Bitly-inspired URL shortener SaaS.',
};

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-[#1a1832] to-[#2d2a4a] text-white min-h-screen`}> 
        <Navbar />
        <div className="pt-20 min-h-[80vh]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

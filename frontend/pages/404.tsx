import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Custom404() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="orb orb-purple w-[400px] h-[400px] top-1/4 left-1/4" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center relative z-10">
        <div className="text-8xl font-extrabold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold font-heading mb-3 text-white">Link Not Found</h1>
        <p className="text-[#a5a0c8] mb-8 max-w-md mx-auto">The page or short link you&apos;re looking for doesn&apos;t exist or may have expired.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/contact" className="btn-secondary">Report Issue</Link>
        </div>
      </motion.div>
    </main>
  );
}

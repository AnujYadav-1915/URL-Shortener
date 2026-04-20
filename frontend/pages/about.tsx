import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen py-24 px-4 relative">
      <div className="orb orb-purple w-[500px] h-[500px] -top-40 -right-40" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-6">About <span className="gradient-text">NeonShort</span></h1>
        <div className="card !p-8 space-y-6">
          <p className="text-[#c4b5fd] leading-relaxed text-lg">
            NeonShort is a next-generation URL shortener built for modern teams, marketers, and creators who demand more than just short links.
          </p>
          <h2 className="text-2xl font-bold font-heading">Our Mission</h2>
          <p className="text-[#a5a0c8] leading-relaxed">
            We believe every link tells a story. NeonShort helps you track, manage, and optimize your links with powerful analytics, branded short URLs, QR codes, and a beautiful interface that makes link management a joy.
          </p>
          <h2 className="text-2xl font-bold font-heading">What Makes Us Different</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-50ms redirects worldwide' },
              { icon: '🎨', title: 'Beautiful Design', desc: 'A premium UI you actually enjoy using' },
              { icon: '📊', title: 'Deep Analytics', desc: 'Track everything: devices, countries, referrers' },
              { icon: '🔒', title: 'Privacy First', desc: 'GDPR compliant, your data stays yours' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
                <div className="text-xs text-[#a5a0c8]">{item.desc}</div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold font-heading">Built By</h2>
          <p className="text-[#a5a0c8] leading-relaxed">
            NeonShort is created by <span className="text-white font-semibold">Anuj Yadav</span> — a developer passionate about building beautiful, high-performance web applications.
          </p>
          <div className="flex gap-3 pt-4">
            <Link href="/contact" className="btn-primary !py-2.5 text-sm">Get in Touch</Link>
            <Link href="/pricing" className="btn-secondary text-sm">View Pricing</Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

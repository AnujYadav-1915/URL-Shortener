import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';

const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-50ms redirects powered by edge infrastructure.' },
  { icon: '📊', title: 'Deep Analytics', desc: 'Track clicks, devices, locations, and referrers in real-time.' },
  { icon: '🎨', title: 'Custom Aliases', desc: 'Create branded, memorable short links for your brand.' },
  { icon: '📱', title: 'QR Codes', desc: 'Generate styled QR codes for every link instantly.' },
  { icon: '🔒', title: 'Link Security', desc: 'Password protection, expiration, and safe-browsing checks.' },
  { icon: '🌍', title: 'Global CDN', desc: 'Deployed worldwide for blazing speed in every country.' },
];

const stats = [
  { value: '10M+', label: 'Links Created' },
  { value: '1B+', label: 'Clicks Tracked' },
  { value: '100K+', label: 'Happy Users' },
  { value: '99.9%', label: 'Uptime' },
];

const testimonials = [
  { quote: 'NeonShort transformed our link strategy. The analytics are incredibly detailed.', name: 'Priya S.', role: 'Growth Lead at TechCorp', initials: 'PS' },
  { quote: 'The QR code feature alone saved us 10 hours/week. Absolute game changer!', name: 'Alex R.', role: 'Marketing Director', initials: 'AR' },
  { quote: 'Best SaaS for branded links. Our social engagement is up 40% since switching.', name: 'Sam T.', role: 'Social Media Lead', initials: 'ST' },
];

const useCases = [
  { icon: '📢', title: 'Marketing', desc: 'Track campaign performance with UTM parameters and branded links.' },
  { icon: '🛒', title: 'E-Commerce', desc: 'Bridge offline and online with trackable QR codes on packaging.' },
  { icon: '📱', title: 'Social Media', desc: 'Share clean, memorable links that boost engagement and trust.' },
  { icon: '💻', title: 'Developers', desc: 'Integrate via REST API with full analytics and webhook support.' },
];

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setShortUrl('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to shorten URL');
      const short = `${window.location.origin}/api/r/${data.shortId}`;
      setShortUrl(short);
      toast.success('Link shortened successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative overflow-hidden">
      {/* Background Orbs */}
      <div className="orb orb-purple w-[600px] h-[600px] -top-40 -left-40" />
      <div className="orb orb-cyan w-[400px] h-[400px] top-20 right-[-200px]" />
      <div className="orb orb-pink w-[500px] h-[500px] bottom-40 left-1/3" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-16 pb-24 grid-pattern">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7f5fff]/10 border border-[#7f5fff]/20 text-sm text-[#a5a0c8] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Trusted by 100,000+ teams worldwide
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-heading leading-tight tracking-tight mb-6">
            Shorten Links.{' '}
            <span className="gradient-text">Amplify</span>
            <br />
            Your Reach.
          </h1>

          <p className="text-lg sm:text-xl text-[#a5a0c8] max-w-2xl mx-auto mb-10 leading-relaxed">
            More than just a URL shortener — NeonShort gives you powerful analytics,
            branded links, QR codes, and everything you need to track and grow.
          </p>

          {/* URL Shortener Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                required
                placeholder="Paste your long URL here..."
                className="input-field flex-1 !py-4 !px-6 !text-base"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary !py-4 !px-8 whitespace-nowrap text-base"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Shortening...
                  </span>
                ) : (
                  'Shorten URL →'
                )}
              </button>
            </div>
          </form>

          {/* Result */}
          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 card !p-4 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-mono gradient-text hover:underline truncate"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary !py-2 !px-4 text-sm flex items-center gap-2"
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
            </motion.div>
          )}

          <p className="text-sm text-[#a5a0c8]/60 mt-4">
            No signup required • Free forever for basic usage
          </p>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-[#a5a0c8]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Everything you need to{' '}
              <span className="gradient-text">manage links</span>
            </h2>
            <p className="text-lg text-[#a5a0c8] max-w-2xl mx-auto">
              From shortening URLs to deep analytics, NeonShort has you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card group cursor-default"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#a5a0c8] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES SECTION ===== */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Perfect for <span className="gradient-text">every industry</span>
            </h2>
            <p className="text-lg text-[#a5a0c8]">Built for marketers, developers, and everyone in between</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center"
              >
                <div className="text-4xl mb-3">{uc.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{uc.title}</h3>
                <p className="text-sm text-[#a5a0c8]">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Loved by <span className="gradient-text">teams worldwide</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card"
              >
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-[#c4b5fd] text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7f5fff] to-[#00e6ff] flex items-center justify-center text-white text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-[#a5a0c8]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="card !p-12 neon-box relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7f5fff]/10 to-[#00e6ff]/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
                Ready to <span className="gradient-text">supercharge</span> your links?
              </h2>
              <p className="text-[#a5a0c8] mb-8 text-lg">
                Join 100,000+ teams already using NeonShort to grow their online presence.
              </p>
              <Link href="/signup" className="btn-primary inline-block !py-4 !px-10 text-lg">
                Get Started Free →
              </Link>
              <p className="text-xs text-[#a5a0c8]/60 mt-4">No credit card required</p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

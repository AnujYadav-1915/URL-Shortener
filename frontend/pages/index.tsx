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

const testimonials = [
  { quote: 'Vynkify transformed our link strategy. The analytics are incredibly detailed.', name: 'Priya S.', role: 'Growth Lead at TechCorp', initials: 'PS' },
  { quote: 'The QR code feature alone saved us 10 hours/week. Absolute game changer!', name: 'Alex R.', role: 'Marketing Director', initials: 'AR' },
  { quote: 'Best SaaS for branded links. Our social engagement is up 40% since switching.', name: 'Sam T.', role: 'Social Media Lead', initials: 'ST' },
];

const founder = {
  name: 'Anuj Yadav',
  role: 'Founder & Lead Architect',
  bio: 'Visionary developer focused on building high-performance digital tools that empower creators and businesses to scale their online presence.',
  links: [
    { platform: 'Portfolio', url: 'https://anujyadav-1915.github.io/updated-portfolio-website/', icon: '🌐' },
    { platform: '𝕏', url: 'https://x.com/anujyadav1915', icon: '𝕏' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/anujyadav1915/', icon: 'in' },
    { platform: 'GitHub', url: 'https://github.com/AnujYadav-1915', icon: 'GH' }
  ]
};

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setShortUrl(`${window.location.origin}/api/r/${data.shortId}`);
      toast.success('Link Vynkified! 🚀');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="orb orb-purple w-[600px] h-[600px] -top-20 -right-20 opacity-30" />
      <div className="orb orb-cyan w-[400px] h-[400px] top-1/2 -left-20 opacity-20" />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* STACKED BRAND BLOCK */}
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#7f5fff] to-[#00e6ff] rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <img src="/logo.png" alt="Vynkify Logo" className="w-32 h-32 mx-auto relative z-10 drop-shadow-[0_0_20px_rgba(127,95,255,0.4)]" />
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black font-heading mb-4 tracking-tighter leading-none">
            Don&apos;t share links.<br />
            <span className="gradient-text">Vynkify them.</span>
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-white/90 mb-8 font-heading">
            Shorten Links. <span className="text-[#00e6ff]">Amplify</span> Your Reach.
          </h2>

          <p className="text-lg text-[#a5a0c8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the elite platform for branded links, real-time analytics, and conversion-optimized QR codes. Fast, secure, and beautiful.
          </p>
        </motion.div>

        {/* Quick Shortener */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <form onSubmit={handleQuickShorten} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#7f5fff] to-[#00e6ff] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex p-2 bg-[#1a1735] border border-white/10 rounded-2xl">
              <input
                type="url"
                required
                placeholder="Paste your long link here..."
                className="flex-1 bg-transparent border-none text-white px-4 focus:ring-0 text-lg placeholder:text-[#a5a0c8]/50"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary !py-3 !px-8 !rounded-xl text-lg font-bold shadow-xl shadow-[#7f5fff]/20"
              >
                {loading ? 'Vynkifying...' : 'Vynkify Now ⚡'}
              </button>
            </div>
          </form>

          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 rounded-xl bg-[#7f5fff]/10 border border-[#7f5fff]/20 flex items-center justify-between gap-4"
            >
              <p className="text-[#00e6ff] font-mono font-bold truncate">{shortUrl}</p>
              <button
                onClick={() => { navigator.clipboard.writeText(shortUrl); toast.success('Copied!'); }}
                className="btn-secondary !py-2 !px-4 text-xs whitespace-nowrap"
              >
                Copy Link
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* WHY VYNKIFY ADVANCED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6">
              Why use <span className="gradient-text">Vynkify Advanced</span>?
            </h2>
            <p className="text-lg text-[#a5a0c8] mb-8 leading-relaxed">
              Basic shortening is just the start. Vynkify Advanced (available in the dashboard) gives you total control over your digital footprint.
            </p>
            <ul className="space-y-4">
              {[
                { title: 'UTM Builder', desc: 'Track exactly where your traffic comes from.' },
                { title: 'Custom Tags', desc: 'Organize thousands of links with ease.' },
                { title: 'Dynamic Editing', desc: 'Change the destination of any link after sharing it.' },
                { title: 'Password Protection', desc: 'Keep your sensitive links secure and private.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    <p className="text-[#a5a0c8] text-xs mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/signup" className="btn-primary !py-3 !px-8">Get Advanced Features →</Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card !p-0 overflow-hidden shadow-2xl shadow-purple-500/10 border-white/10">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Dashboard Preview" className="w-full h-auto opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a051e] to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* MEET THE FOUNDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
        <div className="card !p-12 relative overflow-hidden">
          <div className="orb orb-cyan w-[300px] h-[300px] -bottom-40 -right-40 opacity-20" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-3xl overflow-hidden mb-6 border-2 border-[#7f5fff]/30 shadow-2xl shadow-[#7f5fff]/20">
                <img src="https://avatars.githubusercontent.com/u/105439818?v=4" alt={founder.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">{founder.name}</h3>
              <p className="text-[#7f5fff] font-medium text-sm mb-4 uppercase tracking-widest">{founder.role}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {founder.links.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm font-bold text-[#a5a0c8] hover:bg-[#7f5fff] hover:text-white transition-all duration-300 shadow-lg border border-white/5"
                    title={link.platform}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="mb-6">
                <span className="text-4xl text-[#7f5fff] font-serif leading-none">“</span>
                <p className="text-2xl font-medium text-[#c4b5fd] italic leading-relaxed">
                  {founder.bio}
                </p>
                <div className="text-right">
                  <span className="text-4xl text-[#7f5fff] font-serif leading-none">”</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-10 mt-10 border-t border-white/5 pt-8">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">200+</div>
                  <div className="text-xs text-[#a5a0c8] uppercase tracking-wider">Projects Shipped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">5k+</div>
                  <div className="text-xs text-[#a5a0c8] uppercase tracking-wider">GitHub Stars</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">Elite</div>
                  <div className="text-xs text-[#a5a0c8] uppercase tracking-wider">Level Coder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center !p-16 relative overflow-hidden border-[#7f5fff]/20"
        >
          <div className="orb orb-purple w-[400px] h-[400px] -top-40 -left-40 opacity-30" />
          <h2 className="text-4xl sm:text-5xl font-bold font-heading mb-6 relative z-10 leading-tight">
            Ready to <span className="gradient-text">Vynkify</span> your presence?
          </h2>
          <p className="text-lg text-[#a5a0c8] max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed">
            Join the elite circle of creators and brands who demand the best. Start Vynkifying your links today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/signup" className="btn-primary !py-4 !px-10 text-lg">Get Started for Free</Link>
            <Link href="/pricing" className="btn-secondary !py-4 !px-10 text-lg">View Enterprise Plans</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

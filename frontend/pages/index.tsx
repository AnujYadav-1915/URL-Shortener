import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';

const features = [
  { icon: 'Speed', title: 'Lightning Fast', desc: 'Sub-50ms redirects powered by edge infrastructure.' },
  { icon: 'Analytics', title: 'Deep Analytics', desc: 'Track clicks, devices, locations, and referrers in real-time.' },
  { icon: 'Branding', title: 'Custom Aliases', desc: 'Create branded, memorable short links for your brand.' },
  { icon: 'Mobile', title: 'QR Codes', desc: 'Generate styled QR codes for every link instantly.' },
  { icon: 'Security', title: 'Link Security', desc: 'Password protection, expiration, and safe-browsing checks.' },
  { icon: 'Global', title: 'Global CDN', desc: 'Deployed worldwide for blazing speed in every country.' },
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
            <img src="/logo.png" alt="Vynkify Logo" className="w-32 h-32 mx-auto relative z-10" />
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black font-heading mb-4 tracking-tighter leading-none text-slate-900">
            Professional Link Management
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-600 mb-8 font-heading">
            Shorten Links. Analyze Traffic.
          </h2>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            A fast, secure, and reliable platform for branded links, real-time analytics, and QR codes.
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
            <div className="relative flex p-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <input
                type="url"
                required
                placeholder="Paste your long link here..."
                className="flex-1 bg-transparent border-none text-slate-900 px-4 focus:ring-0 text-lg placeholder:text-slate-400"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary !py-3 !px-8 !rounded-xl text-lg font-bold"
              >
                {loading ? 'Shortening...' : 'Shorten Link'}
              </button>
            </div>
          </form>

          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between gap-4"
            >
              <p className="text-blue-700 font-mono font-bold truncate">{shortUrl}</p>
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

      {/* WHY VYNKIFY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6 text-slate-900">
              Why use Vynkify?
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Basic shortening is just the start. Vynkify gives you total control over your digital footprint.
            </p>
            <ul className="space-y-4">
              {[
                { title: 'UTM Builder', desc: 'Track exactly where your traffic comes from.' },
                { title: 'Custom Tags', desc: 'Organize thousands of links with ease.' },
                { title: 'Dynamic Editing', desc: 'Change the destination of any link after sharing it.' },
                { title: 'Password Protection', desc: 'Keep your sensitive links secure and private.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/signup" className="btn-primary !py-3 !px-8">Create an Account →</Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card !p-0 overflow-hidden shadow-lg border-slate-200">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Dashboard Preview" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* MEET THE FOUNDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-200">
        <div className="card !p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-3xl overflow-hidden mb-6 border border-slate-200 shadow-sm">
                <img src="https://avatars.githubusercontent.com/u/105439818?v=4" alt={founder.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">{founder.name}</h3>
              <p className="text-blue-600 font-medium text-sm mb-4 uppercase tracking-widest">{founder.role}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {founder.links.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300"
                    title={link.platform}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="mb-6">
                <span className="text-4xl text-blue-600 font-serif leading-none">“</span>
                <p className="text-2xl font-medium text-slate-600 italic leading-relaxed">
                  {founder.bio}
                </p>
                <div className="text-right">
                  <span className="text-4xl text-blue-600 font-serif leading-none">”</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-10 mt-10 border-t border-slate-200 pt-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">200+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Projects Shipped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">5k+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">GitHub Stars</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">Expert</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Software Engineer</div>
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
          className="card text-center !p-16 relative overflow-hidden"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-heading mb-6 relative z-10 leading-tight text-slate-900">
            Ready to manage your links?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed">
            Create an account to track analytics and manage your branded short links.
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

import { motion } from 'framer-motion';

const updates = [
  {
    version: '1.0.0',
    date: 'April 20, 2026',
    title: 'Initial Production Release',
    changes: [
      'Official Vynkify Branding Launch',
      'Advanced Link Creation with UTM & Tags',
      'Real-time Analytics Dashboard',
      'Google Authentication Integration',
      'Password Protected Links',
      'QR Code Generation Engine'
    ]
  }
];

export default function Changelog() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 relative overflow-hidden">
      <div className="orb orb-cyan w-[600px] h-[600px] -top-20 -left-20 opacity-30" />

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold font-heading mb-2">Changelog</h1>
        <p className="text-[#a5a0c8] mb-12">See what&apos;s new in Vynkify</p>

        <div className="space-y-12">
          {updates.map((update, i) => (
            <motion.div
              key={update.version}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 border-l border-[#7f5fff]/20"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#7f5fff] shadow-[0_0_15px_rgba(127,95,255,0.5)]" />
              <div className="mb-2">
                <span className="text-xs font-bold text-[#7f5fff] uppercase tracking-widest">{update.date}</span>
                <h2 className="text-2xl font-bold text-white mt-1">v{update.version} — {update.title}</h2>
              </div>
              <ul className="space-y-2">
                {update.changes.map((change, j) => (
                  <li key={j} className="text-[#a5a0c8] flex items-center gap-2">
                    <span className="text-[#00e6ff]">▹</span> {change}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

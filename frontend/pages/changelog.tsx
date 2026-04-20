import { motion } from 'framer-motion';

const entries = [
  { date: 'Apr 20, 2026', version: 'v2.0', title: 'Complete Platform Rebuild', changes: ['Full-stack Next.js architecture', 'Premium glassmorphism UI', 'In-app analytics dashboard', 'QR code generation', 'Link search, tags & filtering', 'UTM builder integration', 'Bulk link creation', 'CSV export', 'Custom 404 page', 'About, Terms, Changelog pages'] },
  { date: 'Apr 19, 2026', version: 'v1.5', title: 'Enterprise Features', changes: ['Advanced analytics pipeline', 'Link-in-Bio builder', 'API key management', 'Campaign tracking'] },
  { date: 'Apr 18, 2026', version: 'v1.0', title: 'Initial Launch', changes: ['URL shortening', 'Basic analytics', 'User authentication', 'Dashboard', 'Pricing page'] },
];

export default function Changelog() {
  return (
    <main className="min-h-screen py-24 px-4 relative">
      <div className="orb orb-cyan w-[400px] h-[400px] -top-20 -left-40" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
          <span className="gradient-text">Changelog</span>
        </h1>
        <p className="text-[#a5a0c8] mb-12">See what&apos;s new in NeonShort</p>
        <div className="space-y-8">
          {entries.map((entry, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="card relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#7f5fff]/15 text-[#7f5fff] text-xs font-bold">{entry.version}</span>
                <span className="text-sm text-[#a5a0c8]">{entry.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{entry.title}</h2>
              <ul className="space-y-2">
                {entry.changes.map((change, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#a5a0c8]">
                    <span className="text-green-400 mt-0.5">✓</span>
                    {change}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

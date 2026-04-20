import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <main className="min-h-screen py-24 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-heading mb-8">Privacy <span className="gradient-text">Policy</span></h1>
        
        <div className="card space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Data Collection</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">
              NeonShort collects only the data necessary for providing our URL shortening and analytics services. This includes your email address, links you create, and anonymized click analytics (country, device type, browser).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Your Data</h2>
            <ul className="space-y-2 text-sm text-[#a5a0c8]">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> To provide and improve our services</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> To display analytics in your dashboard</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> To communicate service updates</li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> We never sell your data to third parties</li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> We never share your personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">
              Under GDPR and similar regulations, you have the right to access, export, and delete your data at any time. You can do this from your Account Settings page, or by contacting us at <a href="mailto:privacy@neonshort.com" className="text-[#7f5fff] hover:text-[#00e6ff] transition-colors">privacy@neonshort.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Security</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">
              All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We follow industry best practices including regular security audits and vulnerability assessments.
            </p>
          </section>

          <p className="text-xs text-[#a5a0c8]/50 pt-4 border-t border-white/5">
            Last updated: April 2026
          </p>
        </div>
      </motion.div>
    </main>
  );
}

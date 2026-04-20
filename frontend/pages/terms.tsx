import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <main className="min-h-screen py-24 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-heading mb-8">Terms of <span className="gradient-text">Service</span></h1>
        <div className="card space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">By using NeonShort, you agree to these terms. If you do not agree, please do not use our services.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">NeonShort provides URL shortening, analytics tracking, QR code generation, and link management services. We reserve the right to modify or discontinue any feature at any time.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Acceptable Use</h2>
            <ul className="space-y-2 text-sm text-[#a5a0c8]">
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> No spam, phishing, or malicious links</li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> No illegal content or activity</li>
              <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> No abuse of the service or API</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Legitimate business and personal use</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Account Termination</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">We may terminate accounts that violate these terms. You may delete your account at any time from your Account Settings.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Contact</h2>
            <p className="text-sm text-[#a5a0c8] leading-relaxed">For questions about these terms, contact us at <a href="mailto:anuj11112003@gmail.com" className="text-[#7f5fff] hover:text-[#00e6ff]">anuj11112003@gmail.com</a>.</p>
          </section>
          <p className="text-xs text-[#a5a0c8]/50 pt-4 border-t border-white/5">Last updated: April 2026</p>
        </div>
      </motion.div>
    </main>
  );
}

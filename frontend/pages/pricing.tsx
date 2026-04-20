import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'sonner';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      '25 links / month',
      'Basic analytics',
      'QR code generation',
      'Community support',
      'NeonShort branding',
    ],
    cta: 'Get Started',
    highlight: false,
    href: '/signup',
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    features: [
      '1,000 links / month',
      'Advanced analytics',
      'Custom domains',
      'Custom aliases',
      'Link expiration',
      'Password protection',
      'No branding',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    highlight: true,
    href: '/signup',
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: '$49',
    period: '/month',
    features: [
      'Unlimited links',
      'Team collaboration',
      'API access',
      'UTM tracking',
      'Geo/Device targeting',
      'Webhooks',
      'SSO integration',
      'Dedicated support',
      'Custom SLAs',
    ],
    cta: 'Contact Sales',
    highlight: false,
    href: '/contact',
  },
];

export default function Pricing() {
  return (
    <main className="min-h-screen py-24 px-4 relative">
      <div className="orb orb-purple w-[500px] h-[500px] -top-40 right-[-200px]" />
      <div className="orb orb-cyan w-[400px] h-[400px] bottom-20 -left-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
          Simple, transparent <span className="gradient-text">pricing</span>
        </h1>
        <p className="text-lg text-[#a5a0c8] max-w-xl mx-auto">
          Start free, scale as you grow. No hidden fees, cancel anytime.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`card flex flex-col relative ${
              plan.highlight
                ? '!border-[#7f5fff]/50 neon-box md:scale-105 md:-my-4'
                : ''
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7f5fff] to-[#00e6ff] text-white text-xs font-bold">
                {plan.badge}
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold gradient-text">{plan.price}</span>
                <span className="text-[#a5a0c8] text-sm mb-1">{plan.period}</span>
              </div>
            </div>
            <ul className="flex-1 space-y-3 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#a5a0c8]">
                  <span className="text-green-400 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={plan.highlight ? 'btn-primary text-center' : 'btn-secondary text-center'}
              onClick={() => {
                if (plan.name === 'Pro') toast.info('Pro plan coming soon!');
              }}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mt-24 relative z-10"
      >
        <h2 className="text-2xl font-bold font-heading text-center mb-10">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-4">
          {[
            { q: 'Can I try NeonShort for free?', a: 'Yes! Our free plan includes 25 links/month with basic analytics. No credit card required.' },
            { q: 'Can I upgrade or downgrade anytime?', a: 'Absolutely. Change your plan at any time. Changes take effect immediately.' },
            { q: 'Do you offer refunds?', a: 'Yes, we offer a 14-day money-back guarantee on all paid plans.' },
            { q: 'Is my data secure?', a: 'We use industry-standard encryption and comply with GDPR. Your data is never sold.' },
          ].map((faq, i) => (
            <details key={i} className="card group cursor-pointer">
              <summary className="font-medium text-white list-none flex justify-between items-center">
                {faq.q}
                <span className="text-[#7f5fff] transition-transform group-open:rotate-45 text-xl">+</span>
              </summary>
              <p className="text-sm text-[#a5a0c8] mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

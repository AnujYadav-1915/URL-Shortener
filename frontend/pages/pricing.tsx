import Section from '../components/Section';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: [
      'Unlimited short links',
      'Basic analytics',
      'QR code generation',
      'Community support',
    ],
    cta: 'Sign Up Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9/mo',
    features: [
      'Branded links',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration',
      'Priority support',
    ],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Business',
    price: 'Contact Us',
    features: [
      'Enterprise SSO',
      'Custom integrations',
      'Dedicated manager',
      'SLAs & compliance',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <Section title="Pricing">
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map(plan => (
          <div key={plan.name} className={`card flex flex-col items-center w-72 ${plan.highlight ? 'border-2 border-blue-400 scale-105' : ''}`}>
            <div className="text-2xl font-bold mb-2">{plan.name}</div>
            <div className="text-3xl font-extrabold mb-4">{plan.price}</div>
            <ul className="mb-4 text-left w-full list-disc list-inside">
              {plan.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <a href={plan.name === 'Business' ? '/contact' : '/signup'} className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white font-bold w-full text-center">{plan.cta}</a>
          </div>
        ))}
      </div>
    </Section>
  );
}

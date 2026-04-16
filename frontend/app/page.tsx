"use client";
import Section from '../components/Section';
import DemoShortener from '../components/DemoShortener';
import FeatureCard from '../components/FeatureCard';
import { FaLink, FaChartBar, FaQrcode, FaUserFriends, FaShieldAlt, FaCogs } from 'react-icons/fa';

export default function Home() {
  return (
    <main>
      <Section>
        <h1 className="text-5xl font-bold neon mb-6 text-center">Shorten, Brand & Track Your Links</h1>
        <p className="text-lg text-center mb-8 max-w-2xl mx-auto">NeonShort is the modern, secure, and scalable URL shortener for individuals, teams, and businesses. Create branded links, track analytics, and grow your audience with confidence.</p>
        <DemoShortener />
      </Section>

      <Section title="Why NeonShort?" className="flex flex-wrap justify-center gap-6">
        <FeatureCard icon={<FaLink />} title="Branded Links" description="Create custom, memorable short links for your brand or business." />
        <FeatureCard icon={<FaChartBar />} title="Analytics" description="Track clicks, referrers, locations, and device analytics in real time." />
        <FeatureCard icon={<FaQrcode />} title="QR Codes" description="Generate QR codes for every link, perfect for print and offline sharing." />
        <FeatureCard icon={<FaUserFriends />} title="Team Collaboration" description="Invite team members, manage roles, and collaborate on link campaigns." />
        <FeatureCard icon={<FaShieldAlt />} title="Security & Privacy" description="Industry-leading security, privacy controls, and GDPR compliance." />
        <FeatureCard icon={<FaCogs />} title="Custom Domains" description="Use your own domain for fully branded, trusted links." />
      </Section>

      <Section title="How It Works">
        <ol className="list-decimal list-inside text-lg max-w-2xl mx-auto space-y-2">
          <li>Paste your long URL above and click <b>Shorten URL</b>.</li>
          <li>Sign up for a free account to manage, brand, and track your links.</li>
          <li>Access analytics, QR codes, and advanced features from your dashboard.</li>
        </ol>
      </Section>

      <Section title="Get Started Today!" className="text-center">
        <a href="/signup" className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 neon px-8 py-4 rounded text-white text-xl font-bold mt-4">Sign Up Free</a>
      </Section>
    </main>
  );
}

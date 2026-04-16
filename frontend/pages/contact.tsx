import Section from '../components/Section';

export default function Contact() {
  return (
    <Section title="Contact Us">
      <form className="max-w-lg mx-auto flex flex-col gap-4 card">
        <input type="text" placeholder="Your Name" className="px-2 py-1 rounded text-black" required />
        <input type="email" placeholder="Your Email" className="px-2 py-1 rounded text-black" required />
        <textarea placeholder="How can we help you?" className="px-2 py-1 rounded text-black" rows={5} required />
        <button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white font-bold">Send Message</button>
      </form>
      <div className="text-center mt-6 text-gray-300">Or email us at <a href="mailto:support@neonshort.com" className="underline">support@neonshort.com</a></div>
    </Section>
  );
}

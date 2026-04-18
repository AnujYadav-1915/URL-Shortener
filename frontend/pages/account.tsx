import Section from '../components/Section';

export default function Account() {
  // In a real app, fetch user info from API
  const user = { name: 'Demo User', email: 'demo@neonshort.com', plan: 'Free' };
  return (
    <Section title="Account Settings">
      <div className="max-w-lg mx-auto card flex flex-col gap-4 animate-fade-in">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input type="text" value={user.name} className="px-2 py-2 rounded text-black w-full text-lg" disabled />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" value={user.email} className="px-2 py-2 rounded text-black w-full text-lg" disabled />
        </div>
        <div>
          <label className="block text-sm mb-1">Plan</label>
          <input type="text" value={user.plan} className="px-2 py-2 rounded text-black w-full text-lg" disabled />
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white font-bold hover:scale-105 transition-transform">Upgrade Plan</button>
        <button className="bg-red-600 px-4 py-2 rounded text-white font-bold hover:scale-105 transition-transform">Delete Account</button>
      </div>
    </Section>
  );
}

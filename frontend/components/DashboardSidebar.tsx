import Link from 'next/link';

export default function DashboardSidebar({ user }: { user: { name: string } }) {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#232046] bg-opacity-90 p-6 gap-8 border-r border-[#2d2a4a] min-h-screen">
      <div className="text-xl font-bold neon mb-8">👤 {user.name}</div>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/dashboard/links" className="hover:underline">Links</Link>
        <Link href="/dashboard/analytics" className="hover:underline">Analytics</Link>
        <Link href="/dashboard/qr" className="hover:underline">QR Codes</Link>
        <Link href="/dashboard/settings" className="hover:underline">Settings</Link>
      </nav>
      <div className="mt-auto">
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white w-full" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
      </div>
    </aside>
  );
}

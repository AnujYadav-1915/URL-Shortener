import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QRCode from 'qrcode.react';

interface Link {
  id: string;
  short_id: string;
  url: string;
  click_count: number;
  custom_alias?: string;
  expiry_date?: string;
  expiry_clicks?: number;
  deleted: boolean;
}

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, clicks: 0 });
  const router = useRouter();
  // Demo user info
  const user = { name: 'Demo User', email: 'demo@neonshort.com', plan: 'Free' };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      void router.push('/login');
      return;
    }
    fetch('http://localhost:4000/links', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setLinks(data.links || []);
        setStats({
          total: data.links?.length || 0,
          clicks: data.links?.reduce((a: number, l: Link) => a + l.click_count, 0) || 0,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-[#18162e] to-[#232046]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#232046] bg-opacity-90 p-6 gap-8 border-r border-[#2d2a4a]">
        <div className="text-xl font-bold neon mb-8">👤 {user.name}</div>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="hover:underline">Links</a>
          <a href="/account" className="hover:underline">Account</a>
          <a href="/pricing" className="hover:underline">Upgrade</a>
        </nav>
        <div className="mt-auto">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white w-full" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
        </div>
      </aside>
      {/* Main dashboard */}
      <div className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold neon mb-6">Dashboard</h1>
        {/* Analytics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card flex flex-col items-center justify-center">
            <span className="text-lg text-[#7f5fff]">Total Links</span>
            <span className="text-3xl font-extrabold neon">{stats.total}</span>
          </div>
          <div className="card flex flex-col items-center justify-center">
            <span className="text-lg text-[#00e6ff]">Total Clicks</span>
            <span className="text-3xl font-extrabold neon">{stats.clicks}</span>
          </div>
        </div>
        {/* Links table */}
        <div className="card p-0 overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-lg">Loading...</div>
          ) : links.length === 0 ? (
            <div className="p-8 text-center text-lg">No links yet. Shorten your first URL!</div>
          ) : (
            <LinksTable links={links} />
          )}
        </div>
      </div>
        <div className="flex gap-6 mb-8 flex-wrap">
          <div className="card flex-1 text-center min-w-[180px]">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm">Links Created</div>
          </div>
          <div className="card flex-1 text-center min-w-[180px]">
            <div className="text-2xl font-bold">{stats.clicks}</div>
            <div className="text-sm">Total Clicks</div>
          </div>
        </div>
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th>Short URL</th>
                <th>Original URL</th>
                <th>Clicks</th>
                <th>QR</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map(link => (
                <tr key={link.id} className={link.deleted ? 'opacity-50' : ''}>
                  <td>
                    <a href={`/${link.short_id}`} className="underline text-cyan-400" target="_blank" rel="noopener noreferrer">
                      {link.short_id}
                    </a>
                  </td>
                  <td className="truncate max-w-xs">{link.url}</td>
                  <td>{link.click_count}</td>
                  <td><QRCode value={`${window.location.origin}/${link.short_id}`} size={32} /></td>
                  <td>
                    <button className="px-2 py-1 bg-blue-600 rounded text-white" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${link.short_id}`)}>Copy</button>
                    {/* Add Edit/Delete/Recover actions here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="mt-4">Loading...</div>}
        </div>
      </div>
    </main>
  );
}

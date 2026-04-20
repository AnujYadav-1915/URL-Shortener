import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface Link {
  id: string;
  shortId: string;
  url: string;
  clickCount: number;
  createdAt: string;
  deleted: boolean;
}

interface AnalyticsData {
  totalClicks: number;
  dailyClicks: { date: string; clicks: number }[];
  countryBreakdown: { name: string; value: number }[];
  deviceBreakdown: { name: string; value: number }[];
  browserBreakdown: { name: string; value: number }[];
  referrerBreakdown: { name: string; value: number }[];
  topLinks: { shortId: string; clicks: number; url: string }[];
}

const COLORS = ['#7f5fff', '#00e6ff', '#ff2d95', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
const tabs = ['overview', 'links', 'analytics', 'qr'] as const;
type Tab = typeof tabs[number];

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newAlias, setNewAlias] = useState('');
  const [creating, setCreating] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; plan: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    
    Promise.all([
      fetch('/api/links', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/analytics', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ])
      .then(([linksData, analyticsData, userData]) => {
        setLinks(linksData.links || []);
        setAnalytics(analyticsData);
        if (userData.user) setUser(userData.user);
      })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url: newUrl, customAlias: newAlias || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setLinks(prev => [data.link, ...prev]);
      setNewUrl(''); setNewAlias('');
      setShowCreateModal(false);
      toast.success('Link created successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  const copyLink = (shortId: string) => {
    const url = `${window.location.origin}/api/r/${shortId}`;
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard!');
  };

  const deleteLink = async (shortId: string) => {
    const token = localStorage.getItem('token');
    await fetch('/api/links', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ shortId }),
    });
    setLinks(prev => prev.map(l => l.shortId === shortId ? { ...l, deleted: true } : l));
    toast.success('Link deleted');
  };

  const activeLinks = links.filter(l => !l.deleted);
  const totalClicks = analytics?.totalClicks || links.reduce((a, l) => a + l.clickCount, 0);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-[#7f5fff]/30 border-t-[#7f5fff] rounded-full animate-spin" />
          <p className="text-[#a5a0c8]">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen relative">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0d0b1a]/50 backdrop-blur-xl border-r border-[#7f5fff]/10 p-6 fixed h-full top-[72px]">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7f5fff] to-[#00e6ff] flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{user?.name || 'User'}</div>
            <div className="text-xs text-[#a5a0c8]">{user?.plan === 'free' ? 'Free Plan' : 'Pro Plan'}</div>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav className="flex flex-col gap-1">
          {[
            { id: 'overview' as Tab, icon: '📊', label: 'Overview' },
            { id: 'links' as Tab, icon: '🔗', label: 'Links' },
            { id: 'analytics' as Tab, icon: '📈', label: 'Analytics' },
            { id: 'qr' as Tab, icon: '📱', label: 'QR Codes' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#7f5fff]/15 text-white'
                  : 'text-[#a5a0c8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => { localStorage.removeItem('token'); router.push('/'); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#a5a0c8] hover:bg-red-500/10 hover:text-red-400 w-full transition-all"
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-6 lg:p-10 max-w-6xl">
        {/* Mobile Tabs */}
        <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab ? 'bg-[#7f5fff]/15 text-white' : 'text-[#a5a0c8] bg-white/5'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">
              {activeTab === 'overview' && 'Dashboard'}
              {activeTab === 'links' && 'Your Links'}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'qr' && 'QR Codes'}
            </h1>
            <p className="text-[#a5a0c8] text-sm mt-1">
              {activeTab === 'overview' && `Welcome back, ${user?.name || 'there'}!`}
              {activeTab === 'links' && `${activeLinks.length} active links`}
              {activeTab === 'analytics' && 'Track your link performance'}
              {activeTab === 'qr' && 'Generate QR codes for your links'}
            </p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary !py-3 !px-6 text-sm">
            + New Link
          </button>
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Links', value: activeLinks.length, icon: '🔗', color: 'from-[#7f5fff]/20' },
                { label: 'Total Clicks', value: totalClicks, icon: '👆', color: 'from-[#00e6ff]/20' },
                { label: 'Avg CTR', value: activeLinks.length > 0 ? Math.round(totalClicks / activeLinks.length) + '/link' : '0', icon: '📊', color: 'from-[#ff2d95]/20' },
                { label: 'Active QR', value: activeLinks.length, icon: '📱', color: 'from-[#10b981]/20' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`card bg-gradient-to-br ${stat.color} to-transparent`}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-[#a5a0c8] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Click Trends Chart */}
            {analytics && analytics.dailyClicks.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Click Trends (30 days)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={analytics.dailyClicks.slice(-30)}>
                    <XAxis dataKey="date" tick={{ fill: '#a5a0c8', fontSize: 11 }} tickFormatter={d => d.split('-').slice(1).join('/')} />
                    <YAxis tick={{ fill: '#a5a0c8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#1a1735', border: '1px solid rgba(127,95,255,0.3)', borderRadius: 12, color: '#e2e0f0' }} />
                    <Line type="monotone" dataKey="clicks" stroke="#7f5fff" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Recent Links */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Links</h3>
                <button onClick={() => setActiveTab('links')} className="text-sm text-[#7f5fff] hover:text-[#00e6ff] transition-colors">View all →</button>
              </div>
              <div className="space-y-3">
                {activeLinks.slice(0, 5).map(link => (
                  <div key={link.id} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-mono text-[#7f5fff] truncate">{link.shortId}</div>
                      <div className="text-xs text-[#a5a0c8] truncate">{link.url}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold text-white">{link.clickCount} clicks</span>
                      <button onClick={() => copyLink(link.shortId)} className="text-xs px-3 py-1.5 rounded-lg bg-[#7f5fff]/10 text-[#7f5fff] hover:bg-[#7f5fff]/20 transition-colors">Copy</button>
                    </div>
                  </div>
                ))}
                {activeLinks.length === 0 && (
                  <div className="text-center py-8 text-[#a5a0c8]">
                    <div className="text-4xl mb-3">🔗</div>
                    <p>No links yet. Create your first link!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== LINKS TAB ===== */}
        {activeTab === 'links' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {activeLinks.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card !p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-mono font-semibold text-[#7f5fff]">{link.shortId}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">{link.clickCount} clicks</span>
                  </div>
                  <p className="text-sm text-[#a5a0c8] truncate">{link.url}</p>
                  <p className="text-xs text-[#a5a0c8]/50 mt-1">{new Date(link.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => copyLink(link.shortId)} className="px-3 py-2 text-xs rounded-lg bg-[#7f5fff]/10 text-[#7f5fff] hover:bg-[#7f5fff]/20 transition-all">📋 Copy</button>
                  <button onClick={() => setActiveTab('qr')} className="px-3 py-2 text-xs rounded-lg bg-[#00e6ff]/10 text-[#00e6ff] hover:bg-[#00e6ff]/20 transition-all">📱 QR</button>
                  <button onClick={() => deleteLink(link.shortId)} className="px-3 py-2 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">🗑️</button>
                </div>
              </motion.div>
            ))}
            {activeLinks.length === 0 && (
              <div className="card text-center py-16">
                <div className="text-5xl mb-4">🔗</div>
                <h3 className="text-xl font-semibold mb-2">No links yet</h3>
                <p className="text-[#a5a0c8] mb-6">Create your first shortened link to get started</p>
                <button onClick={() => setShowCreateModal(true)} className="btn-primary">+ Create Link</button>
              </div>
            )}
          </motion.div>
        )}

        {/* ===== ANALYTICS TAB ===== */}
        {activeTab === 'analytics' && analytics && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Device Breakdown */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Devices</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={analytics.deviceBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={0}>
                      {analytics.deviceBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1a1735', border: '1px solid rgba(127,95,255,0.3)', borderRadius: 12, color: '#e2e0f0' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  {analytics.deviceBreakdown.map((d, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-xs text-[#a5a0c8]">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      {d.name}: {d.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Country Breakdown */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={analytics.countryBreakdown.slice(0, 6)} layout="vertical">
                    <XAxis type="number" tick={{ fill: '#a5a0c8', fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#a5a0c8', fontSize: 11 }} width={30} />
                    <Tooltip contentStyle={{ background: '#1a1735', border: '1px solid rgba(127,95,255,0.3)', borderRadius: 12, color: '#e2e0f0' }} />
                    <Bar dataKey="value" fill="#7f5fff" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Browser Breakdown */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Browsers</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={analytics.browserBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={0}>
                      {analytics.browserBreakdown.map((_, i) => <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1a1735', border: '1px solid rgba(127,95,255,0.3)', borderRadius: 12, color: '#e2e0f0' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2 flex-wrap">
                  {analytics.browserBreakdown.map((d, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-xs text-[#a5a0c8]">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[(i + 2) % COLORS.length] }} />
                      {d.name}: {d.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Referrers */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Top Referrers</h3>
                <div className="space-y-3">
                  {analytics.referrerBreakdown.slice(0, 5).map((ref, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-[#a5a0c8]">{ref.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#7f5fff] to-[#00e6ff] rounded-full" style={{ width: `${(ref.value / (analytics.referrerBreakdown[0]?.value || 1)) * 100}%` }} />
                        </div>
                        <span className="text-xs font-mono text-white w-8 text-right">{ref.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Links */}
            {analytics.topLinks.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Top Performing Links</h3>
                <div className="space-y-3">
                  {analytics.topLinks.map((link, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02]">
                      <span className="text-lg font-bold text-[#7f5fff] w-6">#{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm text-white">{link.shortId}</div>
                        <div className="text-xs text-[#a5a0c8] truncate">{link.url}</div>
                      </div>
                      <span className="text-sm font-semibold text-[#00e6ff]">{link.clicks} clicks</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ===== QR CODES TAB ===== */}
        {activeTab === 'qr' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="card flex flex-col items-center text-center"
                >
                  <div className="bg-white p-4 rounded-xl mb-4">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/api/r/${link.shortId}`)}&color=7f5fff&bgcolor=ffffff`}
                      alt={`QR for ${link.shortId}`}
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="font-mono text-sm text-[#7f5fff] mb-1">{link.shortId}</div>
                  <div className="text-xs text-[#a5a0c8] truncate max-w-full mb-3">{link.url}</div>
                  <div className="flex gap-2">
                    <button onClick={() => copyLink(link.shortId)} className="px-3 py-1.5 text-xs rounded-lg bg-[#7f5fff]/10 text-[#7f5fff] hover:bg-[#7f5fff]/20 transition-all">Copy Link</button>
                    <a
                      href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/api/r/${link.shortId}`)}&color=7f5fff&bgcolor=ffffff`}
                      download={`qr-${link.shortId}.png`}
                      className="px-3 py-1.5 text-xs rounded-lg bg-[#00e6ff]/10 text-[#00e6ff] hover:bg-[#00e6ff]/20 transition-all"
                    >
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
              {activeLinks.length === 0 && (
                <div className="col-span-full card text-center py-16">
                  <div className="text-5xl mb-4">📱</div>
                  <h3 className="text-xl font-semibold mb-2">No QR codes yet</h3>
                  <p className="text-[#a5a0c8]">Create a link first, and a QR code will be generated automatically</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* ===== CREATE LINK MODAL ===== */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="card !p-8 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold font-heading mb-6">Create New Link</h2>
              <form onSubmit={handleCreateLink} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-[#a5a0c8] mb-1.5 block">Destination URL *</label>
                  <input type="url" required placeholder="https://example.com/very-long-url" className="input-field" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-[#a5a0c8] mb-1.5 block">Custom Alias (optional)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#a5a0c8] whitespace-nowrap">neonshort.app/</span>
                    <input type="text" placeholder="my-brand" className="input-field" value={newAlias} onChange={e => setNewAlias(e.target.value)} />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary flex-1">Cancel</button>
                  <button type="submit" disabled={creating} className="btn-primary flex-1">
                    {creating ? 'Creating...' : 'Create Link'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

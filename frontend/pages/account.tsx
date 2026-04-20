import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Account() {
  const [user, setUser] = useState<{ name: string; email: string; plan: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (data.user) setUser(data.user); else router.push('/login'); })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Signed out successfully');
    router.push('/');
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#7f5fff]/30 border-t-[#7f5fff] rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen py-24 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold font-heading mb-8">Account Settings</h1>

        {/* Profile Card */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7f5fff] to-[#00e6ff] flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-white text-lg">{user?.name}</div>
              <div className="text-sm text-[#a5a0c8]">{user?.email}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#a5a0c8] mb-1.5 block">Full Name</label>
              <input type="text" defaultValue={user?.name} className="input-field" />
            </div>
            <div>
              <label className="text-xs text-[#a5a0c8] mb-1.5 block">Email</label>
              <input type="email" defaultValue={user?.email} className="input-field" disabled />
            </div>
            <button className="btn-primary !py-2.5 text-sm" onClick={() => toast.success('Profile saved!')}>
              Save Changes
            </button>
          </div>
        </div>

        {/* Plan Card */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] mb-4">
            <div>
              <span className="text-sm font-semibold text-white capitalize">{user?.plan || 'Free'} Plan</span>
              <p className="text-xs text-[#a5a0c8] mt-0.5">25 links/month • Basic analytics</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#7f5fff]/10 text-[#7f5fff] text-xs font-medium">Active</span>
          </div>
          <button onClick={() => router.push('/pricing')} className="btn-secondary text-sm w-full">
            Upgrade Plan →
          </button>
        </div>

        {/* Danger Zone */}
        <div className="card !border-red-500/20">
          <h2 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleLogout} className="px-4 py-2.5 text-sm rounded-xl bg-white/5 text-[#a5a0c8] hover:bg-white/10 transition-all flex-1">
              Sign Out
            </button>
            <button onClick={() => toast.error('Account deletion is disabled in demo')} className="px-4 py-2.5 text-sm rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all flex-1">
              Delete Account
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

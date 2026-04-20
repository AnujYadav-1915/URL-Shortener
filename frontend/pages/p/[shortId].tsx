import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function PasswordProtected() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { shortId } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/r/${shortId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err: any) {
      toast.error('Incorrect password. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center relative overflow-hidden">
      <div className="orb orb-purple w-[600px] h-[600px] -bottom-20 -right-20" />
      <div className="orb orb-cyan w-[400px] h-[400px] -top-20 -left-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card !p-10 w-full max-w-md relative z-10 text-center"
      >
        <img src="/logo.png" alt="Vynkify" className="w-16 h-16 mx-auto mb-6 drop-shadow-[0_0_10px_rgba(127,95,255,0.3)]" />
        <h1 className="text-2xl font-bold font-heading mb-2 text-white">Protected Link</h1>
        <p className="text-[#a5a0c8] text-sm mb-8">This Vynkify link is encrypted. Please enter the password to proceed.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            placeholder="Enter password..."
            className="input-field text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading} className="btn-primary w-full !py-4 shadow-xl shadow-[#7f5fff]/20">
            {loading ? 'Verifying...' : 'Unlock Link 🔓'}
          </button>
        </form>
        
        <p className="text-[10px] text-[#a5a0c8]/50 mt-8 uppercase tracking-widest font-bold">
          Secured by Vynkify Engine
        </p>
      </motion.div>
    </main>
  );
}

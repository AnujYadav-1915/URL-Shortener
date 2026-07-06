import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem('token', data.token);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/google', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem('token', data.token);
      toast.success('Signed in with Google!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error('Google Sign-In failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center relative overflow-hidden">
      <div className="orb orb-cyan w-[600px] h-[600px] -bottom-20 -left-20" />
      <div className="orb orb-purple w-[400px] h-[400px] -top-20 -right-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card !p-8 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Vynkify Logo" className="w-16 h-16 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(127,95,255,0.3)]" />
          <h1 className="text-3xl font-bold font-heading mb-2 text-white">Welcome back</h1>
          <p className="text-[#a5a0c8] text-sm">Sign in to your Vynkify account</p>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-all mb-6 group disabled:opacity-50"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.36-2.08 4.48-1.28 1.28-3.28 2.52-6.52 2.52-5.28 0-9.48-4.28-9.48-9.52s4.2-9.52 9.48-9.52c2.88 0 5.04 1.12 6.6 2.6l2.32-2.32C18.44 1.48 15.64 0 12.48 0 5.6 0 0 5.6 0 12.48s5.6 12.48 12.48 12.48c3.72 0 6.52-1.24 8.68-3.48 2.24-2.24 2.92-5.4 2.92-8.08 0-.52-.04-1.04-.12-1.48H12.48z" />
          </svg>
          {loading ? 'Processing...' : 'Sign in with Google'}
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0a051e] px-2 text-[#a5a0c8]">or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-[#a5a0c8] mb-1.5 block">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-[#a5a0c8]">Password</label>
              <Link href="/forgot-password" title="Click here if you forgot your password" className="text-[10px] text-[#7f5fff] hover:text-[#00e6ff] transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-8 space-y-4">
          <p className="text-sm text-[#a5a0c8]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-white font-medium hover:text-[#7f5fff] transition-colors">
              Sign up for free
            </Link>
          </p>
          <button 
            onClick={() => { setEmail('demo@vynkify.com'); setPassword('demo123'); }}
            className="text-xs text-[#7f5fff]/50 hover:text-[#7f5fff] transition-colors"
          >
            🎮 Try Demo Account
          </button>
        </div>
      </motion.div>
    </main>
  );
}

import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        toast.success(`Welcome to NeonShort, ${name}!`);
        router.push('/dashboard');
      } else {
        toast.error(data.error || 'Signup failed');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (password.length === 0) return { width: '0%', color: '', label: '' };
    if (password.length < 6) return { width: '25%', color: 'bg-red-500', label: 'Weak' };
    if (password.length < 10) return { width: '50%', color: 'bg-yellow-500', label: 'Fair' };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return { width: '100%', color: 'bg-green-500', label: 'Strong' };
    return { width: '75%', color: 'bg-blue-500', label: 'Good' };
  };

  const strength = getPasswordStrength();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 relative">
      <div className="orb orb-cyan w-[400px] h-[400px] -top-20 -left-20" />
      <div className="orb orb-purple w-[300px] h-[300px] bottom-10 -right-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="card !p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2">Create your account</h1>
            <p className="text-[#a5a0c8] text-sm">Start shortening links in seconds</p>
          </div>

          {/* Google Sign-up (mock) */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all mb-4"
            onClick={() => toast.info('Google OAuth coming soon!')}
          >
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[#a5a0c8]">or continue with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-[#a5a0c8] mb-1.5 block">Full Name</label>
              <input type="text" required placeholder="John Doe" className="input-field" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-[#a5a0c8] mb-1.5 block">Email</label>
              <input type="email" required placeholder="you@example.com" className="input-field" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-[#a5a0c8] mb-1.5 block">Password</label>
              <input type="password" required placeholder="Min 6 characters" className="input-field" value={password} onChange={e => setPassword(e.target.value)} />
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: strength.width }}
                      className={`h-full ${strength.color} rounded-full`}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-[#a5a0c8] mt-1">{strength.label}</p>
                </div>
              )}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-[#a5a0c8] mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#7f5fff] hover:text-[#00e6ff] transition-colors font-medium">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-[#a5a0c8]/50 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </main>
  );
}

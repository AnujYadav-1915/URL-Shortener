import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
      toast.success('Reset link sent!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center relative overflow-hidden">
      <div className="orb orb-purple w-[500px] h-[500px] -top-20 -right-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card !p-8 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2 text-white">Reset Password</h1>
          <p className="text-[#a5a0c8] text-sm">
            Enter your email and we&apos;ll send you a link to get back into your account.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-[#a5a0c8] mb-1.5 block">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5">
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </button>
            <div className="text-center mt-6">
              <Link href="/login" className="text-sm text-[#7f5fff] hover:text-[#00e6ff] transition-colors">
                ← Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-400">✓</span>
            </div>
            <p className="text-[#a5a0c8] text-sm mb-8">
              Check your inbox! We&apos;ve sent password reset instructions to <span className="text-white font-medium">{email}</span>.
            </p>
            <Link href="/login" className="btn-secondary w-full text-center">
              Back to Login
            </Link>
          </div>
        )}
      </motion.div>
    </main>
  );
}

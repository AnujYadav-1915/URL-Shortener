import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        alert('Login failed: ' + data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-full max-w-md flex flex-col gap-4">
        <h2 className="text-3xl font-bold neon mb-2 text-center">Sign in to NeonShort</h2>
        <button className="bg-white text-black px-4 py-2 rounded font-bold flex items-center justify-center gap-2 border border-gray-300" disabled>
          <img src="/google.svg" alt="Google" className="w-5 h-5" /> Sign in with Google
        </button>
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-400" />
          <span className="text-gray-300 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-400" />
        </div>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="px-2 py-1 rounded text-black" />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="px-2 py-1 rounded text-black" />
        <button onClick={handleLogin} disabled={loading} className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white font-bold">{loading ? 'Loading...' : 'Sign In'}</button>
        <div className="text-center text-gray-300 mt-2">
          Don&apos;t have an account? <a href="/signup" className="underline">Sign Up</a>
        </div>
      </div>
    </main>
  );
}

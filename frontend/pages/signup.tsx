import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        alert('Signup failed: ' + (data.error || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#18162e] to-[#232046]">
      <div className="card w-full max-w-md flex flex-col gap-4 animate-fade-in">
        <h2 className="text-3xl font-bold neon mb-2 text-center">Create your NeonShort account</h2>
        <button className="bg-white text-black px-4 py-2 rounded font-bold flex items-center justify-center gap-2 border border-gray-300 opacity-60 cursor-not-allowed" disabled>
          <img src="/google.svg" alt="Google" className="w-5 h-5" /> Sign up with Google
        </button>
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-400" />
          <span className="text-gray-300 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-400" />
        </div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="px-2 py-2 rounded text-black text-lg" />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="px-2 py-2 rounded text-black text-lg" />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="px-2 py-2 rounded text-black text-lg" />
        <button onClick={handleSignup} disabled={loading} className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white font-bold mt-2 hover:scale-105 transition-transform">{loading ? 'Loading...' : 'Sign Up'}</button>
        <div className="text-center text-gray-300 mt-2">
          Already have an account? <a href="/login" className="underline">Sign In</a>
        </div>
      </div>
    </main>
  );
}

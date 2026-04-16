import Link from 'next/link';

export default function Navbar({ user }: { user?: { name: string } }) {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#232046] bg-opacity-90 shadow-lg fixed top-0 left-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold neon">NeonShort</Link>
        <Link href="/dashboard" className="ml-6 hover:underline">Dashboard</Link>
        <Link href="/pricing" className="ml-4 hover:underline">Pricing</Link>
        <Link href="/contact" className="ml-4 hover:underline">Contact</Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-semibold">Hi, {user.name}</span>
            <Link href="/account" className="hover:underline">Account</Link>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

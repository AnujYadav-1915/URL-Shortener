import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check auth state
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(data => { if (data.user) setUser(data.user); });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [router.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleMobileClick = (href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-[#0a051e]/80 backdrop-blur-xl border-b border-[#7f5fff]/10 shadow-2xl' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#7f5fff] to-[#00e6ff] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <img src="/logo.png" alt="Vynkify Logo" className="w-12 h-12 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-black font-heading tracking-tight">
              <span className="gradient-text">Vynkify</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-all duration-200 ${
                  router.pathname === link.href ? 'text-[#7f5fff] border-b-2 border-[#7f5fff] pb-1' : 'text-[#a5a0c8] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <Link href="/dashboard" className="btn-primary !py-3 !px-8 text-xs font-bold uppercase tracking-widest flex items-center gap-2 !rounded-xl">
                Dashboard <span className="opacity-50">→</span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-[#a5a0c8] hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary !py-3 !px-8 text-xs font-bold uppercase tracking-widest !rounded-xl shadow-lg shadow-[#7f5fff]/20">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#0a051e] border-b border-[#7f5fff]/10 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-10 space-y-6">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleMobileClick(link.href)}
                  className="block w-full text-left text-2xl font-bold text-[#a5a0c8] hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-6 flex flex-col gap-4">
                {user ? (
                  <button onClick={() => handleMobileClick('/dashboard')} className="btn-primary text-center !py-4">
                    Dashboard
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleMobileClick('/login')} className="btn-secondary text-center !py-4">
                      Login
                    </button>
                    <button onClick={() => handleMobileClick('/signup')} className="btn-primary text-center !py-4">
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import Link from 'next/link';

const footerLinks = {
  Product: [
    { label: 'URL Shortener', href: '/' },
    { label: 'QR Codes', href: '/signup' },
    { label: 'Analytics', href: '/signup' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[#7f5fff]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <span className="text-lg font-bold font-heading">
                <span className="gradient-text">Neon</span>
                <span className="text-white">Short</span>
              </span>
            </div>
            <p className="text-sm text-[#a5a0c8] leading-relaxed mb-6">
              The fastest, most beautiful URL shortener for modern teams and creators.
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-[#a5a0c8] hover:bg-[#7f5fff]/20 hover:text-[#7f5fff] transition-all duration-200">𝕏</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-[#a5a0c8] hover:bg-[#7f5fff]/20 hover:text-[#7f5fff] transition-all duration-200">in</a>
              <a href="https://github.com/AnujYadav-1915" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-[#a5a0c8] hover:bg-[#7f5fff]/20 hover:text-[#7f5fff] transition-all duration-200">GH</a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[#a5a0c8] hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#7f5fff]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#a5a0c8]">© {new Date().getFullYear()} NeonShort. All rights reserved.</p>
          <p className="text-xs text-[#a5a0c8]">
            <a href="mailto:anuj11112003@gmail.com" className="hover:text-white transition-colors">anuj11112003@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

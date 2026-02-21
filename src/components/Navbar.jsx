import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/portfolio', label: 'Showreel' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/shop', label: 'Shop' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b border-[#3e3324]">
      <div className="container mx-auto px-4 h-24 flex items-center justify-center relative">
        <div className="flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-base font-serif italic transition ${
                isActive(link.to) ? 'text-[#b8955d]' : 'text-white hover:text-[#b8955d]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/shop"
          className="absolute right-4 md:right-8 text-[#b8955d] hover:text-white transition flex items-center gap-2"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-7 h-7" />
          <span className="text-lg">0</span>
        </Link>
        </div>
      </div>
    </nav>
  );
}

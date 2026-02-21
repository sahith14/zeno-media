// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className={`text-xl tracking-wider ${scrolled ? 'text-black' : 'text-white'}`}
        >
          ZENO MEDIA
        </Link>
        
        <div className="flex space-x-8 items-center">
          <NavLink to="/" scrolled={scrolled} active={isActive('/')}>Home</NavLink>
          <NavLink to="/showreel" scrolled={scrolled} active={isActive('/showreel')}>Showreel</NavLink>
          <NavLink to="/about" scrolled={scrolled} active={isActive('/about')}>About</NavLink>
          <NavLink to="/contact" scrolled={scrolled} active={isActive('/contact')}>Contact</NavLink>
          <NavLink to="/blog" scrolled={scrolled} active={isActive('/blog')}>Blog</NavLink>
          <NavLink to="/shop" scrolled={scrolled} active={isActive('/shop')}>Shop</NavLink>
          
          {currentUser && currentUser.email === ADMIN_EMAIL && (
            <NavLink to="/admin-7x91k" scrolled={scrolled}>Admin</NavLink>
          )}
          
          {currentUser ? (
            <button 
              onClick={logout}
              className={`text-sm ${scrolled ? 'text-black' : 'text-white'} hover:opacity-70 transition`}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" scrolled={scrolled}>Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, scrolled, active }) {
  return (
    <Link 
      to={to} 
      className={`text-sm tracking-wide transition ${
        scrolled ? 'text-black' : 'text-white'
      } ${active ? 'font-bold' : 'hover:opacity-70'}`}
    >
      {children}
    </Link>
  );
}

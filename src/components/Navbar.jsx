// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error', error);
    }
  }

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl gold-text font-bold">ZENO MEDIA</Link>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-gold transition">Home</Link>
          <Link to="/about" className="hover:text-gold transition">About</Link>
          <Link to="/portfolio" className="hover:text-gold transition">Portfolio</Link>
          <Link to="/shop" className="hover:text-gold transition">Shop</Link>
          <Link to="/contact" className="hover:text-gold transition">Contact</Link>
          {currentUser ? (
            <>
              <Link to="/downloads" className="hover:text-gold transition">Downloads</Link>
              {currentUser.email === 'zenomedia.work@gmail.com' && (
                <Link to="/admin-7x91k" className="hover:text-gold transition">Admin</Link>
              )}
              <button onClick={handleLogout} className="hover:text-gold transition">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gold transition">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      toast.error('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <>
      <Helmet><title>Login - ZENO MEDIA</title></Helmet>
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
          <h1 className="text-3xl gold-text text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 mb-4 bg-gray-800 rounded" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 mb-6 bg-gray-800 rounded" required />
            <button type="submit" disabled={loading} className="w-full bg-gold text-black py-3 rounded font-semibold hover:bg-gold/80 transition">
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

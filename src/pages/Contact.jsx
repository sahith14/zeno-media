// src/pages/Contact.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the message via a cloud function or email service
    toast.success('Message sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Helmet><title>Contact - ZENO MEDIA</title></Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl gold-text text-center mb-8">Contact</motion.h1>
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-3 bg-gray-800 rounded" required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full p-3 bg-gray-800 rounded" required />
          <textarea rows="5" placeholder="Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full p-3 bg-gray-800 rounded" required></textarea>
          <button type="submit" className="bg-gold text-black px-6 py-3 rounded w-full font-semibold">Send Message</button>
        </motion.form>
      </div>
    </>
  );
}

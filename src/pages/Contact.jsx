// src/pages/Contact.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent!');
    setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Helmet><title>Contact - ZENO MEDIA</title></Helmet>
      
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-black">
        <div className="absolute inset-0 bg-[url('/contact-hero.jpg')] bg-cover bg-center opacity-60"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl text-white"
          >
            CONTACT
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                I'm a paragraph. Click here to add your own text and edit me. It's easy. 
                Just click "Edit Text" or double click me to add your own content and make 
                changes to the font. Feel free to drag and drop me anywhere you like on your 
                page. I'm a great place for you to tell a story and let your users know a 
                little more about you.
              </p>

              <h3 className="text-2xl text-black mb-6">Let's Talk</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>123-456-7890</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>info@zenomedia.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>Los Angeles, CA</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">First name *</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={e => setForm({...form, firstName: e.target.value})}
                      className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Last name *</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={e => setForm({...form, lastName: e.target.value})}
                      className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Message</label>
                  <textarea
                    rows="4"
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white px-10 py-3 hover:bg-gray-800 transition"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Home() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <>
      <Helmet>
        <title>ZENO MEDIA - Video Editor & Filmmaker</title>
      </Helmet>

      {/* Hero Section with Video */}
      <section className="relative h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-video.mp4"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Sound Toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition border border-white/20"
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.3em] text-white/80 mb-4"
          >
            VIDEO EDITOR · FILMMAKER
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-light text-white mb-8"
          >
            ZENO
            <br />
            MEDIA
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/portfolio" 
              className="group flex items-center space-x-2 text-white border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              <Play className="w-4 h-4" />
              <span>Showreel</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-white/30"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-black mb-4">ABOUT ME</h2>
            <p className="text-lg text-gray-600">Filmmaker. Director.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-600 text-center"
          >
            <p>
              I'm a paragraph. Click here to add your own text and edit me. It's easy. 
              Just click "Edit Text" or double click me to add your own content and make 
              changes to the font. Feel free to drag and drop me anywhere you like on your 
              page. I'm a great place for you to tell a story and let your users know a 
              little more about you.
            </p>
            <p>
              This is a great space to write long text about your company and your services. 
              You can use this space to go into a little more detail about your company. 
              Talk about your team and what services you provide. Tell your visitors the 
              story of how you came up with the idea for your business and what makes you 
              different from your competitors. Make your company stand out and show your 
              visitors who you are.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/about" 
              className="inline-block border-2 border-black text-black px-10 py-3 hover:bg-black hover:text-white transition"
            >
              Download CV
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

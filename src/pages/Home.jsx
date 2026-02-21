// src/pages/Home.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Volume2, VolumeX } from 'lucide-react';

export default function Home() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
        <meta name="description" content="Professional video editing and filmmaking services." />
        <meta property="og:title" content="ZENO MEDIA" />
        <meta property="og:description" content="Professional video editing and filmmaking services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zenomedia.com" />
        <meta property="og:image" content="https://zenomedia.com/og-image.jpg" />
      </Helmet>

      <div className="relative h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/background-video.mp4"
        />
        <div className="absolute inset-0 bg-black/40" />
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
        >
          {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>

        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-7xl md:text-9xl gold-text font-bold mb-4">ZENO MEDIA</h1>
          <p className="text-xl md:text-2xl text-gray-300">Video Editor · Filmmaker</p>
        </motion.div>
      </div>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl gold-text mb-6">Welcome</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Crafting cinematic stories through the lens and editing suite.
          </p>
        </motion.div>
      </section>
    </>
  );
}

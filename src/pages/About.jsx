// src/pages/About.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <Helmet><title>About - ZENO MEDIA</title></Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl gold-text text-center mb-8">About</motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto text-gray-300 space-y-4">
          <p>ZENO MEDIA is a video editing and filmmaking studio dedicated to bringing cinematic stories to life. With years of experience in the industry, we craft visually stunning narratives that captivate audiences.</p>
          <p>Our passion for storytelling drives us to push creative boundaries, using the latest technology and techniques. Whether it's a commercial, music video, or short film, we treat every project with the utmost care and artistry.</p>
        </motion.div>
      </div>
    </>
  );
}

// src/pages/About.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <Helmet><title>About - ZENO MEDIA</title></Helmet>
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-black">
        <div className="absolute inset-0 bg-[url('/about-hero.jpg')] bg-cover bg-center opacity-60"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl text-white mb-4">ABOUT ME</h1>
            <p className="text-xl text-white/80">Filmmaker. Director.</p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-gray-700"
          >
            <p className="text-lg leading-relaxed">
              I'm a paragraph. Click here to add your own text and edit me. It's easy. 
              Just click "Edit Text" or double click me to add your own content and make 
              changes to the font. Feel free to drag and drop me anywhere you like on your 
              page. I'm a great place for you to tell a story and let your users know a 
              little more about you.
            </p>
            
            <p className="text-lg leading-relaxed">
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
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/cv.pdf" 
              target="_blank"
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

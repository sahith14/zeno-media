// src/pages/Portfolio.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import VideoModal from '../components/VideoModal';
import { Helmet } from 'react-helmet-async';
import { useFirestore } from '../hooks/useFirestore';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function Portfolio() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: videos, loading, error } = useFirestore('portfolio', {
    orderBy: { field: 'createdAt', direction: 'desc' }
  });

  const openModal = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-20">Error: {error}</div>;

  return (
    <>
      <Helmet><title>Portfolio - ZENO MEDIA</title></Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl gold-text text-center mb-12">Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="cursor-pointer group"
              onClick={() => openModal(video)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-video">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white text-lg">Play</span>
                </div>
              </div>
              <h3 className="mt-2 text-xl gold-text">{video.title}</h3>
              <p className="text-gray-400">{video.description?.substring(0, 100)}...</p>
              <p className="text-gray-500 text-sm">Views: {video.views || 0}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <VideoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} video={selectedVideo} />
    </>
  );
}

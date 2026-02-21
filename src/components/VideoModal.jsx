// src/components/VideoModal.jsx
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

export default function VideoModal({ isOpen, onClose, video }) {
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    if (isOpen && video) {
      const functions = getFunctions();
      const getVideoUrl = httpsCallable(functions, 'getVideoUrl');
      getVideoUrl({ videoId: video.id }).then(result => {
        setVideoSrc(result.data.url);
      });
    }
  }, [isOpen, video]);

  if (!video) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog static as={motion.div} open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full"
          >
            <button onClick={onClose} className="absolute top-2 right-2 z-10 text-white bg-black/50 rounded-full p-1">
              <X className="w-6 h-6" />
            </button>
            {videoSrc ? (
              <video src={videoSrc} controls autoPlay className="w-full h-auto" />
            ) : (
              <div className="w-full h-64 flex items-center justify-center">Loading...</div>
            )}
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

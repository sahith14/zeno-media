// src/pages/Downloads.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Downloads() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPurchases = async () => {
      const q = query(collection(db, 'purchases'), where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      const purchasesData = await Promise.all(snapshot.docs.map(async (purchaseDoc) => {
        const data = purchaseDoc.data();
        const productDoc = await getDoc(doc(db, 'products', data.productId));
        const product = productDoc.data();
        return { id: purchaseDoc.id, ...data, product };
      }));
      setPurchases(purchasesData);
      setLoading(false);
    };
    fetchPurchases();
  }, [currentUser]);

  const handleDownload = async (purchaseId) => {
    const functions = getFunctions();
    const getDownloadUrl = httpsCallable(functions, 'getDownloadUrl');
    try {
      const result = await getDownloadUrl({ purchaseId });
      const { url } = result.data;
      window.open(url, '_blank');
    } catch (error) {
      toast.error('Failed to generate download link');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      <Helmet><title>My Downloads - ZENO MEDIA</title></Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl gold-text text-center mb-12">My Downloads</h1>
        {purchases.length === 0 ? (
          <p className="text-center text-gray-400">No purchases yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purchases.map(purchase => (
              <motion.div key={purchase.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900 p-6 rounded-lg">
                <h2 className="text-2xl gold-text">{purchase.product.name}</h2>
                <p className="text-gray-400 mb-4">{purchase.product.description}</p>
                <button onClick={() => handleDownload(purchase.id)} className="bg-gold text-black px-4 py-2 rounded">
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

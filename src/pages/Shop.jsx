// src/pages/Shop.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Shop() {
  const [products, setProducts] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleStripeCheckout = async (product) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const functions = getFunctions();
    const createCheckout = httpsCallable(functions, 'createStripeCheckoutSession');
    try {
      const result = await createCheckout({ productId: product.id, userId: currentUser.uid });
      const { sessionId } = result.data;
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error('Checkout failed');
    }
  };

  const handleRazorpayCheckout = async (product) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = async () => {
      const functions = getFunctions();
      const createRazorpayOrder = httpsCallable(functions, 'createRazorpayOrder');
      try {
        const result = await createRazorpayOrder({ productId: product.id, userId: currentUser.uid });
        const order = result.data;
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'ZENO MEDIA',
          description: product.name,
          order_id: order.id,
          handler: function (response) {
            toast.success('Payment successful! Check your email.');
          },
          prefill: {
            email: currentUser.email,
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        toast.error('Razorpay order creation failed');
      }
    };
    document.body.appendChild(script);
  };

  return (
    <>
      <Helmet><title>Shop - ZENO MEDIA</title></Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl gold-text text-center mb-12">Digital Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const isOnSale = product.salePrice && product.salePrice < product.price;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gold/20"
              >
                <div className="relative">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                  {isOnSale && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded">
                      {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl gold-text mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {isOnSale ? (
                        <>
                          <span className="text-2xl font-bold text-gold">£{product.salePrice}</span>
                          <span className="ml-2 text-sm line-through text-gray-500">£{product.price}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-gold">£{product.price}</span>
                      )}
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleStripeCheckout(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Stripe
                      </button>
                      <button
                        onClick={() => handleRazorpayCheckout(product)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                      >
                        Razorpay
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}

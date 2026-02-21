// src/pages/Shop.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Filter, ChevronDown } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([20, 690]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Helmet><title>Shop - ZENO MEDIA</title></Helmet>
      
      {/* Header */}
      <section className="pt-32 pb-12 px-4 bg-black/55">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-white/70">
              <span className="text-white">Home</span> &gt; All Products
            </div>
            <div className="text-sm text-gray-600">
              {products.length} products
            </div>
          </div>

          <div className="flex justify-between items-center border-b border-[#3e3324] pb-6">
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center space-x-2 text-white text-3xl"
            >
              <Filter className="w-6 h-6" />
              <span>Browse by</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white/80">Sort by:</span>
              <button className="flex items-center space-x-1 text-white font-medium text-3xl">
                <span>Recommended</span>
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 px-4 bg-black/55">
        <div className="container mx-auto">
          <div className="flex gap-10">
            {/* Filter Sidebar */}
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-64 flex-shrink-0"
              >
                <div className="border-t border-[#3e3324] pt-6">
                  <h3 className="font-medium mb-4">Filter by</h3>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="text-sm text-white/80 mb-3">Price</h4
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{priceRange[0]}</span>
                      <span className="text-sm">-</span>
                      <span className="text-sm">{priceRange[1]}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      className="w-full mt-2"
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    />
                  </div>

                  {/* Color */}
                  <div className="mb-6">
                    <h4 className="text-sm text-white/80 mb-3">Color</h4
                    <div className="space-y-2">
                      {['Black', 'White', 'Red', 'Blue'].map(color => (
                        <label key={color} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div className="mb-6">
                    <h4 className="text-sm text-white/80 mb-3">Size</h4>
                    <div className="space-y-2">
                      {['Small', 'Medium', 'Large'].map(size => (
                        <label key={size} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-square bg-white/90 mb-4 overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {product.bestSeller && (
                        <span className="absolute top-4 left-4 bg-black/55 text-xs px-2 py-1">Best Seller</span>
                      )}
                      {product.sale && (
                        <span className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1">Sale</span>
                      )}
                      {product.new && (
                        <span className="absolute top-4 right-4 bg-black text-white text-xs px-2 py-1">New</span>
                      )}
                    </div>
                    <h3 className="text-sm text-white/80 mb-1">{product.name}</h3>
                    <p className="text-3xl font-medium text-white">
                    <p className="text-lg font-medium">
                      £{product.salePrice || product.price}
                      {product.salePrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">£{product.price}</span>
                      )}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

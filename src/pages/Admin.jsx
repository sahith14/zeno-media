// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import { db, storage } from '../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchProducts();
  }, []);

  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, 'portfolio'));
    setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Project upload
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnailFile || !videoFile) return toast.error('Select files');
    try {
      const thumbnailRef = ref(storage, `thumbnails/${Date.now()}_${thumbnailFile.name}`);
      await uploadBytes(thumbnailRef, thumbnailFile);
      const thumbnailUrl = await getDownloadURL(thumbnailRef);

      const functions = getFunctions();
      const generateR2UploadUrl = httpsCallable(functions, 'generateR2UploadUrl');
      const result = await generateR2UploadUrl({ fileName: videoFile.name, fileType: videoFile.type });
      const { url, key } = result.data;

      await fetch(url, {
        method: 'PUT',
        body: videoFile,
        headers: { 'Content-Type': videoFile.type },
      });

      await addDoc(collection(db, 'portfolio'), {
        title: newProject.title,
        description: newProject.description,
        thumbnailUrl,
        r2Key: key,
        views: 0,
        createdAt: new Date(),
      });
      toast.success('Project added');
      setNewProject({ title: '', description: '' });
      setThumbnailFile(null);
      setVideoFile(null);
      fetchProjects();
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  // Product upload
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', salePrice: '' });
  const [productImage, setProductImage] = useState(null);
  const [digitalFile, setDigitalFile] = useState(null);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productImage || !digitalFile) return toast.error('Select files');
    try {
      const imageRef = ref(storage, `product-images/${Date.now()}_${productImage.name}`);
      await uploadBytes(imageRef, productImage);
      const imageUrl = await getDownloadURL(imageRef);

      const fileRef = ref(storage, `digital/${Date.now()}_${digitalFile.name}`);
      await uploadBytes(fileRef, digitalFile);
      const filePath = fileRef.fullPath;

      await addDoc(collection(db, 'products'), {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        salePrice: newProduct.salePrice ? parseFloat(newProduct.salePrice) : null,
        imageUrl,
        filePath,
        createdAt: new Date(),
      });
      toast.success('Product added');
      setNewProduct({ name: '', description: '', price: '', salePrice: '' });
      setProductImage(null);
      setDigitalFile(null);
      fetchProducts();
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  const deleteProject = async (id) => {
    if (confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'portfolio', id));
      toast.success('Deleted');
      fetchProjects();
    }
  };

  const deleteProduct = async (id) => {
    if (confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Deleted');
      fetchProducts();
    }
  };

  return (
    <>
      <Helmet><title>Admin - ZENO MEDIA</title></Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl gold-text text-center mb-8">Admin Dashboard</h1>
        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={() => setActiveTab('projects')} className={`px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-gold text-black' : 'bg-gray-800'}`}>Projects</button>
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-gold text-black' : 'bg-gray-800'}`}>Products</button>
        </div>

        {activeTab === 'projects' && (
          <div>
            <form onSubmit={handleProjectSubmit} className="bg-gray-900 p-6 rounded-lg mb-8">
              <h2 className="text-2xl gold-text mb-4">Add New Project</h2>
              <input type="text" placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full p-2 mb-4 bg-gray-800 rounded" required />
              <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full p-2 mb-4 bg-gray-800 rounded" required />
              <div className="mb-4">
                <label className="block mb-1">Thumbnail Image</label>
                <input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files[0])} required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Video File</label>
                <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} required />
              </div>
              <button type="submit" className="bg-gold text-black px-6 py-2 rounded">Upload Project</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(project => (
                <div key={project.id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                  <div>
                    <h3 className="text-xl gold-text">{project.title}</h3>
                    <p className="text-gray-400">Views: {project.views}</p>
                  </div>
                  <button onClick={() => deleteProject(project.id)} className="text-red-500">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <form onSubmit={handleProductSubmit} className="bg-gray-900 p-6 rounded-lg mb-8">
              <h2 className="text-2xl gold-text mb-4">Add New Product</h2>
              <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-2 mb-4 bg-gray-800 rounded" required />
              <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-2 mb-4 bg-gray-800 rounded" required />
              <input type="number" placeholder="Price (£)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full p-2 mb-4 bg-gray-800 rounded" required />
              <input type="number" placeholder="Sale Price (optional)" value={newProduct.salePrice} onChange={e => setNewProduct({...newProduct, salePrice: e.target.value})} className="w-full p-2 mb-4 bg-gray-800 rounded" />
              <div className="mb-4">
                <label className="block mb-1">Product Image</label>
                <input type="file" accept="image/*" onChange={e => setProductImage(e.target.files[0])} required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Digital File</label>
                <input type="file" onChange={e => setDigitalFile(e.target.files[0])} required />
              </div>
              <button type="submit" className="bg-gold text-black px-6 py-2 rounded">Upload Product</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                  <div>
                    <h3 className="text-xl gold-text">{product.name}</h3>
                    <p className="text-gray-400">Price: £{product.price}</p>
                  </div>
                  <button onClick={() => deleteProduct(product.id)} className="text-red-500">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

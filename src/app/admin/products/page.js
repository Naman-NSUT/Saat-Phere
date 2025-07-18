'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  async function handleAddProduct(e) {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', image);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      imageUrl = data.url;
      setUploading(false);
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameRef.current.value,
        price: priceRef.current.value,
        category: categoryRef.current.value,
        images: imageUrl ? [imageUrl] : [],
      })
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
    }
  }

  async function handleDelete(id) {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p._id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Manage Products</h1>
      <form onSubmit={handleAddProduct} className="mb-8 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div className="flex gap-4">
          <input ref={nameRef} placeholder="Name" className="border p-2 rounded flex-1" required />
          <input ref={priceRef} placeholder="Price" type="number" className="border p-2 rounded w-32" required />
          <select ref={categoryRef} className="border p-2 rounded w-48" required>
            <option value="">Select Category</option>
            <option>Readymade suit</option>
            <option>Co-ord sets</option>
            <option>Lehenga’s</option>
            <option>Gown</option>
            <option>Indo western</option>
            <option>Draping saare</option>
            <option>Rental bridal lehnga</option>
            <option>Rental non- bridal lehnga</option>
          </select>
        </div>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="border p-2 rounded" />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors" disabled={uploading}>{uploading ? 'Uploading...' : 'Add Product'}</button>
      </form>
      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : (
        <motion.ul className="divide-y" initial="hidden" animate="visible" variants={{visible: {transition: {staggerChildren: 0.08}}, hidden: {}}}>
          {products.map((p, i) => (
            <motion.li
              key={p._id}
              variants={{hidden: {opacity: 0, y: 30}, visible: {opacity: 1, y: 0}}}
              className="flex items-center py-4 gap-4"
            >
              <img src={p.images?.[0] || '/images/placeholder.jpg'} alt={p.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-bold text-gray-900">{p.name}</div>
                <div className="text-sm text-gray-700">₹{p.price}</div>
                <div className="text-sm text-gray-500">{p.category}</div>
              </div>
              <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline ml-4">Delete</button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
} 
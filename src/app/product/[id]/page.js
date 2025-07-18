'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);
  if (loading) return <div className="text-center py-12 text-gray-500">Loading product...</div>;
  if (!product) return <div className="text-center py-12 text-gray-500">Product not found.</div>;
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">
      <img src={product.images?.[0] || '/images/placeholder.jpg'} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow" />
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="text-lg text-blue-600 font-bold mb-4">₹{product.price}</div>
        <p className="mb-4 text-gray-700">{product.description}</p>
        <div className="mb-4">
          <span className="font-semibold">Category:</span> {product.category}
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors">Add to Cart</button>
      </div>
    </div>
  );
} 
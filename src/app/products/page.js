'use client';
import { useEffect, useState } from 'react';
import ProductGrid from '@/components/ProductGrid';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display font-bold mb-8 text-gray-900">All Products</h1>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading products...</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
} 
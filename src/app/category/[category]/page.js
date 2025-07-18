'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.filter(p => p.category === category));
        setLoading(false);
      });
  }, [category]);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display font-bold mb-8 text-gray-900">{category}</h1>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading products...</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
} 
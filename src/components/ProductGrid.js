import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (!products?.length) return <div className="text-center text-gray-500 py-12">No products found.</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
} 
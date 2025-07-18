import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(109,40,217,0.15)" }}
      transition={{ duration: 0.4, type: "spring" }}
      className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
    >
      <Link href={`/product/${product._id}`}>
        <img
          src={product.images?.[0] || '/images/placeholder.jpg'}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
          <p className="text-sm text-gray-700 mb-2 line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-yellow-600 text-lg">₹{product.price}</span>
          <Link href={`/product/${product._id}`} className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 px-3 py-1 rounded-full text-sm font-semibold font-bold transition-colors shadow">View</Link>
        </div>
      </div>
    </motion.div>
  );
} 
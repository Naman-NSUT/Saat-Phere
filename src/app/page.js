'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import '@/app/globals.css';

const categories = [
  { name: "Readymade suit", image: "/images/readymade-suit.jpg" },
  { name: "Co-ord sets", image: "/images/coord-sets.jpg" },
  { name: "Lehenga’s", image: "/images/lehenga.jpg" },
  { name: "Gown", image: "/images/gown.jpg" },
  { name: "Indo western", image: "/images/indo-western.jpg" },
  { name: "Draping saare", image: "/images/saare.jpg" },
  { name: "Rental bridal lehnga", image: "/images/rental-bridal.jpg" },
  { name: "Rental non- bridal lehnga", image: "/images/rental-non-bridal.jpg" },
];

export default function Home() {
  return (
    <div>
      <section className="bg-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">Welcome to Saat Phere</h1>
        <p className="text-lg text-gray-700 mb-6">Discover elegance, tradition, and style for every occasion.</p>
        <Link href="/products" className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 px-6 py-3 rounded-full font-bold transition-colors shadow">
          Shop Now
        </Link>
      </section>
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-display font-bold mb-8 text-gray-900">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, type: "spring" }}
            >
              <Link href={`/category/${encodeURIComponent(cat.name)}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden group">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 text-center font-semibold text-gray-700">{cat.name}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}


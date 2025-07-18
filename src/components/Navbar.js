'use client';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  "Readymade suit",
  "Co-ord sets",
  "Lehenga’s",
  "Gown",
  "Indo western",
  "Draping saare",
  "Rental bridal lehnga",
  "Rental non- bridal lehnga"
];

export default function Navbar() {
  return (
    <nav className="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-2">
          {/* Replace /logo.png with your logo file */}
          <Image src="/logo.png" alt="Saat Phere Logo" width={40} height={40} className="rounded-full bg-white" />
          <span className="text-2xl font-display font-bold tracking-wide text-yellow-400">Saat Phere</span>
        </Link>
        <div className="hidden md:flex space-x-4">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className="hover:text-yellow-300 font-semibold"
            >
              {cat}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="hover:text-yellow-300">Cart</Link>
          <Link href="/account" className="hover:text-yellow-300">Account</Link>
        </div>
      </div>
    </nav>
  );
} 
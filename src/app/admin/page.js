'use client';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display font-bold mb-8 text-gray-900">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/admin/products" className="bg-blue-600 text-white rounded-lg shadow p-8 flex flex-col items-center hover:bg-blue-700 transition-colors">
          <span className="text-2xl font-bold mb-2">Manage Products</span>
          <span>View, add, edit, or delete products</span>
        </Link>
        <Link href="/admin/orders" className="bg-blue-600 text-white rounded-lg shadow p-8 flex flex-col items-center hover:bg-blue-700 transition-colors">
          <span className="text-2xl font-bold mb-2">Manage Orders</span>
          <span>View and update orders</span>
        </Link>
      </div>
    </div>
  );
} 
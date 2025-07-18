'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (!isLoaded) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display font-bold mb-8 text-gray-900">My Account</h1>
      <div className="mb-8 bg-white rounded-lg shadow p-6 flex items-center gap-4">
        {user?.imageUrl && (
          <img src={user.imageUrl} alt={user.fullName} className="w-16 h-16 rounded-full border" />
        )}
        <div>
          <div>Name: <span className="font-semibold">{user?.fullName}</span></div>
          <div>Email: <span className="font-semibold">{user?.primaryEmailAddress?.emailAddress}</span></div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Order History</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">No orders found.</div>
        ) : (
          <motion.ul className="divide-y" initial="hidden" animate="visible" variants={{visible: {transition: {staggerChildren: 0.08}}, hidden: {}}}>
            {orders.map(order => (
              <motion.li
                key={order._id}
                variants={{hidden: {opacity: 0, y: 30}, visible: {opacity: 1, y: 0}}}
                className="py-4"
              >
                <div className="font-bold">Order #{order._id}</div>
                <div>Status: <span className="font-semibold">{order.status}</span></div>
                <div>Total: <span className="font-semibold">₹{order.total}</span></div>
                <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
} 
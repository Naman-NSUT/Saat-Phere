'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminOrdersPage() {
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

  async function updateStatus(id, status) {
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Manage Orders</h1>
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
              <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)} className="mt-2 border p-2 rounded">
                <option>pending</option>
                <option>processing</option>
                <option>shipped</option>
                <option>delivered</option>
                <option>cancelled</option>
              </select>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
} 
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    setCart(stored ? JSON.parse(stored) : []);
    setLoading(false);
  }, []);

  function updateQuantity(index, delta) {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  function removeItem(index) {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading cart...</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display font-bold mb-8 text-gray-900">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <div>
          <ul className="divide-y">
            {cart.map((item, i) => (
              <li key={i} className="flex items-center py-4 gap-4">
                <img src={item.image || '/images/placeholder.jpg'} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-700">₹{item.price} x {item.quantity}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(i, -1)} className="px-2 py-1 bg-gray-100 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(i, 1)} className="px-2 py-1 bg-gray-100 rounded">+</button>
                  </div>
                </div>
                <button onClick={() => removeItem(i)} className="text-red-500 hover:underline ml-4">Remove</button>
              </li>
            ))}
          </ul>
          <div className="text-right mt-8">
            <div className="text-xl font-bold mb-4">Total: ₹{total}</div>
            <Link href="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
} 
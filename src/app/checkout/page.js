'use client';
import { useState } from 'react';

export default function CheckoutPage() {
  const [address, setAddress] = useState({ name: '', street: '', city: '', state: '', zip: '', country: '' });
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // In a real app, send address and cart to backend
    setSubmitted(true);
    localStorage.removeItem('cart');
  }

  if (submitted) return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Thank you for your order!</h1>
      <p className="text-lg">We have received your order and will process it soon.</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display font-bold mb-8 text-gray-900">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={address.name} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" required />
          <input name="street" value={address.street} onChange={handleChange} placeholder="Street Address" className="border p-2 rounded" required />
          <input name="city" value={address.city} onChange={handleChange} placeholder="City" className="border p-2 rounded" required />
          <input name="state" value={address.state} onChange={handleChange} placeholder="State" className="border p-2 rounded" required />
          <input name="zip" value={address.zip} onChange={handleChange} placeholder="ZIP Code" className="border p-2 rounded" required />
          <input name="country" value={address.country} onChange={handleChange} placeholder="Country" className="border p-2 rounded" required />
        </div>
        <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors">Place Order</button>
      </form>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ul className="divide-y mb-4">
          {cart.map((item, i) => (
            <li key={i} className="flex justify-between py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="text-right font-bold text-lg">Total: ₹{total}</div>
      </div>
    </div>
  );
} 
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String],
  category: String,
  stock: { type: Number, default: 0 },
  variants: [{ name: String, value: String }],
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema); 
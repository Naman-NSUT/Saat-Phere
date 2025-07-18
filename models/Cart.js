const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema); 
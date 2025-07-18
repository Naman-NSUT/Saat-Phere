const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    }
  ],
  total: Number,
  status: { type: String, default: 'pending' },
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema); 
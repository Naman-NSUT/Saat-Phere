const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
}, { timestamps: true });

module.exports = mongoose.models.Address || mongoose.model('Address', AddressSchema); 
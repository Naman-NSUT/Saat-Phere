const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
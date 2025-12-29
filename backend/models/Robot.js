// Change Log: Moved from monorepo. Updated to JS. No changes this update.

const mongoose = require('mongoose');

const robotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Robot', robotSchema);
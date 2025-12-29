// Change Log: 
// - Initial creation: Added Part model similar to Robot, with fields for name, description, price, image, compatibleRobots (array of strings for compatibility), and seller ref. This expands the marketplace to include robot parts.

const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  compatibleRobots: [{ type: String }], // e.g., ['RobotModelA', 'RobotModelB']
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Part', partSchema);
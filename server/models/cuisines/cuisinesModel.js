const mongoose = require('mongoose');

const cuisinesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  region: { type: String, required: false },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Cuisines', cuisinesSchema);

const mongoose = require('mongoose');

const allergiesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Allergies', allergiesSchema);

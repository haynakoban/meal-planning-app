const mongoose = require('mongoose');

const cookingTimeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  time: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('cooking_times', cookingTimeSchema);

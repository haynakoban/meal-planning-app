const mongoose = require('mongoose');

const mealsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  recipe_id: { type: Array, ref: 'Recipes', required: true },
  name: { type: String, required: true },
  description: { type: String, required: false, default: null },
  day: { type: String, required: true },
  meal_time: { type: String, required: true },
  weight: { type: String, required: true },
  image: { type: Array, ref: 'Uploads', required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Meals', mealsSchema);

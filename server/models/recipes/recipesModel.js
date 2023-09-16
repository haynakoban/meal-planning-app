const mongoose = require('mongoose');

const ingredients = {
  type: Array,
  ref: 'Ingredients',
  required: true,
  ingredients_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredients',
    required: true,
  },
  measurement: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: false },
};

const user_id = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Users',
  required: true,
};

const image = {
  type: mongoose.Schema.Types.Mixed,
  ref: 'Uploads',
  required: false,
  default: null,
};

const recipesSchema = new mongoose.Schema({
  user_id,
  name: { type: String, required: true },
  description: { type: String, required: true },
  procedure: { type: Array, required: true },
  meal_types: { type: Array, ref: 'Meal_Types', required: true },
  preferences: { type: Array, ref: 'Preferences', required: false },
  cuisines: { type: Array, ref: 'Cuisines', required: false },
  cooking_time: { type: Number, required: true },
  ingredients,
  image,
  privacy: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Recipes', recipesSchema);

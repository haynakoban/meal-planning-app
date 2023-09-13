const mongoose = require('mongoose');

const ingredientsObj = {
  ingredients_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredients',
    required: true,
  },
  measurement: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
};

const recipesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  procedure: {
    type: Array,
    required: true,
  },
  type: {
    type: Array,
    ref: 'Meal_Types',
    required: true,
  },
  ingredients: {
    type: Array,
    ref: 'Ingredients',
    ingredientsObj,
    required: true,
  },
  preferences: {
    type: Array,
    ref: 'Preferences',
    required: false,
  },
  cuisines: {
    type: Array,
    ref: 'Cuisines',
    required: false,
  },
  cooking_time: { type: Number, required: false },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Uploads',
    required: false,
  },
  privacy: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Recipes', recipesSchema);

const mongoose = require('mongoose');

const ingredients = {
  type: Array,
  ref: 'Ingredients',
  required: false,
  ingredients_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredients',
    required: false,
  },
  measurement: { type: String, required: false },
  amount: { type: String, required: false },
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

const meal_types = [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal_Types',
    required: false,
  },
];

const preferences = [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preferences',
    required: false,
  },
];

const cuisines = [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuisines',
    required: false,
  },
];

const feedbacks = [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedbacks',
    required: false,
  },
];

const recipesSchema = new mongoose.Schema({
  user_id,
  name: { type: String, required: true },
  description: { type: String, required: true },
  procedure: { type: Array, required: true },
  image,
  meal_types,
  preferences,
  cuisines,
  cooking_time: {
    type: Number,
    required: true,
  },
  feedbacks,
  ingredients,
  privacy: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Recipes', recipesSchema);

const mongoose = require('mongoose');

const ingredientsObj = {
  ingredients_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredients',
    required: true,
  },
  measurement: { type: String, required: true },
  ammount: { type: String, required: true },
  description: { type: String, required: true },
};

const recipesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  procedure: { type: String, required: true },
  type: { type: Array, required: true },
  ingredients: { type: Array, ingredientsObj },
  preference: { type: Array, ref: 'Preferences', required: false },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Uploads',
    required: false,
  },
  privacy: { type: Boolean, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Recipes', recipesSchema);

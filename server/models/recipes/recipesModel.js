const mongoose = require('mongoose');

const ingredientsObj = {
  ingredients_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredients',
    required: true,
  },
  measurement: {
    type: String,
    required: true,
  },
  ammount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
};

const recipesSchema = new mongoose.Schema({
  ingredients: {
    type: Array,
    ingredientsObj,
  },
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
    type: String,
    required: true,
  },
  preference: {
    type: Array,
    ref: 'Preferences',
    required: false,
  },
  diet: {
    type: Array,
    ref: 'Diets',
    required: false,
  },
  image: {
    type: Array,
    ref: 'Uploads',
    required: false,
  },
  privacy: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model('Recipes', recipesSchema);

const mongoose = require('mongoose');

const facts = {
  calories: { type: Number, required: false },
  fat: { type: Number, required: false },
  carbohydrates: { type: Number, required: false },
  fiber: { type: Number, required: false },
  protein: { type: Number, required: false },
  sugar: { type: Number, required: false },
  sodium: { type: Number, required: false },
};

const ingredientsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: false },
  nutrition_facts: facts,
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Ingredients', ingredientsSchema);

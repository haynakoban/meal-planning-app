const mongoose = require('mongoose');

const user_id = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Users',
  required: true,
};

const timeSchema = {
  type: String,
  required: true,
  enum: ['breakfast', 'snacks', 'lunch', 'dinner'],
};

const image = {
  type: mongoose.Schema.Types.Mixed,
  ref: 'Uploads',
  required: false,
  default: null,
};

const mealsSchema = new mongoose.Schema({
  user_id,
  image,
  name: { type: String, required: true },
  description: { type: String, required: false, default: null },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipes',
      required: true,
    },
  ],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  time: timeSchema,
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Meals', mealsSchema);

const mongoose = require('mongoose');

const meals_info = [
  {
    meal_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meal_Types',
      required: true,
    },
    recipe_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Recipes', required: true },
    ],
  },
];

const user_id = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Users',
  required: true,
};

const privacySchema = {
  type: String,
  required: true,
  enum: ['public', 'followers', 'private'],
};

const daySchema = {
  type: String,
  required: true,
  enum: [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ],
};

const mealsSchema = new mongoose.Schema({
  user_id,
  meals_info,
  privacy: privacySchema,
  name: { type: String, required: true },
  description: { type: String, required: false, default: null },
  day: daySchema,
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Meals', mealsSchema);

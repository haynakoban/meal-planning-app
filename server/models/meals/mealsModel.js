const mongoose = require('mongoose');

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
  privacy: privacySchema,
  name: { type: String, required: true },
  description: { type: String, required: false, default: null },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipes',
      required: true,
    },
  ],
  day: daySchema,
  time: timeSchema,
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Meals', mealsSchema);

const mongoose = require('mongoose');

const feedbacksSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  // Reference to either a Recipe or a Meal
  foodItem: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'foodItemType',
    required: true,
  },
  // Type of the referenced food item (Recipe or Meal)
  foodItemType: {
    type: String,
    enum: ['Recipe', 'Meal'],
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
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

module.exports = mongoose.model('Feedbacks', feedbacksSchema);

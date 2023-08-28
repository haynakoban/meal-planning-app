const mongoose = require('mongoose');

const feedbacksSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  recipe_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipes',
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  ratings: {
    type: Number,
    required: false,
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

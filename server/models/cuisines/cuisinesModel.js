const mongoose = require('mongoose');

const cuisinesSchema = new mongoose.Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admins',
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

module.exports = mongoose.model('Cuisines', cuisinesSchema);

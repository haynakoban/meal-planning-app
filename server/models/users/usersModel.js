const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: false,
  },
  provider_id: {
    type: String,
    required: false,
  },
  favorites: {
    type: Array,
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

module.exports = mongoose.model('Users', usersSchema);

const mongoose = require('mongoose');

const public_metrics = {
  followers: { type: Array, ref: 'Users', required: false },
  following: { type: Array, ref: 'Users', required: false },
};
const image = {
  type: mongoose.Schema.Types.Mixed,
  ref: 'Uploads',
  default: null,
};

const registrationMethod = {
  type: String,
  enum: ['google', 'facebook', 'instagram', 'email'],
  required: true,
};

const usersSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  bio: { type: String, required: false },
  password: { type: String, required: false },
  favorites: { type: Array, required: false },
  public_metrics,
  image,
  registrationMethod,
  filtered: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Users', usersSchema);

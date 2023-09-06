const mongoose = require('mongoose');

const public_metrics = {
  followers_count: { type: Number, required: false, default: 0 },
  following_count: { type: Number, required: false, default: 0 },
  following: { type: Array, ref: 'Users', required: false },
};

const usersSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  bio: { type: String, required: false },
  password: { type: String, required: false },
  provider: { type: String, required: false },
  provider_id: { type: String, required: false },
  favorites: { type: Array, required: false },
  public_metrics,
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Users', usersSchema);

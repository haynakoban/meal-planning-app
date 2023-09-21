const mongoose = require('mongoose');

const DB_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/meal-planning-app';

// mongoose connection
const db = mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connection established');
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = db;

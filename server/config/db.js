const mongoose = require('mongoose');

const DB_URL =
  process.env.MONGO_URL ||
  'mongodb+srv://mialupin52:QdS5w4K1Qoy55Pg0@mealapp.nnr1srs.mongodb.net/?retryWrites=true&w=majority';

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

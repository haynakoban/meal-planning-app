const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

require('./config/db');

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/cuisines', require('./routes/cuisinesRoute'));
app.use('/api/feedbacks', require('./routes/feedbacksRoute'));
app.use('/api/ingredients', require('./routes/ingredientsRoute'));
app.use('/api/meals', require('./routes/mealsRoute'));
app.use('/api/preferences', require('./routes/preferencesRoute'));
app.use('/api/recipes', require('./routes/recipesRoute'));
app.use('/api/users', require('./routes/usersRoute'));

http.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

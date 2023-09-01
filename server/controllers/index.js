const usersController = require('./users/usersController');
const recipesController = require('./recipes/recipesController');
const feedbacksController = require('./feedbacks/feedbacksController');
const ingredientsController = require('./ingredients/ingredientsController');
const preferencesController = require('./preferences/preferencesController');
const mealsController = require('./meals/mealsController');
const cuisinesController = require('./cuisines/cuisinesController');

module.exports = {
  usersController,
  recipesController,
  feedbacksController,
  ingredientsController,
  preferencesController,
  mealsController,
  cuisinesController,
};

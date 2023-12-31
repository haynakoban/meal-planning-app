const cuisinesController = require('./cuisines/cuisinesController');
const feedbacksController = require('./feedbacks/feedbacksController');
const ingredientsController = require('./ingredients/ingredientsController');
const mealsController = require('./meals/mealsController');
const preferencesController = require('./preferences/preferencesController');
const recipesController = require('./recipes/recipesController');
const usersController = require('./users/usersController');
const adminController = require('./admin/adminController');

module.exports = {
  cuisinesController,
  feedbacksController,
  ingredientsController,
  mealsController,
  preferencesController,
  recipesController,
  usersController,
  adminController,
};

const express = require('express');
const router = express.Router();
const { MealTypes } = require('../models');
const { mealsController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  bulkMealsDataMiddleware,
  mealDataMiddleware,
} = require('../middlewares');

// get method - get the list of meals
router
  .route('/')
  .get(mealsController.list)
  .post(mealDataMiddleware, mealsController.create);

// post method - create multiple meal types
router.route('/bulk').post(bulkMealsDataMiddleware, mealsController.bulkMeals);

// get method - get the paginated list of meals
router.route('/list').get(mealsController.paginatedList);

// get method - get the list of meal types
router.route('/types').get(mealsController.listMealTypes);

// post method - create multiple meal types
router
  .route('/types/bulk')
  .post(
    checkBulkUniquenessMiddleware(MealTypes),
    mealsController.bulkMealTypes
  );

// get method - get single meal
router.route('/:id').get(mealsController.show);

module.exports = router;

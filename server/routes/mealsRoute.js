const express = require('express');
const router = express.Router();
const { MealTypes } = require('../models');
const { mealsController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  bulkMealsDataMiddleware,
} = require('../middlewares');
const { upload } = require('../config/conn');

// get method - get the list of meals
router.route('/').get(mealsController.list).post(mealsController.create);
// upload.single('image'),
// post method - create multiple meal types
router.route('/bulk').post(bulkMealsDataMiddleware, mealsController.bulkMeals);

// get method - get the paginated list of meals
router.route('/list').get(mealsController.paginatedList);

// get method - get the list of meal types
router.route('/types').get(mealsController.listMealTypes);

// get method - get the list of meal types
router.route('/types/list').get(mealsController.paginatedMealTypes);

// post method - create multiple meal types
router
  .route('/types/bulk')
  .post(
    checkBulkUniquenessMiddleware(MealTypes),
    mealsController.bulkMealTypes
  );

// get method - get single meal
router.route('/:id').get(mealsController.show);
router.route('/personal/:id').get(mealsController.personalMeals);

module.exports = router;

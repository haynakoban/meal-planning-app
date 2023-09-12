const express = require('express');
const router = express.Router();
const { Meals, MealTypes } = require('../models');
const { mealsController } = require('../controllers');
const { checkBulkUniquenessMiddleware } = require('../middlewares');

// get method - get the list of meal types
router.route('/types').get(mealsController.list);

// post method - create multiple meal types
router
  .route('/types/bulk')
  .post(
    checkBulkUniquenessMiddleware(MealTypes),
    mealsController.bulkMealTypes
  );

module.exports = router;

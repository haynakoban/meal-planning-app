const express = require('express');
const router = express.Router();
const { MealTypes } = require('../models');
const { mealsController } = require('../controllers');
const { checkBulkUniquenessMiddleware } = require('../middlewares');

// post method - create multiple meal types
router
  .route('/types/bulk')
  .post(
    checkBulkUniquenessMiddleware(MealTypes),
    mealsController.bulkMealTypes
  );

module.exports = router;

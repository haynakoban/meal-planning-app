const express = require('express');
const router = express.Router();
const { CookingTimes } = require('../models');
const { cookingTimeController } = require('../controllers');
const { checkBulkUniquenessMiddleware } = require('../middlewares');

// get method - get the list of cooking times
router.route('/times').get(cookingTimeController.list);

// post method - create multiple cooking times
router
  .route('/times/bulk')
  .post(
    checkBulkUniquenessMiddleware(CookingTimes),
    cookingTimeController.bulkCookingTimes
  );

module.exports = router;

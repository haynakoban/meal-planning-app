const express = require('express');
const router = express.Router();
const { Cuisines } = require('../models');
const { cuisinesController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
} = require('../middlewares');

// post method - create multiple cuisines
router
  .route('/bulk')
  .post(
    checkBulkUniquenessMiddleware(Cuisines),
    cuisinesController.bulkCuisines
  );

// post method - create new cuisine
router
  .route('/')
  .post(checkSingleUniquenessMiddleware(Cuisines), cuisinesController.create);

module.exports = router;

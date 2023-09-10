const express = require('express');
const router = express.Router();
const { Cuisines } = require('../models');
const { cuisinesController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
} = require('../middlewares');

// get method - get the list of cuisines
// post method - create new cuisine
router
  .route('/')
  .get(cuisinesController.list)
  .post(checkSingleUniquenessMiddleware(Cuisines), cuisinesController.create);

// post method - create multiple cuisines
router
  .route('/bulk')
  .post(
    checkBulkUniquenessMiddleware(Cuisines),
    cuisinesController.bulkCuisines
  );

// get method - get the paginated list of cuisines
router.route('/list').get(cuisinesController.paginatedList);

// get method - get single cuisine
router.route('/:id').get(cuisinesController.show);

module.exports = router;

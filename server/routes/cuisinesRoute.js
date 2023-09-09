const express = require('express');
const router = express.Router();
const { Cuisines } = require('../models');
const { cuisinesController } = require('../controllers');
const { checkUniquenessMiddleware } = require('../middlewares');

// post method - create multiple cuisines
router
  .route('/bulk')
  .post(checkUniquenessMiddleware(Cuisines), cuisinesController.bulkCuisines);

// post method - create new cuisine
router.route('/').post(cuisinesController.create);

module.exports = router;

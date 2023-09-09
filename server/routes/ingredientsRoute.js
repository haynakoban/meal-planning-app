const express = require('express');
const router = express.Router();
const { Ingredients } = require('../models');
const { ingredientsController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
} = require('../middlewares');

// post method - create multiple ingredients
router
  .route('/bulk')
  .post(
    checkBulkUniquenessMiddleware(Ingredients),
    ingredientsController.bulkIngredients
  );

// post method - create new ingredient
router
  .route('/')
  .post(
    checkSingleUniquenessMiddleware(Ingredients),
    ingredientsController.create
  );
module.exports = router;

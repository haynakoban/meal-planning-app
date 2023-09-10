const express = require('express');
const router = express.Router();
const { Ingredients } = require('../models');
const { ingredientsController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
} = require('../middlewares');

// get method - get the list of ingredients
// post method - create new ingredient
router
  .route('/')
  .get(ingredientsController.list)
  .post(
    checkSingleUniquenessMiddleware(Ingredients),
    ingredientsController.create
  );

// post method - create multiple ingredients
router
  .route('/bulk')
  .post(
    checkBulkUniquenessMiddleware(Ingredients),
    ingredientsController.bulkIngredients
  );

// get method - get the paginated list of ingredients
router.route('/list').get(ingredientsController.paginatedList);

// get method - get single ingredient
router.route('/:id').get(ingredientsController.show);

module.exports = router;

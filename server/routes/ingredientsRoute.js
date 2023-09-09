const express = require('express');
const router = express.Router();
const { Ingredients } = require('../models');
const { ingredientsController } = require('../controllers');
const { checkUniquenessMiddleware } = require('../middlewares');

// post method - create multiple ingredients
router
  .route('/bulk')
  .post(
    checkUniquenessMiddleware(Ingredients),
    ingredientsController.bulkIngredients
  );

module.exports = router;

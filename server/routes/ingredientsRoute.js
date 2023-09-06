const express = require('express');
const router = express.Router();
const { ingredientsController } = require('../controllers');

// post method - create multiple ingredients
router.route('/bulk').post(ingredientsController.bulkIngredients);

module.exports = router;

const express = require('express');
const router = express.Router();
const { Allergies } = require('../models');
const { allergiesController } = require('../controllers');
const { checkBulkUniquenessMiddleware } = require('../middlewares');

// get method - get the list of allergies
router
  .route('/')
  .get(allergiesController.list)
  .delete(allergiesController.destroy);

// post method - create multiple allergies
router
  .route('/bulk')
  .post(
    checkBulkUniquenessMiddleware(Allergies),
    allergiesController.bulkAllergies
  );

module.exports = router;

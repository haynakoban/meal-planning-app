const express = require('express');
const router = express.Router();
const { Preferences } = require('../models');
const { preferencesController } = require('../controllers');
const { checkBulkUniquenessMiddleware } = require('../middlewares');

// get method - get the list of preferences
router.route('/').get(preferencesController.list);

// post method - create multiple preferences
router
  .route('/bulk')
  .post(
    checkBulkUniquenessMiddleware(Preferences),
    preferencesController.bulkPreferences
  );

module.exports = router;

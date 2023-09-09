const express = require('express');
const router = express.Router();
const { cuisinesController } = require('../controllers');

// post method - create multiple cuisines
router.route('/bulk').post(cuisinesController.bulkCuisines);

// post method - create new cuisine
router.route('/').post(cuisinesController.create);

module.exports = router;

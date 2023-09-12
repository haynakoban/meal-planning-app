const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const { usersController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
} = require('../middlewares');

// post method - create new user
router
  .route('/')
  .post(
    checkSingleUniquenessMiddleware(Users, 'email'),
    usersController.create
  );

// post method - create multiple user
router
  .route('/bulk')
  .post(
    checkBulkUniquenessMiddleware(Users, 'email'),
    usersController.bulkUsers
  );

module.exports = router;

const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const { usersController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
} = require('../middlewares');

// get method - get all users
// post method - create new user
router
  .route('/')
  .get(usersController.list)
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

// get method - get the paginated list of users
router.route('/list').get(usersController.paginatedList);

// post method - log the user
router.route('/auth/login').post(usersController.login);

// get method - get filters data
// patch method - update filtered field
router
  .route('/auth/filters')
  .get(usersController.filters)
  .patch(usersController.modify);

// get method - get single user
router.route('/:id').get(usersController.show);

module.exports = router;

const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

// post method - create new user
router.route('/').post(usersController.createUser);

module.exports = router;

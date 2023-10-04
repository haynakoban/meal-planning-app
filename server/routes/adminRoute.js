const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers');

const auth = require('../middlewares/auth_admin_cookie');

router.route('/').post(auth, adminController.create);

router
  .route('/auth')
  .get(auth, adminController.isAdminLoggedIn)
  .post(auth, adminController.adminLogin);

router.route('/validation').get(auth, adminController.adminLogout);

module.exports = router;

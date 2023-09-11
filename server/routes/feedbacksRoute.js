const express = require('express');
const router = express.Router();
const { Feedbacks } = require('../models');
const { feedbacksController } = require('../controllers');
const {
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
} = require('../middlewares');

// get method - get the list of feedbacks
// post method - create new feedback
router
  .route('/')
  .get(feedbacksController.list)
  .post(checkSingleUniquenessMiddleware(Feedbacks), feedbacksController.create);

// post method - create multiple feedbacks
router
  .route('/bulk')
  .post(
    checkBulkUniquenessMiddleware(Feedbacks),
    feedbacksController.bulkFeedbacks
  );

// get method - get the paginated list of feedbacks
router.route('/list').get(feedbacksController.paginatedList);

// get method - get single feedback
router.route('/:id').get(feedbacksController.show);

module.exports = router;

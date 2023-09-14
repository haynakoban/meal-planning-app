const express = require('express');
const router = express.Router();
const { feedbacksController } = require('../controllers');
const {
  bulkFeedbacksDataMiddleware,
  feebackDataMiddleware,
} = require('../middlewares');

// get method - get the list of feedbacks
// post method - create new feedback
router
  .route('/')
  .get(feedbacksController.list)
  .post(feebackDataMiddleware, feedbacksController.create);

// post method - create multiple feedbacks
router
  .route('/bulk')
  .post(bulkFeedbacksDataMiddleware, feedbacksController.bulkFeedbacks);

// get method - get the paginated list of feedbacks
router.route('/list').get(feedbacksController.paginatedList);

// get method - get single feedback
router.route('/:id').get(feedbacksController.show);

module.exports = router;

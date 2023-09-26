const { Feedbacks, Recipes, Meals, Users } = require('../../models');

// bulk feedbacks
const bulkFeedbacks = async (req, res, next) => {
  try {
    const result = await Feedbacks.insertMany(req.uniqueData);

    return res.status(201).json({
      message: `${result.length} items inserted successfully`,
      status: 'record created',
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error occurred while creating the items',
      status: 'error occurred',
      data: [],
    });
  }
};

// create new feedback
const create = async (req, res, next) => {
  try {
    const result = await Feedbacks.create(req.uniqueData);

    if (result?.foodItemType === 'Recipes') {
      await Recipes.updateOne(
        { _id: result?.foodItem },
        { $push: { feedbacks: result?._id } }
      );
    } else {
      await Meals.updateOne(
        { _id: result?.foodItem },
        { $push: { feedbacks: result?._id } }
      );
    }
    const user = await Users.findOne({ _id: result.user_id }).select(
      'username fullname'
    );

    const feedback = result.toObject();

    feedback.user_id = {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
    };

    return res.status(201).json({
      message: `An item inserted successfully`,
      status: 'record created',
      data: feedback,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error occurred while creating the item',
      status: 'error occurred',
      data: {},
    });
  }
};

// update feedback
const update = async (req, res, next) => {
  const { id, user_id } = req.params;
  const { rating, comment } = req.body;

  try {
    // Query the database to find the feedback by its unique ID
    const feedback = await Feedbacks.findOne({ foodItem: id, user_id });

    if (!feedback) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    feedback.comment = comment;
    feedback.rating = rating;
    feedback.updatedAt = new Date();
    await feedback.save();

    // Return the feedback data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: feedback,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error occurred while creating the item',
      status: 'error occurred',
      data: {},
    });
  }
};

// delete feedback
const deleteReview = async (req, res, next) => {
  const { id, user_id } = req.params;

  try {
    // Query the database to find the feedback by its unique ID
    const feedback = await Feedbacks.deleteOne({ foodItem: id, user_id });

    if (!feedback) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the feedback data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: feedback,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error occurred while creating the item',
      status: 'error occurred',
      data: {},
    });
  }
};

// get list of feedbacks
const list = async (req, res, next) => {
  try {
    const feedbacks = await Feedbacks.find().select(
      '_id user_id foodItem foodItemType comment rating'
    );

    // Return the paginated data along with pagination information
    res.json({
      message: `${feedbacks.length} items retrieved successfully`,
      status: 'success',
      data: feedbacks,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the paginated list of feedbacks
const paginatedList = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;

  try {
    // Query the database for feedbacks, skipping the appropriate number of documents based on the page
    const feedbacks = await Feedbacks.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select('_id user_id foodItem foodItemType comment rating');

    // Get the total count of feedbacks in the collection (for calculating total pages)
    const totalItems = await Feedbacks.countDocuments();

    // Calculate the total number of pages based on the total count and items per page
    const totalPages = Math.ceil(totalItems / perPage);

    // Return the paginated data along with pagination information
    res.json({
      message: `${feedbacks.length} items retrieved successfully`,
      status: 'success',
      currentPage: page,
      totalPages,
      data: feedbacks,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get single feedback
const show = async (req, res, next) => {
  const { id, user_id } = req.params;

  try {
    // Query the database to find the feedback by its unique ID
    const feedback = await Feedbacks.find({ foodItem: id, user_id });
    if (!feedback) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the feedback data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: feedback,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get single feedback
const showReviews = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the feedback by its unique ID
    const feedback = await Feedbacks.find({ foodItem: id })
      .populate({
        path: 'user_id',
        select: 'username fullname',
      })
      .select('-createAt -__v')
      .sort({ createdAt: -1 });

    if (!feedback) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the feedback data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: feedback,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

module.exports = {
  bulkFeedbacks,
  create,
  list,
  paginatedList,
  show,
  showReviews,
  update,
  deleteReview,
};

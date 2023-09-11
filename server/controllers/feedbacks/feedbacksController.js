const { Feedbacks } = require('../../models');

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

// create new ingredient
const create = async (req, res, next) => {
  try {
    const result = await Feedbacks.create(req.uniqueData);

    return res.status(201).json({
      message: `An item inserted successfully`,
      status: 'record created',
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error occurred while creating the item',
      status: 'error occurred',
      data: {},
    });
  }
};

// get list of ingredients
const list = async (req, res, next) => {
  try {
    const feedbacks = await Feedbacks.find().select(
      '_id user_id foodItem foodItemType comment rating'
    );

    // Return the paginated data along with pagination information
    res.json({
      message: 'Items retrieved successfully',
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
      message: 'Items retrieved successfully',
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

// get single ingredient
const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the ingredient by its unique ID
    const feedback = await Feedbacks.findOne({ _id: id });

    if (!feedback) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the ingredient data
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
};

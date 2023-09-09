const { Cuisines } = require('../../models');

// bulk cuisines
const bulkCuisines = async (req, res, next) => {
  try {
    const result = await Cuisines.insertMany(req.uniqueData);

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

// create new cuisine
const create = async (req, res, next) => {
  try {
    const result = await Cuisines.create(req.uniqueData);

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

// get the list of cuisines
const list = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;

  try {
    // Query the database for cuisines, skipping the appropriate number of documents based on the page
    const cuisines = await Cuisines.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Get the total count of cuisines in the collection (for calculating total pages)
    const totalItems = await Cuisines.countDocuments();

    // Calculate the total number of pages based on the total count and items per page
    const totalPages = Math.ceil(totalItems / perPage);

    // Return the paginated data along with pagination information
    res.json({
      message: 'Items retrieved successfully',
      status: 'success',
      currentPage: page,
      totalPages,
      data: cuisines,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get single cuisine
const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the cuisine by its unique ID
    const cuisine = await Cuisines.findOne({ _id: id });

    if (!cuisine) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the cuisine data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: cuisine,
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
  bulkCuisines,
  create,
  list,
  show,
};

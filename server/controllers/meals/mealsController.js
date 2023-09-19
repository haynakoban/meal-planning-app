const { Meals, MealTypes, Recipes } = require('../../models');

// bulk meal types
const bulkMealTypes = async (req, res, next) => {
  try {
    const result = await MealTypes.insertMany(req.uniqueData);

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

// bulk meals
const bulkMeals = async (req, res, next) => {
  try {
    const result = await Meals.insertMany(req.uniqueData);

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

// create new meal
const create = async (req, res, next) => {
  try {
    const result = await Meals.create(req.uniqueData);

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

// get the list of meals
const list = async (req, res, next) => {
  try {
    const meals = await Meals.find().select('-createdAt -updatedAt -__v');

    // Return the paginated data along with pagination information
    res.json({
      message: `${meals.length} items retrieved successfully`,
      status: 'success',
      data: meals,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the list of meal types
const listMealTypes = async (req, res, next) => {
  try {
    const mealtypes = await MealTypes.find().select('_id name');

    // Return the paginated data along with pagination information
    res.json({
      message: `${mealtypes.length} items retrieved successfully`,
      status: 'success',
      data: mealtypes,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the paginated list of meals
const paginatedList = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;

  try {
    // Query the database for meals, skipping the appropriate number of documents based on the page
    const meals = await Meals.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select('-createdAt -updatedAt -__v');

    // Get the total count of meals in the collection (for calculating total pages)
    const totalItems = await Meals.countDocuments();

    // Calculate the total number of pages based on the total count and items per page
    const totalPages = Math.ceil(totalItems / perPage);

    // Return the paginated data along with pagination information
    res.json({
      message: `${meals.length} items retrieved successfully`,
      status: 'success',
      currentPage: page,
      totalPages,
      data: meals,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the paginated list of meals
const paginatedMealTypes = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;

  // Get the total count of recipes in the collection (for calculating total pages)
  const totalItems = await Recipes.countDocuments();

  // Calculate the total number of pages based on the total count and items per page
  const totalPages = Math.ceil(totalItems / perPage);

  try {
    if (req.query.title === 'new recipes' || !req.query.title) {
      const recipes = await Recipes.find()
        .sort({ updatedAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate({ path: 'user_id', select: 'fullname username' })
        .populate({ path: 'feedbacks', select: 'comment rating foodItemType' })
        .select('-createAt -__v');

      // Return the paginated data along with pagination information
      res.json({
        message: `${recipes.length} items retrieved successfully`,
        status: 'success',
        currentPage: page,
        totalPages,
        data: recipes,
      });
    } else {
      const mealTypes = await MealTypes.findOne({
        name: req.query.title,
      }).select('_id');
      const recipes = await Recipes.find({
        meal_types: { $in: [mealTypes?._id] },
      })
        .sort({ updatedAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate({ path: 'user_id', select: 'fullname username' })
        .populate({ path: 'feedbacks', select: 'comment rating foodItemType' })
        .select('-createAt -__v');

      // Return the paginated data along with pagination information
      res.json({
        message: `${recipes.length} items retrieved successfully`,
        status: 'success',
        currentPage: page,
        totalPages,
        data: recipes,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get single meal
const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the meal by its unique ID
    const meal = await Meals.findOne({ _id: id });

    if (!meal) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the meal data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: meal,
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
  bulkMealTypes,
  bulkMeals,
  create,
  list,
  listMealTypes,
  paginatedList,
  paginatedMealTypes,
  show,
};

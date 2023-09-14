const { Recipes } = require('../../models');

// bulk meal types
const bulkRecipes = async (req, res, next) => {
  try {
    const result = await Recipes.insertMany(req.uniqueData);

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

// create new recipe
const create = async (req, res, next) => {
  try {
    let file_id = null;
    if (req.files) {
      file_id = req.files.id;
    }

    const result = await Recipes.create(req.body);
    result.image = file_id;
    await result.save();

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

// get the list of recipes
const list = async (req, res, next) => {
  try {
    const recipes = await Recipes.find().select();

    // Return the paginated data along with pagination information
    res.json({
      message: `${recipes.length} items retrieved successfully`,
      status: 'success',
      data: recipes,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the paginated list of recipes
const paginatedList = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;

  try {
    // Query the database for recipes, skipping the appropriate number of documents based on the page
    const recipes = await Recipes.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select('-createAt -__v');

    // Get the total count of recipes in the collection (for calculating total pages)
    const totalItems = await Recipes.countDocuments();

    // Calculate the total number of pages based on the total count and items per page
    const totalPages = Math.ceil(totalItems / perPage);

    // Return the paginated data along with pagination information
    res.json({
      message: `${recipes.length} items retrieved successfully`,
      status: 'success',
      currentPage: page,
      totalPages,
      data: recipes,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get single recipe
const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the recipe by its unique ID
    const recipe = await Recipes.findOne({ _id: id });

    if (!recipe) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the recipe data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: recipe,
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
  bulkRecipes,
  create,
  list,
  paginatedList,
  show,
};

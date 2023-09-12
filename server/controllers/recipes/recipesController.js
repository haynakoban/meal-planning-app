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

module.exports = {
  bulkRecipes,
  create,
  list,
};

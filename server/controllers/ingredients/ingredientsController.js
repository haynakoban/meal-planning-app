const { Ingredients } = require('../../models');

// bulk ingredients
const bulkIngredients = async (req, res, next) => {
  try {
    const result = await Ingredients.insertMany(req.uniqueData);

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
    const result = await Ingredients.create(req.uniqueData);

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

module.exports = {
  bulkIngredients,
  create,
};

const { Ingredients } = require('../../models');

// bulk ingredients
const bulkIngredients = async (req, res, next) => {
  try {
    const ingredients = req.body;

    if (!Array.isArray(ingredients)) {
      throw new Error('Request body must be an array of ingredients');
    }

    if (ingredients.length === 0) {
      throw new Error('No ingredients to insert');
    }

    const result = await Ingredients.insertMany(ingredients);

    return res.status(201).json({
      total: `${result.length + 1} ingredients inserted`,
      ingredients,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  bulkIngredients,
};

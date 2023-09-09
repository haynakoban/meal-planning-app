const { Ingredients } = require('../../models');
const { isNonEmptyArray, checkUniqueness } = require('../../lib');

// bulk ingredients
const bulkIngredients = async (req, res, next) => {
  try {
    const ingredients = req.body;

    if (!isNonEmptyArray(ingredients)) {
      return res.status(400).json({
        message: `The request must contain a non-empty array of data items for bulk creation`,
        status: 'error occurred',
        data: [],
      });
    }

    const uniqueData = await checkUniqueness(Ingredients, ingredients);

    // check if no items in the bulk request are unique.
    if (uniqueData.length === 0) {
      return res.status(400).json({
        message: `All items in the bulk request are not unique`,
        status: 'error occurred',
        data: [],
      });
    }

    const result = await Ingredients.insertMany(uniqueData);

    return res.status(201).json({
      message: `${result.length} ingredients inserted`,
      status: 'record created',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  bulkIngredients,
};

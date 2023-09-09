const { Ingredients } = require('../../models');

// bulk ingredients
const bulkIngredients = async (req, res, next) => {
  try {
    const result = await Ingredients.insertMany(req.uniqueData);

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

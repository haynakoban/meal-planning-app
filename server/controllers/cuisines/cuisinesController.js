const { Cuisines } = require('../../models');

// bulk cuisines
const bulkCuisines = async (req, res, next) => {
  try {
    const result = await Cuisines.insertMany(req.uniqueData);

    return res.status(201).json({
      message: `${result.length} cuisines inserted`,
      status: 'record created',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// create new cuisine
const create = async (req, res, next) => {
  try {
    const cuisines = req.body;

    if (!cuisines.name) {
      return res.status(400).json({
        error: 'Request body must be have a property of name (cuisine)',
      });
    }

    // if (cuisines.length === 0) {
    //   throw new Error('No cuisines to insert');
    // }

    // const result = await Cuisines.insertMany(cuisines);

    // return res.status(201).json({
    //   total: `${result.length + 1} cuisine inserted`,
    //   cuisines,
    // });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  bulkCuisines,
  create,
};

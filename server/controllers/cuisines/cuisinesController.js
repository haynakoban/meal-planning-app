const { Cuisines } = require('../../models');
const { checkUniqueness, isNonEmptyArray } = require('../../lib');

// bulk cuisines
const bulkCuisines = async (req, res, next) => {
  try {
    const cuisines = req.body;

    if (!isNonEmptyArray(cuisines)) {
      return res.status(400).json({
        message: `The request must contain a non-empty array of data items for bulk creation`,
        status: 'error occurred',
        data: [],
      });
    }

    const uniqueData = await checkUniqueness(Cuisines, cuisines);

    // check if no items in the bulk request are unique.
    if (uniqueData.length === 0) {
      return res.status(400).json({
        message: `All items in the bulk request are not unique`,
        status: 'error occurred',
        data: [],
      });
    }

    const result = await Cuisines.insertMany(uniqueData);

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

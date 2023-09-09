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

module.exports = {
  bulkCuisines,
  create,
};

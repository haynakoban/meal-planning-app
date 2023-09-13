const { isNonEmptyArray } = require('../lib');

const checkBulkUniquenessMiddleware =
  (model, property = 'name') =>
  async (req, res, next) => {
    const data = req.body;
    const uniqueData = [];

    if (!isNonEmptyArray(data)) {
      return res.status(400).json({
        message: `The request must contain a non-empty array of data items for bulk creation`,
        status: 'error occurred',
        data: [],
      });
    }

    for (const item of data) {
      const existingItem = await model.findOne({
        [property]: item[property],
      });

      if (!existingItem) {
        // if the item doesn't exist in the database,
        // consider it unique and add it to the list for insertion.
        uniqueData.push(item);
      }
    }

    // check if no items in the bulk request are unique.
    if (uniqueData.length === 0) {
      return res.status(400).json({
        message: `All items in the bulk request are not unique`,
        status: 'error occurred',
        data: [],
      });
    }

    req.uniqueData = uniqueData;
    next();
  };

const checkSingleUniquenessMiddleware =
  (model, property = 'name') =>
  async (req, res, next) => {
    const data = req.body;

    if (!data[property] || !data) {
      return res.status(400).json({
        message: `The request must contain a property name called '${property}'`,
        status: 'error occurred',
        data: {},
      });
    }

    const existingItem = await model.findOne({
      [property]: data[property],
    });

    if (existingItem) {
      return res.status(400).json({
        message: `Item is not unique`,
        status: 'error occurred',
        data: {},
      });
    }

    req.uniqueData = data;
    next();
  };

const bulkMealsDataMiddleware = async (req, res, next) => {
  const data = req.body;

  if (!isNonEmptyArray(data)) {
    return res.status(400).json({
      message: `The request must contain a non-empty array of data items for bulk creation`,
      status: 'error occurred',
      data: [],
    });
  }

  for (const item of data) {
    const { user_id, meals_info, privacy, name, day } = item;

    const canSave =
      [user_id, privacy, name, day].every(Boolean) && meals_info.length > 0;

    if (!canSave)
      return res.status(400).json({
        message: 'Required filled must contain value',
        status: 'error occurred',
        data: [],
      });
  }

  req.uniqueData = data;
  next();
};

const mealDataMiddleware = async (req, res, next) => {
  const data = req.body;

  const { user_id, meals_info, privacy, name, day } = data;

  const canSave =
    [user_id, privacy, name, day].every(Boolean) && meals_info.length > 0;

  if (!canSave)
    return res.status(400).json({
      message: 'Required filled must contain value',
      status: 'error occurred',
      data: [],
    });

  req.uniqueData = data;
  next();
};

module.exports = {
  bulkMealsDataMiddleware,
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
  mealDataMiddleware,
};

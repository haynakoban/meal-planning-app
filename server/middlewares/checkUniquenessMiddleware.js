const { isNonEmptyArray } = require('../lib');

const checkBulkUniquenessMiddleware = (model) => async (req, res, next) => {
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
      name: item.name,
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

const checkSingleUniquenessMiddleware = (model) => async (req, res, next) => {
  const data = req.body;

  if (!data.name || !data) {
    return res.status(400).json({
      message: `The request must contain a property name called 'name'`,
      status: 'error occurred',
      data: {},
    });
  }

  const existingItem = await model.findOne({
    name: data.name,
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

module.exports = {
  checkBulkUniquenessMiddleware,
  checkSingleUniquenessMiddleware,
};

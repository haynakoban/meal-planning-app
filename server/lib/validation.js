const checkUniqueness = async (model, data) => {
  const uniqueData = [];

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

  return uniqueData;
};

const isNonEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

module.exports = { checkUniqueness, isNonEmptyArray };

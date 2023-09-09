const isNonEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

module.exports = { isNonEmptyArray };

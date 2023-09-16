export const formatNumber = (number = 0) => {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    const kValue = number / 1000;
    return kValue.toFixed(1) + 'k';
  } else {
    const mValue = number / 1000000;
    return mValue.toFixed(1) + 'M';
  }
};

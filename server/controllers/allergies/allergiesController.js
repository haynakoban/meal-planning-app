const { Allergies } = require('../../models');

// bulk allergies
const bulkAllergies = async (req, res, next) => {
  try {
    const result = await Allergies.insertMany(req.uniqueData);

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

module.exports = {
  bulkAllergies,
};

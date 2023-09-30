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

// get the list of allergies
const list = async (req, res, next) => {
  try {
    const allergies = await Allergies.find();

    // Return the paginated data along with pagination information
    res.json({
      message: `${allergies.length} items retrieved successfully`,
      status: 'success',
      data: allergies,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// delete allergies
const destroy = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await Allergies.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: `${result.deletedCount} allergies deleted successfully.`,
        status: 'success',
        data: [],
      });
    } else {
      return res.status(404).json({
        message: `No allergies found with the provided IDs.`,
        status: 'error occurred',
        data: [],
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

module.exports = {
  bulkAllergies,
  list,
  destroy,
};

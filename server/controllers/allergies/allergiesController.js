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

// get single allergy
const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the allergy by its unique ID
    const allergy = await Allergies.findOne({ _id: id });

    if (!allergy) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the allergy data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: allergy,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { property } = req.body;

    if (!['name', 'description'].includes(property)) {
      return res.status(400).json({
        message: 'Invalid property provided',
        status: 'error occurred',
        data: {},
      });
    }

    const updateQuery = {};
    updateQuery[property] = req.body[property];

    const updatedItem = await Allergies.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({
        message: 'Allergy not found',
        status: 'error occurred',
        data: {},
      });
    }

    return res.status(200).json({
      message: 'Allergy updated successfully',
      status: 'success',
      data: updatedItem,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

module.exports = {
  bulkAllergies,
  list,
  destroy,
  show,
  update,
};

const { Preferences } = require('../../models');

// bulk preferences
const bulkPreferences = async (req, res, next) => {
  try {
    const result = await Preferences.insertMany(req.uniqueData);

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

// get the list of preferences
const list = async (req, res, next) => {
  try {
    const preferences = await Preferences.find();

    // Return the paginated data along with pagination information
    res.json({
      message: `${preferences.length} items retrieved successfully`,
      status: 'success',
      data: preferences,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// delete preferences
const destroy = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await Preferences.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: `${result.deletedCount} preferences deleted successfully.`,
        status: 'success',
        data: [],
      });
    } else {
      return res.status(404).json({
        message: `No preferences found with the provided IDs.`,
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

const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the preference by its unique ID
    const preference = await Preferences.findOne({ _id: id });

    if (!preference) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the preference data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: preference,
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

    const updatedItem = await Preferences.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({
        message: 'Preference not found',
        status: 'error occurred',
        data: {},
      });
    }

    return res.status(200).json({
      message: 'Preference updated successfully',
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

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(500).json({
        message: 'Name field is required',
        status: 'error occurred',
        data: {},
      });
    }

    const existingItem = await Preferences.find({
      name: { $regex: new RegExp(name, 'i') },
    });

    if (existingItem) {
      return res.status(200).json({
        err: `item already exist`,
        data: {},
      });
    }

    const result = await Preferences.create({
      name: name,
      description: req.body?.description,
    });

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
  bulkPreferences,
  list,
  create,
  destroy,
  show,
  update,
};

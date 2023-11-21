const { Ingredients } = require('../../models');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// bulk ingredients
const bulkIngredients = async (req, res, next) => {
  try {
    const result = await Ingredients.insertMany(req.uniqueData);

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

// create new ingredient
const create = async (req, res, next) => {
  try {
    const { name, admin_id, category } = req.body;

    const ingredient = await Ingredients.find({
      name: { $regex: new RegExp(name, 'i') },
      category: { $regex: new RegExp(category, 'i') },
    });

    if (ingredient.length > 0) {
      return res.json({
        err: `item already exist`,
        data: {},
      });
    }

    const result = await Ingredients.create({
      name: name,
      category: category,
      admin_id: new ObjectId(admin_id),
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

// get list of ingredients
const list = async (req, res, next) => {
  try {
    const ingredients = await Ingredients.find();

    // Return the paginated data along with pagination information
    res.json({
      message: `${ingredients.length} items retrieved successfully`,
      status: 'success',
      data: ingredients,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the paginated list of ingredients
const paginatedList = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;

  try {
    // Query the database for ingredients, skipping the appropriate number of documents based on the page
    const ingredients = await Ingredients.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select('_id name');

    // Get the total count of ingredients in the collection (for calculating total pages)
    const totalItems = await Ingredients.countDocuments();

    // Calculate the total number of pages based on the total count and items per page
    const totalPages = Math.ceil(totalItems / perPage);

    // Return the paginated data along with pagination information
    res.json({
      message: `${ingredients.length} items retrieved successfully`,
      status: 'success',
      currentPage: page,
      totalPages,
      data: ingredients,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get single ingredient
const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the ingredient by its unique ID
    const ingredient = await Ingredients.findOne({ _id: id });

    if (!ingredient) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the ingredient data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: ingredient,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// delete ingredients
const destroy = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await Ingredients.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: `${result.deletedCount} ingredients deleted successfully.`,
        status: 'success',
        data: [],
      });
    } else {
      return res.status(404).json({
        message: `No ingredients found with the provided IDs.`,
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

// update ingredients info
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { property } = req.body;

    if (!['name', 'category'].includes(property)) {
      return res.status(400).json({
        message: 'Invalid property provided',
        status: 'error occurred',
        data: {},
      });
    }

    const updateQuery = {};
    updateQuery[property] = req.body[property];

    const updatedItem = await Ingredients.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({
        message: 'Ingredient not found',
        status: 'error occurred',
        data: {},
      });
    }

    return res.status(200).json({
      message: 'Ingredient updated successfully',
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
  bulkIngredients,
  create,
  list,
  paginatedList,
  show,
  destroy,
  update,
};

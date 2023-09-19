const { Recipes, Feedbacks, Users, MealTypes } = require('../../models');

// bulk meal types
const bulkRecipes = async (req, res, next) => {
  try {
    const result = await Recipes.insertMany(req.uniqueData);

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

// create new recipe
const create = async (req, res, next) => {
  try {
    let file_id = null;
    if (req.files) {
      file_id = req.files.id;
    }

    const result = await Recipes.create(req.body);
    result.image = file_id;
    await result.save();

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

// get the list of recipes
const list = async (req, res, next) => {
  try {
    // const recipes = await Recipes.find().select();
    const recipes = await Recipes.find()
      .populate({ path: 'user_id', select: 'fullname username' })
      .populate({ path: 'feedbacks', select: 'comment rating foodItemType' })
      .select('-createAt -__v');

    // Return the paginated data along with pagination information
    res.json({
      message: `${recipes.length} items retrieved successfully`,
      status: 'success',
      data: recipes,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the paginated list of recipes
const paginatedList = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;

  try {
    const ids = req.query.ids || [];

    // Get the total count of recipes in the collection (for calculating total pages)
    const totalItems = await Recipes.countDocuments();

    // Calculate the total number of pages based on the total count and items per page
    const totalPages = Math.ceil(totalItems / perPage);

    if (ids.length === 0) {
      // Query the database for recipes, skipping the appropriate number of documents based on the page
      const recipes = await Recipes.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .select('-createAt -__v');

      // Return the paginated data along with pagination information
      res.json({
        message: `${recipes.length} items retrieved successfully`,
        status: 'success',
        currentPage: page,
        totalPages,
        data: recipes,
      });
    } else {
      // Query the database for recipes, skipping the appropriate number of documents based on the page
      const recipes = await Recipes.find({ _id: { $in: ids } })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate({ path: 'user_id', select: 'fullname username' })
        .populate({ path: 'feedbacks', select: 'comment rating foodItemType' })
        .select('-createAt -__v');

      // Return the paginated data along with pagination information
      res.json({
        message: `${recipes.length} items retrieved successfully`,
        status: 'success',
        currentPage: page,
        totalPages,
        data: recipes,
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

// get the paginated list of recipes based on meal types
const paginatedListMealTypes = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;
  let resourceLastModified = new Date();
  try {
    const clientLastModified = new Date(req.headers['if-modified-since']);
    if (clientLastModified >= resourceLastModified) {
      res.status(304).end();
    } else {
      // Get the total count of recipes in the collection (for calculating total pages)
      const totalItems = await Recipes.countDocuments();

      // Calculate the total number of pages based on the total count and items per page
      const totalPages = Math.ceil(totalItems / perPage);

      const recipe = await Recipes.find()
        .sort({ updatedAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate({ path: 'user_id', select: 'fullname username' })
        .populate({ path: 'feedbacks', select: 'comment rating foodItemType' })
        .select('-createAt -__v');

      const singleResult = recipe.map((recipe) => {
        const r = recipe;
        const feedbacks = recipe.feedbacks || [];
        const totalFeedbacks = feedbacks.length;
        const ratingsSum = feedbacks.reduce(
          (sum, feedback) => sum + (feedback.rating || 0),
          0
        );
        return {
          recipes: r,
          reviews: totalFeedbacks,
          ratings: ratingsSum / totalFeedbacks,
        };
      });

      const singleData = { title: 'recommended', data: singleResult };

      // get all the meal types
      const mealTypes = await MealTypes.find().select('_id name');

      const recipes = await Promise.all(
        mealTypes.map(async (mt) => {
          const data = await Recipes.find({ meal_types: { $in: [mt._id] } })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate({ path: 'user_id', select: 'fullname username' })
            .populate({
              path: 'feedbacks',
              select: 'comment rating foodItemType',
            })
            .select('-createAt -__v');

          const results = data.map((recipe) => {
            const r = recipe;
            const feedbacks = recipe.feedbacks || [];
            const totalFeedbacks = feedbacks.length;
            const ratingsSum = feedbacks.reduce(
              (sum, feedback) => sum + (feedback.rating || 0),
              0
            );
            return {
              recipes: r,
              reviews: totalFeedbacks,
              ratings: ratingsSum / totalFeedbacks,
            };
          });

          return { title: mt.name, data: results };
        })
      );

      recipes.unshift(singleData);

      // Return the paginated data along with pagination information
      res.json({
        message: `${recipes.length} items retrieved successfully`,
        status: 'success',
        currentPage: page,
        totalPages,
        data: recipes,
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

// get single recipe
const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the recipe by its unique ID
    const recipe = await Recipes.findOne({ _id: id })
      .populate({ path: 'user_id', select: 'fullname username' })
      .populate({ path: 'feedbacks', select: 'comment rating foodItemType' })
      .select('-createAt -__v');

    if (!recipe) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the recipe data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: recipe,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

module.exports = {
  bulkRecipes,
  create,
  list,
  paginatedList,
  paginatedListMealTypes,
  show,
};

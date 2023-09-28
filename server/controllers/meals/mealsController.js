const { Meals, MealTypes, Recipes } = require('../../models');
const dbUtility = require('../../config/connection');

// bulk meal types
const bulkMealTypes = async (req, res, next) => {
  try {
    const result = await MealTypes.insertMany(req.uniqueData);

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

// bulk meals
const bulkMeals = async (req, res, next) => {
  try {
    const result = await Meals.insertMany(req.uniqueData);

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

// create new meal
const create = async (req, res, next) => {
  try {
    const fileId = req?.file?.id || null;
    const mealData = {
      user_id: req.body?.user_id,
      name: req.body?.name,
      description: req.body?.description,
      image: fileId,
      privacy: req.body?.privacy,
      day: req.body?.day,
      time: req.body?.time,
      recipes: JSON.parse(req.body?.recipes),
    };

    const meal = await Meals.create(mealData);

    // Populate the recipes field separately
    const result = await Meals.findOne({ _id: meal?._id })
      .populate({ path: 'recipes' })
      .select('-createdAt -__v');

    const newResult = result.toObject();
    if (typeof newResult.image === 'object') {
      const imageBuffer = await dbUtility.fetchImageById(newResult.image);

      const base64Image = imageBuffer.toString('base64');
      const mimeType = 'image/jpg'; // Change this to match the actual image type
      const dataURI = `data:${mimeType};base64,${base64Image}`;

      newResult.image = dataURI;
    }

    return res.status(201).json({
      message: `An item inserted successfully`,
      status: 'record created',
      data: newResult,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error occurred while creating the item',
      status: 'error occurred',
      data: {},
    });
  }
};

// get the list of meals
const list = async (req, res, next) => {
  try {
    const meals = await Meals.find()
      .populate({ path: 'recipes' })
      .select('-createdAt -updatedAt -__v');

    // Return the paginated data along with pagination information
    res.json({
      message: `${meals.length} items retrieved successfully`,
      status: 'success',
      data: meals,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the list of meal types
const listMealTypes = async (req, res, next) => {
  try {
    const mealtypes = await MealTypes.find();

    // Return the paginated data along with pagination information
    res.json({
      message: `${mealtypes.length} items retrieved successfully`,
      status: 'success',
      data: mealtypes,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the paginated list of meals
const paginatedList = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;

  try {
    // Query the database for meals, skipping the appropriate number of documents based on the page
    const meals = await Meals.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select('-createdAt -updatedAt -__v');

    // Get the total count of meals in the collection (for calculating total pages)
    const totalItems = await Meals.countDocuments();

    // Calculate the total number of pages based on the total count and items per page
    const totalPages = Math.ceil(totalItems / perPage);

    // Return the paginated data along with pagination information
    res.json({
      message: `${meals.length} items retrieved successfully`,
      status: 'success',
      currentPage: page,
      totalPages,
      data: meals,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the paginated list of meals
const paginatedMealTypes = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 24;

  // Get the total count of recipes in the collection (for calculating total pages)
  const totalItems = await Recipes.countDocuments();

  // Calculate the total number of pages based on the total count and items per page
  const totalPages = Math.ceil(totalItems / perPage);

  try {
    if (req.query.title === 'new recipes' || !req.query.title) {
      const recipes = await Recipes.find()
        .sort({ updatedAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate({ path: 'user_id', select: 'fullname username' })
        .populate({ path: 'feedbacks', select: 'comment rating foodItemType' })
        .select('-createAt -__v');

      const results = await Promise.all(
        recipes.map(async (recipe) => {
          const r = recipe;

          const feedbacks = recipe.feedbacks || [];
          const totalFeedbacks = feedbacks.length;
          const ratingsSum = feedbacks.reduce(
            (sum, feedback) => sum + (feedback.rating || 0),
            0
          );

          if (typeof r.image === 'object') {
            const imageBuffer = await dbUtility.fetchImageById(r.image);

            const base64Image = imageBuffer.toString('base64');
            const mimeType = 'image/jpg'; // Change this to match the actual image type
            const dataURI = `data:${mimeType};base64,${base64Image}`;

            r.image = dataURI;
          }

          return {
            recipes: r,
            reviews: totalFeedbacks,
            ratings: ratingsSum / totalFeedbacks,
          };
        })
      );

      // Return the paginated data along with pagination information
      res.json({
        message: `${results.length} items retrieved successfully`,
        status: 'success',
        currentPage: page,
        totalPages,
        data: results,
      });

      // end here
    } else {
      const mealTypes = await MealTypes.findOne({
        name: req.query.title,
      }).select('_id');

      const recipes = await Recipes.find({
        meal_types: { $in: [mealTypes?._id] },
      })
        .sort({ updatedAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate({ path: 'user_id', select: 'fullname username' })
        .populate({ path: 'feedbacks', select: 'comment rating foodItemType' })
        .select('-createAt -__v');

      const results = await Promise.all(
        recipes.map(async (recipe) => {
          const r = recipe;

          const feedbacks = recipe.feedbacks || [];
          const totalFeedbacks = feedbacks.length;
          const ratingsSum = feedbacks.reduce(
            (sum, feedback) => sum + (feedback.rating || 0),
            0
          );

          if (typeof r.image === 'object') {
            const imageBuffer = await dbUtility.fetchImageById(r.image);

            const base64Image = imageBuffer.toString('base64');
            const mimeType = 'image/jpg'; // Change this to match the actual image type
            const dataURI = `data:${mimeType};base64,${base64Image}`;

            r.image = dataURI;
          }

          return {
            recipes: r,
            reviews: totalFeedbacks,
            ratings: ratingsSum / totalFeedbacks,
          };
        })
      );

      // Return the paginated data along with pagination information
      res.json({
        message: `${results.length} items retrieved successfully`,
        status: 'success',
        currentPage: page,
        totalPages,
        data: results,
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

// get single meal
const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the meal by its unique ID
    const meal = await Meals.findOne({ _id: id });

    if (!meal) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the meal data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: meal,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the personal list of meals
const personalMeals = async (req, res, next) => {
  const { id } = req.params;
  try {
    const meals = await Meals.find({ user_id: id })
      .sort({ updatedAt: -1 })
      .populate('recipes')
      .populate({ path: 'user_id', select: 'fullname username' })
      .select('-createdAt -__v');

    const results = await Promise.all(
      meals.map(async (meal) => {
        if (typeof meal.image === 'object') {
          const imageBuffer = await dbUtility.fetchImageById(meal.image);

          const base64Image = imageBuffer.toString('base64');
          const mimeType = 'image/jpg'; // Change this to match the actual image type
          const dataURI = `data:${mimeType};base64,${base64Image}`;

          return {
            ...meal.toObject(),
            image: dataURI,
          };
        }

        return meal;
      })
    );

    // populate recipes has empty array

    // Return the paginated data along with pagination information
    res.json({
      message: `${results.length} items retrieved successfully`,
      status: 'success',
      data: results,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the list of meals by day
const listByDay = async (req, res, next) => {
  try {
    const { day } = req.query;

    if (!day) {
      return res.status(200).json({
        message: 'Invalid Day',
        status: 'error occurred',
        data: [],
      });
    }

    const newDay = day?.toLowerCase();
    const meals = await Meals.find({ day: newDay })
      .sort({ updatedAt: -1 })
      .populate({ path: 'recipes' })
      .select('-createdAt -__v');

    const results = await Promise.all(
      meals.map(async (meal) => {
        const r = meal.toObject();

        if (typeof r.image === 'object') {
          const imageBuffer = await dbUtility.fetchImageById(r.image);

          const base64Image = imageBuffer.toString('base64');
          const mimeType = 'image/jpg';
          const dataURI = `data:${mimeType};base64,${base64Image}`;

          r.image = dataURI;
        }

        return {
          ...r,
        };
      })
    );

    // Return the paginated data along with pagination information
    res.json({
      message: `${results.length} items retrieved successfully`,
      status: 'success',
      data: results,
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
  bulkMealTypes,
  bulkMeals,
  create,
  list,
  listMealTypes,
  paginatedList,
  paginatedMealTypes,
  show,
  personalMeals,
  listByDay,
};

const { Meals, MealTypes, Recipes } = require('../../models');
const dbUtility = require('../../config/connection');
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const DB_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/meal-planning-app';
const conn = mongoose.createConnection(DB_URL);

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
      startDate: req.body?.startDate,
      endDate: req.body?.endDate,
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
      .populate({ path: 'user_id', select: 'fullname username' })
      .populate({ path: 'recipes' })
      .select('-updatedAt -__v');

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
      .select('-updatedAt -__v');

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
    const meal = await Meals.findOne({ _id: id })
      .populate('recipes')
      .populate('user_id')
      .select('-createdAt -__v');

    if (typeof meal.image === 'object') {
      const imageBuffer = await dbUtility.fetchImageById(meal.image);

      const base64Image = imageBuffer.toString('base64');
      const mimeType = 'image/jpg'; // Change this to match the actual image type
      const dataURI = `data:${mimeType};base64,${base64Image}`;

      // Return the meal data
      return res.json({
        message: 'Item retrieved successfully',
        status: 'success',
        data: {
          ...meal.toObject(),
          image: dataURI,
        },
      });
    }

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
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json({
        message: 'Invalid Id',
        status: 'error occurred',
        data: [],
      });
    }

    const meals = await Meals.find({ user_id: id })
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

// get the list of meals by day
const listByTime = async (req, res, next) => {
  try {
    const { time, user_id } = req.query;

    if (!time) {
      return res.status(200).json({
        message: 'Invalid Day',
        status: 'error occurred',
        data: [],
      });
    }

    const newTime = time?.toLowerCase();
    const meals = await Meals.find({ time: newTime, user_id })
      .sort({ endDate: -1 })
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

// delete meal
const deleteMeal = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the recipe by its unique ID
    const meal = await Meals.findByIdAndDelete(id);

    if (!meal) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    if (typeof meal.image === 'object') {
      await bucket.delete(new ObjectId(meal.image));
    }

    // Return the recipe data
    res.json({
      message: 'Item deleted successfully',
      status: 'success',
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// delete meals
const destroy = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await Meals.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: `${result.deletedCount} meals deleted successfully.`,
        status: 'success',
        data: [],
      });
    } else {
      return res.status(404).json({
        message: `No meals found with the provided IDs.`,
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

// delete meal types
const destroyMT = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await MealTypes.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: `${result.deletedCount} meal types deleted successfully.`,
        status: 'success',
        data: [],
      });
    } else {
      return res.status(404).json({
        message: `No meal types found with the provided IDs.`,
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

// update meal
const updateMeal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meal = await Meals.findById(id);

    if (meal) {
      const fileId = req?.file?.id || null;
      if (fileId != null) {
        const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
          bucketName: 'uploads',
        });

        if (typeof meal.image === 'object') {
          await bucket.delete(new ObjectId(meal.image));
        }

        const updatedMeal = await Meals.findByIdAndUpdate(
          id,
          {
            $set: {
              user_id: req.body?.user_id,
              name: req.body?.name,
              description: req.body?.description,
              time: req.body?.time,
              startDate: req.body?.startDate,
              endDate: req.body?.endDate,
              recipes: JSON.parse(req.body?.recipes),
            },
          },
          { new: true } // Return the updated document
        );

        const meals = await Meals.find({
          time: meal?.time,
          user_id: meal?.user_id,
        })
          .sort({ endDate: -1 })
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

        return res.status(201).json({
          message: `An item inserted successfully`,
          status: 'record created',
          data: results,
        });
      }

      const updatedMeal = await Meals.findByIdAndUpdate(
        id,
        {
          $set: {
            user_id: req.body?.user_id,
            name: req.body?.name,
            description: req.body?.description,
            time: req.body?.time,
            startDate: req.body?.startDate,
            endDate: req.body?.endDate,
            recipes: JSON.parse(req.body?.recipes),
          },
        },
        { new: true } // Return the updated document
      );

      const meals = await Meals.find({
        time: meal?.time,
        user_id: meal?.user_id,
      })
        .sort({ endDate: -1 })
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

      return res.status(201).json({
        message: `An item inserted successfully`,
        status: 'record created',
        data: results,
      });
    }

    return res.status(404).json({
      message: `Data not found`,
      status: 'not found',
      data: {},
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error occurred while creating the item',
      status: 'error occurred',
      data: {},
    });
  }
};

const showMT = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the mealtype by its unique ID
    const mealtype = await MealTypes.findOne({ _id: id });

    if (!mealtype) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the mealtype data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: mealtype,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

const updateMT = async (req, res, next) => {
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

    const updatedItem = await MealTypes.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({
        message: 'Mealtype not found',
        status: 'error occurred',
        data: {},
      });
    }

    return res.status(200).json({
      message: 'Mealtype updated successfully',
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
  bulkMealTypes,
  bulkMeals,
  create,
  destroy,
  destroyMT,
  list,
  listMealTypes,
  paginatedList,
  paginatedMealTypes,
  show,
  personalMeals,
  listByTime,
  deleteMeal,
  updateMeal,
  showMT,
  updateMT,
};

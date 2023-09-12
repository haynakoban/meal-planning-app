const { Users } = require('../../models');
const bcryptjs = require('bcryptjs');
const { generateUniqueUsername } = require('../../lib');

// bulk users
const bulkUsers = async (req, res, next) => {
  const updatedUsers = req.uniqueData.map((user) => {
    const hashPassword = bcryptjs.hashSync(user.password, 10); // hash the password for basic security
    return {
      ...user,
      password: hashPassword,
      username: generateUniqueUsername(user.fullname),
    };
  });

  try {
    const result = await Users.insertMany(updatedUsers);

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

// create new user
const create = async (req, res, next) => {
  try {
    const { fullname, email, password, registrationMethod, image } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [fullname, email, password, registrationMethod].every(
      Boolean
    );

    if (!canSave)
      return res.status(400).json({
        message: 'Required filled must contain value',
        status: 'error occurred',
        data: {},
      });

    // hash the password for basic security
    const hashPassword = await bcryptjs.hash(password, 10);
    // generate username
    const username = generateUniqueUsername(fullname);

    const user = await Users.create({
      fullname,
      email,
      username,
      password: hashPassword,
      registrationMethod,
      image,
    });

    if (!user)
      return res.json({
        message: 'Error occurred while creating the items',
        status: 'error occurred',
        data: {},
      });

    return res.status(201).json({
      message: `An item inserted successfully`,
      status: 'record created',
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

// get the list of users
const list = async (req, res, next) => {
  try {
    const users = await Users.find().select(
      '-password -createdAt -updatedAt -__v'
    );

    res.json({
      message: `${users.length} items retrieved successfully`,
      status: 'success',
      data: users,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get the paginated list of users
const paginatedList = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;

  try {
    // Query the database for users, skipping the appropriate number of documents based on the page
    const users = await Users.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select('-password -createdAt -updatedAt -__v');

    // Get the total count of users in the collection (for calculating total pages)
    const totalItems = await Users.countDocuments();

    // Calculate the total number of pages based on the total count and items per page
    const totalPages = Math.ceil(totalItems / perPage);

    // Return the paginated data along with pagination information
    res.json({
      message: `${users.length} items retrieved successfully`,
      status: 'success',
      currentPage: page,
      totalPages,
      data: users,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

// get single user
const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Query the database to find the user by its unique ID
    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the user data
    res.json({
      message: 'Item retrieved successfully',
      status: 'success',
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: [],
    });
  }
};

module.exports = { bulkUsers, create, list, paginatedList, show };

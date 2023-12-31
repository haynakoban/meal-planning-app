const {
  Cuisines,
  MealTypes,
  Preferences,
  Ingredients,
  Users,
} = require('../../models');
const bcryptjs = require('bcryptjs');
const { generateUniqueUsername } = require('../../lib');
const { transporter } = require('../../lib/mailer');

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

function generateRandomPassword(length) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

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

// delete users
const destroy = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await Users.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: `${result.deletedCount} users deleted successfully.`,
        status: 'success',
        data: [],
      });
    } else {
      return res.status(404).json({
        message: `No users found with the provided IDs.`,
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

// get the list of users
const list = async (req, res, next) => {
  try {
    const users = await Users.find().select('-password -updatedAt -__v');

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

// validate the user && log the user in
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if either username or email exists in the database
    const user = await Users.findOne({ $or: [{ username: email }, { email }] });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 'error occurred',
        data: {},
      });
    }

    const expiryTime = new Date(user.updatedAt.getTime() + 30 * 60 * 1000);
    const isPasswordExpired = new Date() > expiryTime;

    if (user.forgot_password == true) {
      if (isPasswordExpired) {
        return res.status(401).json({
          message: 'Authentication failed',
          status: 'error occurred',
          data: {},
        });
      } else {
        if (bcryptjs.compareSync(password, user.password)) {
          user.forgot_password = false;
          await user.save();
          return res.json({
            message: 'Authentication successful',
            status: 'success',
            data: user,
          });
        } else {
          return res.status(401).json({
            message: 'Authentication failed',
            status: 'error occurred',
            data: {},
          });
        }
      }
    } else {
      if (bcryptjs.compareSync(password, user.password)) {
        return res.json({
          message: 'Authentication successful',
          status: 'success',
          data: user,
        });
      } else {
        return res.status(401).json({
          message: 'Authentication failed',
          status: 'error occurred',
          data: {},
        });
      }
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

// get filters data
const filters = async (req, res, next) => {
  let resourceLastModified = new Date();
  try {
    const clientLastModified = new Date(req.headers['if-modified-since']);
    if (clientLastModified >= resourceLastModified) {
      res.status(304).end();
    } else {
      const cuisines = await Cuisines.find()
        .select('_id name')
        .sort({ name: 'asc' });
      const mealtypes = await MealTypes.find()
        .select('_id name')
        .sort({ name: 'asc' });
      const preferences = await Preferences.find()
        .select('_id name')
        .sort({ name: 'asc' });
      const allergies = await Ingredients.find()
        .select('_id name')
        .sort({ name: 'asc' });
      const ingredients = await Ingredients.find()
        .select('_id name category')
        .sort({
          name: 'asc',
        });

      const cookingTimes = [
        {
          _id: 5,
          name: 'Very Quick',
          time: '5 minutes',
        },
        {
          _id: 10,
          name: 'Quick',
          time: '10 minutes',
        },
        {
          _id: 20,
          name: 'Moderate',
          time: '20 minutes',
        },
        {
          _id: 30,
          name: 'Average',
          time: '30 minutes',
        },
        {
          _id: 60,
          name: 'Lengthy',
          time: '60 minutes (1 hour)',
        },
        {
          _id: 90,
          name: 'Long',
          time: '90 minutes (1 hour 30 minutes)',
        },
        {
          _id: 120,
          name: 'Longest',
          time: '120 minutes (2 hours)',
        },
      ];

      resourceLastModified = new Date();

      let filtersData = [
        {
          title: 'Ingredients',
          data: ingredients,
        },
        {
          title: 'MealTypes',
          data: mealtypes,
        },
        {
          title: 'Cuisines',
          data: cuisines,
        },
        {
          title: 'Preferences',
          data: preferences,
        },
        {
          title: 'CookingTimes',
          data: cookingTimes,
        },
        {
          title: 'Allergies',
          data: allergies,
        },
      ];

      // Return the paginated data along with pagination information
      res.json({
        message: `data filters retrieved successfully`,
        status: 'success',
        data: filtersData,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

// patch filter field
const modify = async (req, res, next) => {
  try {
    const { id, filtered } = req.body;

    if (id && filtered) {
      // Query the database to find the user by its unique ID
      const user = await Users.findByIdAndUpdate(
        id,
        { filtered: true },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Item not found',
          status: 'error occurred',
          data: {},
        });
      }

      // Return the user data
      res.json({
        message: 'User updated successfully',
        status: 'success',
        data: user,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

// delete favorite
const managaFavorite = async (req, res, next) => {
  try {
    const { id, itemId, type } = req.body;

    if (type === 'add') {
      await Users.updateOne(
        { _id: id },
        { $push: { favorites: new ObjectId(itemId) } }
      );
    } else {
      await Users.updateOne(
        { _id: id },
        { $pull: { favorites: new ObjectId(itemId) } }
      );
    }

    if (!itemId) {
      return res.status(404).json({
        message: 'Item not found',
        status: 'error occurred',
        data: {},
      });
    }

    // Return the user data
    res.json({
      message: 'User updated successfully',
      status: 'success',
      data: itemId,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

// follow the user
const followUser = async (req, res, next) => {
  try {
    const { my_id, user_id, type } = req.body;

    if (my_id && user_id && type) {
      if (type === 'follow') {
        await Users.findByIdAndUpdate(
          my_id,
          { $push: { 'public_metrics.following': user_id } },
          { new: true }
        );

        await Users.findByIdAndUpdate(
          user_id,
          { $push: { 'public_metrics.followers': my_id } },
          { new: true }
        );
      } else {
        await Users.findByIdAndUpdate(
          my_id,
          { $pull: { 'public_metrics.following': user_id } },
          { new: true }
        );

        await Users.findByIdAndUpdate(
          user_id,
          { $pull: { 'public_metrics.followers': my_id } },
          { new: true }
        );
      }

      res.json({
        message: 'User updated successfully',
        status: 'success',
        data: { my_id, user_id },
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

// update user info
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { property } = req.body;

    // Validate that the property is one of 'fullname', 'username', 'email', or 'password'
    if (!['fullname', 'username', 'email', 'password'].includes(property)) {
      return res.status(400).json({
        message: 'Invalid property provided',
        status: 'error occurred',
        data: {},
      });
    }

    const updateQuery = {};
    updateQuery[property] = req.body[property];

    // Check if the property being updated is 'password'
    if (property === 'password') {
      const saltRounds = 10;
      const newPassword = await bcryptjs.hash(req.body.password, saltRounds);
      updateQuery.password = newPassword;
    }

    const updatedUser = await Users.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
        status: 'error occurred',
        data: {},
      });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      status: 'success',
      data: updatedUser,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

// validate username or email
const validate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { property } = req.body;

    if (property === 'username' || property === 'email') {
      const existingUser = await Users.findOne({
        [property]: req.body[property],
      });

      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(200).json({
          message: `${property} already exists in the database`,
          status: 'invalid',
          data: {},
        });
      }
    }

    // If the property is unique, you can return a success status here
    return res.status(200).json({
      message: `${property} is unique`,
      status: 'success',
      data: {},
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

// validate password
const password = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    if (id && password) {
      const findUser = await Users.findOne({ _id: id });

      if (!findUser) {
        return res.status(404).json({
          message: 'User not found',
          status: 'invalid',
          data: {},
        });
      }

      const isMatch = await new Promise((resolve, reject) => {
        bcryptjs.compare(password, findUser.password, (err, isMatch) => {
          if (err) {
            reject(err);
          } else {
            resolve(isMatch);
          }
        });
      });

      if (isMatch) {
        return res.json({
          message: 'Password is valid',
          status: 'success',
          data: {},
        });
      } else {
        return res.status(200).json({
          message: 'Password is invalid',
          status: 'invalid',
          data: {},
        });
      }
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

// forget pass

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        err: 'Email not registered',
      });
    }
    const password = generateRandomPassword(12);

    const hashPassword = await bcryptjs.hash(password, 10);

    user.password = hashPassword;
    user.forgot_password = true;
    user.updatedAt = new Date();
    await user.save();

    const info = await transporter.sendMail({
      from: 'arnoldcreap22@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `<html>
        <head></head>
        <body>
          <h2>Hi, ${user.fullname}</h2>
          <p>Your temporary password is <b>${password}</b></p>
          <p>Please login using this password and update/change it immediately.</p>
          <p>The password will expires in 30 minutes.</p>
        </body>
      </html>`,
    });

    if (!info) {
      return res.json({
        err: 'Something went wrong, please try again.',
      });
    }

    return res.status(201).json({
      status: 'success',
      data: info.response,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error occurred',
      data: {},
    });
  }
};

module.exports = {
  bulkUsers,
  create,
  destroy,
  filters,
  list,
  login,
  modify,
  paginatedList,
  show,
  managaFavorite,
  followUser,
  update,
  validate,
  password,
  forgotPassword,
};

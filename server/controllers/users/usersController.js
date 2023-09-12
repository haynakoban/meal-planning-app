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

module.exports = { bulkUsers, create };

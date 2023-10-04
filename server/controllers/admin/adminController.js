const { Admins } = require('../../models');
const bcryptjs = require('bcryptjs');

const create = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const canSave = [username, password].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findAdmin = await Admins.findOne({ username });
    if (findAdmin) return res.json({ err: 'username already taken' });

    const hashPassword = await bcryptjs.hash(password, 10);

    const admin = await Admins.create({
      username,
      password: hashPassword,
    });

    if (!admin) return res.json({ err: 'error' });
    req.session.admin_id = admin._id.toJSON();

    return res.status(201).json({ username: username, _id: admin._id });
  } catch (e) {
    next(e);
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findAdmin = await Admins.findOne(
      { username },
      '_id username password'
    );

    if (!findAdmin) return res.json({ err: 'incorrect username' });

    bcryptjs.compare(password, findAdmin?.password).then((match) => {
      if (!match) return res.json({ err: 'incorrect username and password' });

      // set the session cookie
      req.session.admin_id = findAdmin._id.toJSON();

      return res.json({
        adminLoggedIn: true,
        username,
        _id: findAdmin._id,
      });
    });
  } catch (e) {
    next(e);
  }
};

const adminLogout = async (req, res, next) => {
  try {
    if (!req.session.admin_id) return res.json({ adminLoggedIn: false });

    req.session.destroy(function (err) {});
    res.clearCookie('_uid');

    return res.json({ adminLoggedIn: false });
  } catch (error) {
    next(error);
  }
};

const isAdminLoggedIn = async (req, res, next) => {
  try {
    console.log(req.session.admin_id);
    if (!req.session.admin_id) return res.json({ adminLoggedIn: false });
    return res.json({ adminLoggedIn: true, user_id: req.session.admin_id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  adminLogin,
  adminLogout,
  isAdminLoggedIn,
};

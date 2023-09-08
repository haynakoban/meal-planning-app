const { Users } = require('../../models');
const bcryptjs = require('bcryptjs');

// create new user
const create = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [fullname, email, password].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    // hash the password for basic security
    const hashPassword = await bcryptjs.hash(password, 10);
    // generate username
    const username = generateUniqueUsername(fullname);

    const user = await Users.create({
      fullname,
      email,
      username,
      password: hashPassword,
    });

    if (!user) return res.json({ err: 'error' });

    return res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
};

const usedRandomNumbers = new Set();

function generateUniqueUsername(fullName) {
  // Split the full name into an array of words
  const nameWords = fullName.trim().split(' ');

  // Initialize username
  let username = 'user_';

  // Loop through the name words and add the first letter of each word to the username
  for (const word of nameWords) {
    if (word.length > 0) {
      username += word[0].toLowerCase();
    }
  }

  let randomNumber;
  do {
    // Generate a random number between 1 and 999,999,999,999,999
    randomNumber = Math.floor(Math.random() * 999_999_999_999_999) + 1;
    // Format the random number to have leading zeros if needed
    randomNumber = randomNumber.toString().padStart(15, '0');
  } while (usedRandomNumbers.has(randomNumber));

  // Add the random number to the username
  username += randomNumber;

  // Add the used random number to the set
  usedRandomNumbers.add(randomNumber);

  return username;
}

module.exports = {
  create,
};

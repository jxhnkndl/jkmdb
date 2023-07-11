const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // get single user details by id, username, or email

  // create new user
  async createUser({ body }, res) {
    const user = await User.create(body);
    
    if (!user) {
      return res.status(400).json({ msg: 'Failed to create user'});
    }

    const token = signToken(user);

    res.status(200).json({ token, user });
  },

  // login user

  // add friend

  // save movie

  // delete movie
};

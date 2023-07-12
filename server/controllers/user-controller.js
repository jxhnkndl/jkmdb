const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async getMe(req, res) {
    const user = await User.findOne({ _id: req.body.id });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Success', data: user });
  },

  async getSingleUser(req, res) {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Success', data: user });
  },

  async searchUsers(req, res) {
    // allow for searching useres by username or email address
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (!user) {
      if (req.body.email) {
        return res
          .status(404)
          .json({ msg: 'No user with matching email found' });
      } else {
        return res
          .status(404)
          .json({ msg: 'No user with matching username found' });
      }
    }

    res.status(200).json({ msg: 'Success', data: user });
  },

  async createUser(req, res) {
    const user = await User.create(req.body);

    if (!user) {
      return res.status(400).json({ msg: 'Failed to create user' });
    }

    const token = signToken(user);

    res.status(200).json({ token, user });
  },

  async login(req, res) {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isValidPassword = user.checkPassword(req.body.password);

    if (!isValidPassword) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = signToken(user);

    res.status(200).json({ token, user });
  },

  async addFriend(req, res) {
    // (logged in user identified from req.user properties)
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }

      return res.status(200).json({ msg: 'Friend added', data: updatedUser });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err });
    }
  },

  async saveMovie(req, res) {
    // find user from id valid token added to req object
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { watchlist: req.body } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }

      return res
        .status(200)
        .json({ msg: 'Save successful', data: updatedUser });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: err });
    }
  },

  async deleteMovie(req, res) {
    // (logged in user identified from req.user properties)
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { watchlist: { apiId: req.params.movieId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res
      .status(200)
      .json({ msg: 'Delete successful', data: updatedUser });
  },
};

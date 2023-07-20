const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async getMe(req, res) {
    if (req.user) {
      res.status(200).json({ msg: 'Success', data: req.user });
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  },

  async searchUsers(req, res) {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (user) {
      res.status(200).json({ msg: 'Success', data: user });
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  },

  async createUser(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ msg: 'Please include all required fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = await User.create(req.body);

    if (newUser) {
      const token = signToken(newUser);

      res.status(200).json({ token, newUser });
    } else {
      res.status(400).json({ msg: 'Failed to create user' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isValidPassword = user.checkPassword(req.body.password);

    if (isValidPassword) {
      const token = signToken(user);

      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ msg: 'Invalid credentials' });
    }
  },

  async followUser(req, res) {
    try {
      // add searched user to logged in user's following array
      const updatedSelf = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { following: req.params.followId } },
        { new: true, runValidators: true }
      );

      // add logged in user to searched user's followers array
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.followId },
        { $addToSet: { followers: req.user._id } },
        { new: true, runValidators: true }
      );

      if (updatedSelf && updatedUser) {
        res.status(200).json({ msg: 'Friend added', data: updatedSelf });
      } else {
        res.status(404).json({ msg: 'User not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err });
    }
  },

  async saveMovie(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { watchlist: req.body } },
        { new: true, runValidators: true }
      );

      if (updatedUser) {
        res.status(200).json({ msg: 'Save successful', data: updatedUser });
      } else {
        res.status(404).json({ msg: 'User not found' });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: err });
    }
  },

  async deleteMovie(req, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { watchlist: { apiId: req.params.movieId } } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ msg: 'Delete successful', data: updatedUser });
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  },
};

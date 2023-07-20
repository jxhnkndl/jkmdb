const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

// jwt parameters
const secret = process.env.TOKEN_SECRET;
const expiration = process.env.TOKEN_EXPIRATION;

module.exports = {
  authMiddleware: async function (req, res, next) {
    // split token value from "Bearer" in header
    let token = req.headers.authorization.split(' ').pop().trim();

    if (!token) {
      return res.status(401).json({ msg: 'Invalid token' });
    }

    // use decoded token data to query user and attach user data to req
    try {
      const decoded = jwt.verify(token, secret, { maxAge: expiration });

      req.user = await User.findById(decoded.data._id);
    } catch (err) {
      console.log('Invalid token');
      console.log(err);
      return res.status(401).json({ msg: 'Invalid token' });
    }

    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

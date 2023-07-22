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

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });

      req.user = data;
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

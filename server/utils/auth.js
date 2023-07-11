const jwt = require('jsonwebtoken');

require('dotenv').config();

// jwt parameters
const secret = process.env.TOKEN_SECRET;
const expiration = process.env.TOKEN_EXPIRATION;

module.exports = {
  // authenticate user for protected routes
  authMiddleware: function (req, res, next) {
    // collect token from authorization header
    // split token value from "Bearer" in header
    let token = req.headers.authorization.split(' ').pop().trim();

    // if no token
    if (!token) {
      return res.status(401).json({ msg: 'Invalid token' });
    }

    // validate token and extract user data to add to req
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(401).json({ msg: 'Invalid token' });
    }

    next();
  },
  // sign new tokens
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // configure and sign new token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

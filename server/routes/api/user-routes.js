const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');

const {
  getMe,
  searchUsers,
  createUser,
  login,
} = require('../../controllers/user-controller');

router.route('/').get(authMiddleware, searchUsers).post(createUser);

router.route('/me').get(authMiddleware, getMe);

router.route('/login').post(login);

module.exports = router;

const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');

const {
  getMe,
  searchUsers,
  createUser,
  login,
  followUser,
  saveMovie,
  deleteMovie,
} = require('../../controllers/user-controller');

router.route('/me').get(authMiddleware, getMe);

router
  .route('/')
  .get(authMiddleware, searchUsers)
  .post(createUser)
  .put(authMiddleware, saveMovie);

router.route('/login').post(login);

router.route('/:movieId').delete(authMiddleware, deleteMovie);

module.exports = router;

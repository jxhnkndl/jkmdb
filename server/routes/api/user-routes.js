const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');

const {
  getMe,
  searchUsers,
  createUser,
  login,
  addFriend,
  saveMovie,
  deleteMovie,
} = require('../../controllers/user-controller');

router.route('/me').get(authMiddleware, getMe);

router
  .route('/')
  .get(authMiddleware, searchUsers)
  .post(createUser)
  .put(authMiddleware, saveMovie);

router.route('/friends/:friendId').put(authMiddleware, addFriend);

router.route('/:movieId').delete(authMiddleware, deleteMovie);

router.route('/login').post(login);

module.exports = router;

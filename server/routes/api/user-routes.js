const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');

const { createUser, login } = require('../../controllers/user-controller');

router.route('/').post(createUser);

router.route('/login').post(login);

module.exports = router;

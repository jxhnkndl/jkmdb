const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');

const { createUser } = require('../../controllers/user-controller');

router.route('/').post(createUser);

module.exports = router;

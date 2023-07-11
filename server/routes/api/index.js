const router = require('express').Router();
const userRoutes = require('./user-routes');

// batch and prefix user routes
router.use('/users', userRoutes);

module.exports = router;
const router = require('express').Router();
const apiRoutes = require('./api');

// batch and prefix api routes
router.use('/api', apiRoutes);

// serve react app in production mode
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
const mongoose = require('mongoose');

// init mongodb connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/streamo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
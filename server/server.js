const express = require('express');
const path = require('path');
const db = require('./config/connection');

// init express
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve client/build as static assets in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// connect to db and start server
db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT} 🚀`));
});

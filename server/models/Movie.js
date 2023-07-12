const { Schema } = require('mongoose');

const Movie = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    apiRating: {
      type: Number,
      required: true
    },
    posterUrl: {
      type: String,
      required: true,
      match: /\.(jpg|png|svg)$/
    },
    dateAdded: {
      type: Date,
      default: new Date()
    }
  }
);

module.exports = Movie;
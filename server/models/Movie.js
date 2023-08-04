const { Schema } = require('mongoose');

const Movie = new Schema(
  {
    apiId: {
      type: Number,
      require: true
    },
    mediaType: {
      type: String,
      required: true
    },
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
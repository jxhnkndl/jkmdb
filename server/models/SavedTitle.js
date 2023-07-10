const { Schema, Model, default: mongoose } = require('mongoose');

const savedTitle = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    rating: {
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

module.exports = savedTitle;
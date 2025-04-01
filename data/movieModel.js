'use strict';

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseYear: Number,
  genre: [String],
  rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
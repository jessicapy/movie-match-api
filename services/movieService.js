'use strict';

const Movie = require('../data/movieModel');

const movieService = {
  getAllMovies: async () => {
    return await Movie.find();
  },

  getMovie: async (id) => {
    return await Movie.findById(id);
  },

  createMovie: async (movieData) => {
    return await Movie.create(movieData);
  },

  updateMovie: async (id, movieData) => {
    return await Movie.findByIdAndUpdate(id, movieData, { new: true });
  },

  deleteMovie: async (id) => {
    return await Movie.findByIdAndDelete(id);
  }
};

module.exports = movieService;
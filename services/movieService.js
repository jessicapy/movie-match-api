'use strict';

const Movie = require('../data/movieModel');

const movieService = {
  getAllMovies: async () => {
    return await Movie.getAllMovies();
  },

  getMovie: async (id) => {
    return await Movie.findById(id);
  }
};

module.exports = movieService;
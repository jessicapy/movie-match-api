'use strict';

const Movie = require('../data/movieModel');

const movieService = {
  getAllMovies: async () => {
    return await Movie.getAllMovies();
  },

  getMovie: async (id) => {
    return await Movie.findById(id);
  },

  getMoviesByGenre: async (genre) => {
    return await Movie.getMoviesByGenre(genre);
  },

  searchMoviesByYear: async (fromYear, toYear) => {
    return await Movie.searchMoviesByYear(fromYear, toYear);
  },

  getMoviesByMinDuration: async (minDuration) => {
    return await Movie.getMoviesByMinDuration(minDuration);
  }
};

module.exports = movieService;
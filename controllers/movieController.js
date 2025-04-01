'use strict';

const movieService = require('../services/movieService');

const movieController = {
  getAllMovies: async (req, res, next) => {
    try {
      const movies = await movieService.getAllMovies();
      res.json(movies);
    } catch (error) {
      next(error);
    }
  },

  getMovie: async (req, res, next) => {
    try {
      const movie = await movieService.getMovie(req.params.id);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  },

  createMovie: async (req, res, next) => {
    try {
      const movie = await movieService.createMovie(req.body);
      res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  },

  updateMovie: async (req, res, next) => {
    try {
      const movie = await movieService.updateMovie(req.params.id, req.body);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  },

  deleteMovie: async (req, res, next) => {
    try {
      await movieService.deleteMovie(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = movieController;
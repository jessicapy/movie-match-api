'use strict';

const movieService = require('../services/movieService');

const movieController = {
  getAllMovies: async (req, res, next) => {
    try {
      const { minDuration } = req.query;
      
      // If minDuration is provided, validate and filter
      if (minDuration) {
        const duration = parseInt(minDuration);
        
        if (isNaN(duration) || duration < 0) {
          return res.status(400).json({
            error: 'Invalid duration',
            message: 'Duration must be a positive number'
          });
        }
        
        const movies = await movieService.getMoviesByMinDuration(duration);
        return res.json(movies);
      }
      
      // If no minDuration, return all movies
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
  },

  getMoviesByGenre: async (req, res, next) => {
    try {
      const genre = req.params.genre;
      console.log('Searching for genre:', genre); // Debug log
      
      const movies = await movieService.getMoviesByGenre(genre);
      console.log('Found movies:', movies); // Debug log
      
      res.json(movies || []);
    } catch (error) {
      console.error('Controller error:', error);
      next(error);
    }
  },

  searchMoviesByYear: async (req, res, next) => {
    try {
      const { fromYear, toYear } = req.query;
      console.log('Search params:', { fromYear, toYear }); // Debug log

      // Validate years
      const currentYear = new Date().getFullYear();
      
      // Convert to numbers for comparison
      const fromYearNum = fromYear ? parseInt(fromYear) : 1900;
      const toYearNum = toYear ? parseInt(toYear) : currentYear;
      
      console.log('Parsed years:', { fromYearNum, toYearNum, currentYear }); // Debug log

      // Validate fromYear
      if (fromYear && (isNaN(fromYearNum) || fromYearNum < 1900 || fromYearNum > currentYear)) {
        return res.status(400).json({ 
          error: 'Invalid fromYear',
          message: 'Year must be between 1900 and current year'
        });
      }

      // Validate toYear
      if (toYear && (isNaN(toYearNum) || toYearNum < 1900 || toYearNum > currentYear)) {
        return res.status(400).json({ 
          error: 'Invalid toYear',
          message: 'Year must be between 1900 and current year'
        });
      }

      // Call service method
      const movies = await movieService.searchMoviesByYear(fromYearNum, toYearNum);
      console.log('Movies found:', movies?.length || 0); // Debug log

      // Return response
      return res.json({
        success: true,
        params: { fromYear: fromYearNum, toYear: toYearNum },
        count: movies?.length || 0,
        results: movies || []
      });

    } catch (error) {
      console.error('Search by year error:', error); // Debug log
      next(error);
    }
  }
};

module.exports = movieController;
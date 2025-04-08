'use strict';

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Routes
router.get('/', movieController.getAllMovies);
router.get('/search', movieController.searchMoviesByYear);
router.get('/genre/:genre', movieController.getMoviesByGenre);
router.get('/:id', movieController.getMovie);

module.exports = router;
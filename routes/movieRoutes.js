'use strict';

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Root route for /movies
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovie);

module.exports = router;
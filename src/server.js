const express = require('express');
const { getAllMovies, findMovie, getMoviesByGenre } = require('./utils/movieUtils');
const app = express();
const port = 3000;

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Error interno del servidor",
        message: err.message
    });
});

// Root route redirect
app.get('/', (req, res) => {
    res.redirect('/movies');
});

// Movies route with optional genre filter
app.get('/movies', (req, res) => {
    try {
        const { genre } = req.query;
        const movies = genre ? getMoviesByGenre(genre) : getAllMovies();
        
        if (movies.length === 0) {
            res.status(404).json({
                message: `No se encontraron películas del género: ${genre}`
            });
            return;
        }
        
        res.json(movies);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener las películas",
            message: error.message
        });
    }
});

// Single movie route
app.get('/movies/:idOrName', (req, res) => {
    try {
        const movie = findMovie(req.params.idOrName);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({
                error: "Película no encontrada",
                message: `No se encontró ninguna película con ID o título: ${req.params.idOrName}`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Error al buscar la película",
            message: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
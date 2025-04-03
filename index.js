'use strict';

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./docs/swagger.yaml');

require('dotenv').config();
const express = require('express');
const app = express();

// Import middlewares
const cors = require('./middlewares/cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// Import routes
const movieRoutes = require('./routes/movieRoutes');

// Global middlewares
app.use(logger);
app.use(cors);
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Movie Match API',
    endpoints: {
      movies: '/movies'
    }
  });
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Mount routes
app.use('/movies', movieRoutes);
app.get('/bruno', (req, res)=> {
  throw new Error('Bruno is not allowed here!');
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const movieRoutes = require('./routes/movieRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes at /movies path
app.use('/movies', movieRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
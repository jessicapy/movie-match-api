'use strict';

const fs = require('fs').promises;
const path = require('path');
const csvPath = path.join(__dirname, 'movies.csv');

class MovieModel {
  static async getAllMovies() {
    const data = await fs.readFile(csvPath, 'utf8');
    return this.parseCSV(data);
  }

  static async findById(id) {
    const movies = await this.getAllMovies();
    return movies.find(movie => movie.id === id);
  }

  static parseCSV(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      // Use regex to handle commas within quotes
      const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
      const movie = {};
      
      headers.forEach((header, index) => {
        let value = values[index];
        if (value) {
          // Remove quotes if present
          value = value.replace(/^"|"$/g, '').trim();
        }
        
        // Check if the field should be an array
        if (['Genre', 'Director', 'Actors'].includes(header)) {
          // Split by comma and trim each value
          movie[header] = value ? value.split(',').map(item => item.trim()) : [];
        } else {
          movie[header] = value || '';
        }
      });
      
      return movie;
    });
  }
}

module.exports = MovieModel;
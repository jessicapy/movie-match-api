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
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const movie = {};
      headers.forEach((header, index) => {
        movie[header.trim()] = values[index]?.trim();
      });
      return movie;
    });
  }
}

module.exports = MovieModel;
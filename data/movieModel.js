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

  static async getMoviesByGenre(searchGenre) {
    try {
      const movies = await this.getAllMovies();
      return movies.filter(movie => {
        // Split genre by comma and clean up whitespace
        const genres = movie.genre.split(',').map(g => g.trim());
        return genres.some(g => g.toLowerCase() === searchGenre.toLowerCase());
      });
    } catch (error) {
      console.error('Error in getMoviesByGenre:', error);
      throw error;
    }
  }

  static async searchMoviesByYear(fromYear, toYear) {
    try {
      const movies = await this.getAllMovies();
      console.log('Total movies before filtering:', movies.length);

      const filteredMovies = movies.filter(movie => {
        const movieYear = parseInt(movie.year);
        console.log(`Checking movie: ${movie.title}, Year: ${movieYear}`);
        return movieYear >= fromYear && movieYear <= toYear;
      });

      console.log('Filtered movies count:', filteredMovies.length);
      return filteredMovies;
    } catch (error) {
      console.error('Error in searchMoviesByYear:', error);
      throw error;
    }
  }

  static async getMoviesByMinDuration(minDuration) {
    try {
      const movies = await this.getAllMovies();
      return movies.filter(movie => {
        const duration = parseInt(movie.runtime_minutes);
        return !isNaN(duration) && duration >= minDuration;
      });
    } catch (error) {
      console.error('Error in getMoviesByMinDuration:', error);
      throw error;
    }
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
        movie[header] = value || '';
      });
      
      return movie;
    });
  }
}

module.exports = MovieModel;
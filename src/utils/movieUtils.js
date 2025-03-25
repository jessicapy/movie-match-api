const fs = require("fs");
const path = require("path");

function parseCSVRow(row) {
    const values = [];
    let value = '';
    let withinQuotes = false;
    
    for (let char of row) {
        if (char === '"') {
            withinQuotes = !withinQuotes;
        } else if (char === ',' && !withinQuotes) {
            values.push(value.trim());
            value = '';
        } else {
            value += char;
        }
    }
    values.push(value.trim());
    return values;
}

function getMovieByTitle(title) {
    const csvFilePath = path.join(__dirname, "..", "..", "data", "movies.csv");
    const csvData = fs.readFileSync(csvFilePath, "utf8");
    
    const lines = csvData.split("\n");
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVRow(lines[i]);
        if (values[1].toLowerCase() === title.toLowerCase()) {
            return {
                título: values[1],
                año: values[2],
                género: values[3],
                director: values[4],
                actores: values[5],
                sinopsis: values[6],
                calificación: values[7],
                duración: values[8] + " minutos"
            };
        }
    }
    return null;
}

function getRandomMovie() {
    const csvFilePath = path.join(__dirname, "..", "..", "data", "movies.csv");
    const csvData = fs.readFileSync(csvFilePath, "utf8");
    
    const lines = csvData.split("\n");
    const randomIndex = Math.floor(Math.random() * (lines.length - 1)) + 1;
    const values = parseCSVRow(lines[randomIndex]);
    
    return {
        título: values[1],
        año: values[2],
        género: values[3],
        director: values[4],
        actores: values[5],
        sinopsis: values[6],
        calificación: values[7],
        duración: values[8] + " minutos"
    };
}

module.exports = { 
    getMovieByTitle,
    getRandomMovie 
};


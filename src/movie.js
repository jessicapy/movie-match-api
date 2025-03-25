const { getMovieByTitle } = require('./utils/movieUtils');

if (process.argv.length < 3) {
    console.log("Por favor ingrese un título de película");
    console.log("Ejemplo: node movie.js 'The Matrix'");
    process.exit(1);
}

const inputTitle = process.argv[2];

try {
    const movie = getMovieByTitle(inputTitle);
    
    if (movie) {
        console.log("\nDetalles de la película:");
        console.table(movie);
    } else {
        console.log(`No se encontró la película: "${inputTitle}"`);
    }
} catch (error) {
    console.error("Error al buscar la película:", error.message);
}
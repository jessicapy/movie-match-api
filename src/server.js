const http = require('http');
const { getRandomMovie } = require('./utils/movieUtils');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        try {
            const movie = getRandomMovie();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(movie, null, 2));
        } catch (error) {
            res.writeHead(500);
            res.end('Error interno del servidor');
        }
    } else {
        res.writeHead(404);
        res.end('Página no encontrada');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
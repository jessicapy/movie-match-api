# Movie Match API

An API for managing movie information.

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy `.env_example` to `.env` and configure your environment variables:

```bash
cp .env_example .env
```

4. Start the server:

```bash
npm start
```

## Deployment

This API is deployed on Render, which is optimized for Node.js applications.

### Deployment Steps

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Configure environment variables:
   - `NODE_ENV`: `production`
   - `ALLOWED_ORIGINS`: Your frontend URL or `*`
   - Note: Render sets PORT automatically

## API Documentation

The API is available at:
[Render](https://movie-match-api-fffz.onrender.com/movies)

### Endpoints

- `GET /movies` - List all movies
- `GET /movies/:id` - Get a specific movie
- `GET /movies/genre/:genre` - List movies by genre
- `GET /movies/search?fromYear=YYYY&toYear=YYYY` - Search movies by year range
- `GET /movies?minDuration=X` - List movies with duration >= X minutes

## Environment Variables

- `PORT`: The port number (default: 3000)
- `NODE_ENV`: Environment mode (`development` or `production`)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

## Note

This is a backend API and should be deployed on platforms that support Node.js servers (like Render, Railway, or Heroku). Static hosting platforms like Netlify or GitHub Pages are not suitable for this application.

## Historias de usuario adicionales

### Historia de Usuario: Listar Películas por Género

Como usuario de la API
Quiero poder filtrar películas por género
Para encontrar fácilmente películas de una categoría específica

Criterios de Aceptación
La API debe tener un nuevo endpoint GET /movies/genre/:genre
Debe retornar un array de películas del género especificado
Los géneros deben ser case-insensitive (ej: "action" = "Action")
Si no hay películas del género, retornar array vacío y status 200
En caso de error, retornar status 500 con mensaje de error.

### Historia de Usuario: Buscar Películas por Rango de Año

Como usuario de la API
Quiero poder filtrar películas por un rango de años
Para encontrar películas lanzadas en un período específico

Criterios de Aceptación
Endpoint GET /movies/search que acepta query params fromYear y toYear
Si solo se proporciona fromYear, buscar películas desde ese año hasta ahora
Si solo se proporciona toYear, buscar películas hasta ese año
Si se proporcionan ambos, buscar películas en ese rango
Retornar array vacío si no hay coincidencias
Los años deben ser números válidos entre 1900 y el año actual.

### Historia de Usuario: Buscar Películas por Duración Mínima

Como usuario de la API
Quiero filtrar películas por duración mínima en minutos
Para encontrar películas que tengan una duración específica o mayor

Criterios de Aceptación
Endpoint GET /movies?minDuration=X donde X es la duración en minutos
Validar que minDuration sea un número positivo
Filtrar películas cuya duración sea >= minDuration
Si no hay películas, retornar array vacío
La duración debe estar en la columna runtime_minutes del CSV

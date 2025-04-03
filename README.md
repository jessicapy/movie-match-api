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

This API is deployed on Render. To deploy your own instance:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure environment variables:
   - `PORT`
   - `ALLOWED_ORIGINS`
4. Deploy!

## API Documentation

The API is available at: 

[https://movie-match-api-fffz.onrender.com/movies](https://movie-match-api-fffz.onrender.com/movies)

[https://movie-match-api-fffz.onrender.com/movies](https://movie-match-api-fffz.onrender.com/movies)

### Endpoints

- `GET /movies` - List all movies
- `GET /movies/:id` - Get a specific movie

## Environment Variables

- `PORT`: The port number (default: 3000)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
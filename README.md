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

### Deployment Steps:

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

## Environment Variables

- `PORT`: The port number (default: 3000)
- `NODE_ENV`: Environment mode (`development` or `production`)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

## Note

This is a backend API and should be deployed on platforms that support Node.js servers (like Render, Railway, or Heroku). Static hosting platforms like Netlify or GitHub Pages are not suitable for this application.
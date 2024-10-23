import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

import path from 'path';

const app = express();

const PORT = process.env.PORT || 3001;

// Serve static files
app.use(express.static(path.join(__dirname, '../../client/dist')));
// Middleware for parsing JSON
app.use(express.json());
// Connect the routes
app.use('/api/weather', routes);
// Start the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));


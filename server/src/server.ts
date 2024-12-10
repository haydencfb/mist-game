import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import db from './config/connection.js';
import { typeDefs, resolvers } from './schema/index.js';
import cors from 'cors'; // Import the CORS package

import { authenticateToken } from './services/auth-service.js';

// Set up dynamic allowed origins (localhost for dev and Render for production)
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://mist-game.onrender.com', // Render production frontend
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db;

  const PORT = process.env.PORT || 3001;
  const app = express();

  // Enable CORS for requests from frontend (both dev and prod)
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow requests from allowed origins
      } else {
        callback(new Error('Not allowed by CORS')); // Reject requests from other origins
      }
    },
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials (cookies, headers)
  }));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Set up GraphQL middleware
  app.use('/graphql', expressMiddleware(server as any, {
    context: authenticateToken as any
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

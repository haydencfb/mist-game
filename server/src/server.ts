import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schema/index.js';
import { fileURLToPath } from 'node:url';
import cors from 'cors'; // Import the CORS package

import { authenticateToken } from './services/auth-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();
  await db;

  const PORT = process.env.PORT || 3001;
  const app = express();

  // Enable CORS for requests from the frontend
  app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend running on localhost:3000
    methods: ['GET', 'POST'], // Allow GET and POST methods
  }));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Set up GraphQL middleware
  app.use('/graphql', expressMiddleware(server as any, {
    context: authenticateToken as any
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

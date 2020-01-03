require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';

import { schema } from './schema';
import { createContext } from './context';

const app = express();

const server = new ApolloServer({
  schema,
  context: createContext,
});

app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

server.applyMiddleware({ app, cors: corsOptions });

app.use((req, res, next) => {
  // TODO: get userId from cookie
  next();
});

app.listen(
  {
    port: process.env.PORT,
  },
  () =>
    console.log(
      `Graphql server ready at http://localhost:${process.env.PORT}/graphql`,
    ),
);

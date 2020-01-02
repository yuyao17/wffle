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

server.applyMiddleware({ app });

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

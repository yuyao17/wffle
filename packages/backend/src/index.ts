require('dotenv').config();
import http from 'http';
import { ApolloServer, PubSub } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';

import { schema } from './schema';
import { createContext } from './context';

export const pubsub = new PubSub();

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

const httpServer = http.createServer(app);

// for subscriptions
server.installSubscriptionHandlers(httpServer);

app.use((req, res, next) => {
  // TODO: get userId from cookie
  next();
});

httpServer.listen(
  {
    port: process.env.PORT,
  },
  () =>
    console.log(
      `Graphql server ready at http://localhost:${process.env.PORT}/graphql`,
    ),
);

import { ApolloClient, InMemoryCache, HttpLink, split } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';
import withApollo from './withApollo';
import ws from 'isomorphic-ws';
let apolloClient: ApolloClient<any> | null = null;

const isBrowser = (process as any).browser;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  // @ts-ignore
  global.fetch = fetch;
}

function createApolloClient(options) {
  // We need this to append cookie on initial server-side load
  const customFetch = headers => (uri, options) => {
    options.headers.cookie = headers.cookie;
    return fetch(uri, options);
  };

  const httpLink = new HttpLink({
    // uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn", // Server URL (must be absolute)
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3030/graphql'
        : // TODO: change for prod
          'http://localhost:3030/graphql',
    credentials: 'include',
    // client-side navigation fetching won't work if in browser
    fetch: !isBrowser && customFetch(options.headers),
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:3030/graphql`,
    options: {
      reconnect: true,
    },
    webSocketImpl: ws,
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(options.initialState || {}),
  });
}

function initApollo(options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return createApolloClient(options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(options);
  }

  return apolloClient;
}

export default withApollo(initApollo);

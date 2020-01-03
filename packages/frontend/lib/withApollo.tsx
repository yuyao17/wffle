import React from 'react';
import Head from 'next/head';
import { renderToString } from 'react-dom/server';
import { getMarkupFromTree } from '@apollo/react-ssr';
import { ApolloClient } from 'apollo-boost';

let _apolloClient = null;

const isBrowser = (process as any).browser;

// same implementation with next-with-apollo,
// just subtituting getDataFromTree -> getMarkupFromTree for hook support
const getClient = (clientFn, options = {}) => {
  return clientFn(options);
};

const initApollo = (clientFn, options) => {
  if (!clientFn) {
    throw new Error(
      '[withApollo] the first param is missing and is required to get the ApolloClient',
    );
  }

  if (!isBrowser) {
    return getClient(clientFn, options);
  }

  if (!_apolloClient) {
    _apolloClient = getClient(clientFn, options);
  }

  return _apolloClient;
};

export default function withApollo(client) {
  return (App: React.ComponentType<any> & { getInitialProps?: Function }) => {
    return class WithApollo extends React.Component {
      static displayName = 'withApollo(App)';
      apollo: ApolloClient<any>;

      constructor(props) {
        super(props);
        this.apollo =
          props.apollo ||
          initApollo(client, {
            initialState: props.apolloState.data,
          });
      }

      static async getInitialProps(appCtx) {
        const { AppTree, ctx, router } = appCtx;

        const headers = ctx.req ? ctx.req.headers : {};
        const apollo = initApollo(client, { ctx, headers });
        const apolloState = {} as any;
        const getInitialProps = App.getInitialProps;

        let appProps = {
          pageProps: {},
        };

        if (getInitialProps) {
          ctx.apolloClient = apollo;
          appProps = await getInitialProps(appCtx);
        }

        if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
          return {};
        }

        if (!isBrowser) {
          try {
            await getMarkupFromTree({
              renderFunction: renderToString,
              tree: (
                <AppTree
                  {...appProps}
                  router={router}
                  apolloState={apolloState}
                  apollo={apollo}
                />
              ),
            });
          } catch (e) {
            console.error('Error while running `getMarkupFromTree`', e);
          }

          Head.rewind();
          apolloState.data = apollo.cache.extract();
        }

        apollo.toJSON = () => {
          return null;
        };

        return {
          ...appProps,
          apolloState,
          apollo,
        };
      }

      render() {
        return <App {...this.props} apollo={this.apollo} />;
      }
    };
  };
}

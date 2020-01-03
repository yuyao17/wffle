import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import initApolloClient from '../lib/initApolloClient';
// codelift config for tailwind GUI editting
import 'codelift/register';
import '../styles/index.css';

class MyApp extends App<{ apollo: ApolloClient<any> }> {
  render() {
    const { Component, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Component />
      </ApolloProvider>
    );
  }
}

export default initApolloClient(MyApp);

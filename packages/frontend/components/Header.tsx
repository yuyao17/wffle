import React from 'react';
import gql from 'graphql-tag';

export const ALL_USER = gql`
  query ALL_USER {
    users {
      email
      name
    }
  }
`;

const Header = () => <div>hello world</div>;

export default Header;

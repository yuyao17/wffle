import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mutation = {
   __typename?: 'Mutation',
  changePassword: User,
  createUser: User,
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'],
  email: Scalars['String'],
  newPassword: Scalars['String']
};


export type MutationCreateUserArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  filterUser: Array<User>,
  users: Array<User>,
};


export type QueryFilterUserArgs = {
  nameContains?: Maybe<Scalars['String']>
};


export type QueryUsersArgs = {
  after?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['Int']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};

export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  id: Scalars['Int'],
  name?: Maybe<Scalars['String']>,
  password: Scalars['String'],
};

export type AllUserQueryVariables = {};


export type AllUserQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id'>
  )> }
);


export const AllUserDocument = gql`
    query ALL_USER {
  users {
    email
    id
  }
}
    `;
export type AllUserQueryResult = ApolloReactCommon.QueryResult<AllUserQuery, AllUserQueryVariables>;
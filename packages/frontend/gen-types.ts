import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
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

export type All_UserQueryVariables = {};


export type All_UserQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'name'>
  )> }
);


export const All_UserDocument = gql`
    query ALL_USER {
  users {
    email
    name
  }
}
    `;

/**
 * __useAll_UserQuery__
 *
 * To run a query within a React component, call `useAll_UserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAll_UserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAll_UserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAll_UserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<All_UserQuery, All_UserQueryVariables>) {
        return ApolloReactHooks.useQuery<All_UserQuery, All_UserQueryVariables>(All_UserDocument, baseOptions);
      }
export function useAll_UserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<All_UserQuery, All_UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<All_UserQuery, All_UserQueryVariables>(All_UserDocument, baseOptions);
        }
export type All_UserQueryHookResult = ReturnType<typeof useAll_UserQuery>;
export type All_UserLazyQueryHookResult = ReturnType<typeof useAll_UserLazyQuery>;
export type All_UserQueryResult = ApolloReactCommon.QueryResult<All_UserQuery, All_UserQueryVariables>;
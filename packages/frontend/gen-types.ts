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

export type BatchPayload = {
   __typename?: 'BatchPayload',
  count: Scalars['Int'],
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>,
  gt?: Maybe<Scalars['Int']>,
  gte?: Maybe<Scalars['Int']>,
  in?: Maybe<Array<Scalars['Int']>>,
  lt?: Maybe<Scalars['Int']>,
  lte?: Maybe<Scalars['Int']>,
  not?: Maybe<Scalars['Int']>,
  notIn?: Maybe<Array<Scalars['Int']>>,
};

export type Mutation = {
   __typename?: 'Mutation',
  changePassword: User,
  createUser: User,
  deleteManyUser: BatchPayload,
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


export type MutationDeleteManyUserArgs = {
  where?: Maybe<UserWhereInput>
};

export type NullableStringFilter = {
  contains?: Maybe<Scalars['String']>,
  endsWith?: Maybe<Scalars['String']>,
  equals?: Maybe<Scalars['String']>,
  gt?: Maybe<Scalars['String']>,
  gte?: Maybe<Scalars['String']>,
  in?: Maybe<Array<Scalars['String']>>,
  lt?: Maybe<Scalars['String']>,
  lte?: Maybe<Scalars['String']>,
  not?: Maybe<Scalars['String']>,
  notIn?: Maybe<Array<Scalars['String']>>,
  startsWith?: Maybe<Scalars['String']>,
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

export type StringFilter = {
  contains?: Maybe<Scalars['String']>,
  endsWith?: Maybe<Scalars['String']>,
  equals?: Maybe<Scalars['String']>,
  gt?: Maybe<Scalars['String']>,
  gte?: Maybe<Scalars['String']>,
  in?: Maybe<Array<Scalars['String']>>,
  lt?: Maybe<Scalars['String']>,
  lte?: Maybe<Scalars['String']>,
  not?: Maybe<Scalars['String']>,
  notIn?: Maybe<Array<Scalars['String']>>,
  startsWith?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  userAdded: User,
};

export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  id: Scalars['Int'],
  name?: Maybe<Scalars['String']>,
  password: Scalars['String'],
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>,
  email?: Maybe<StringFilter>,
  id?: Maybe<IntFilter>,
  name?: Maybe<NullableStringFilter>,
  NOT?: Maybe<Array<UserWhereInput>>,
  OR?: Maybe<Array<UserWhereInput>>,
  password?: Maybe<StringFilter>,
};

export type AllUserQueryVariables = {};


export type AllUserQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id'>
  )> }
);

export type UserAddedSubscriptionVariables = {};


export type UserAddedSubscription = (
  { __typename?: 'Subscription' }
  & { userAdded: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id'>
  ) }
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
export const UserAddedDocument = gql`
    subscription userAdded {
  userAdded {
    email
    id
  }
}
    `;
export type UserAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<UserAddedSubscription>;
/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DateAnswers = {
  __typename?: 'DateAnswers';
  date: Scalars['String']['output'];
  noCount: Scalars['Int']['output'];
  yesCount: Scalars['Int']['output'];
};

export type LocationAnswers = {
  __typename?: 'LocationAnswers';
  country: Scalars['String']['output'];
  noCount: Scalars['Int']['output'];
  subdivision: Scalars['String']['output'];
  yesCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerAnswer?: Maybe<RegisterAnswerResponse>;
};


export type MutationRegisterAnswerArgs = {
  authProvider?: InputMaybe<Scalars['String']['input']>;
  authToken?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  date: Scalars['String']['input'];
  hasSymptoms: Scalars['String']['input'];
  subdivision: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  answersByDate: Array<DateAnswers>;
  answersByLocation: Array<LocationAnswers>;
  health: Scalars['String']['output'];
};


export type QueryAnswersByDateArgs = {
  country: Scalars['String']['input'];
  subdivision: Scalars['String']['input'];
};

export type RegisterAnswerResponse = {
  __typename?: 'RegisterAnswerResponse';
  id: Scalars['ID']['output'];
};

export type AnswersByDateQueryVariables = Exact<{
  country: Scalars['String']['input'];
  subdivision: Scalars['String']['input'];
}>;


export type AnswersByDateQuery = { __typename?: 'Query', answersByDate: Array<{ __typename?: 'DateAnswers', date: string, yesCount: number, noCount: number }> };

export type AnswersByLocationQueryVariables = Exact<{ [key: string]: never; }>;


export type AnswersByLocationQuery = { __typename?: 'Query', answersByLocation: Array<{ __typename?: 'LocationAnswers', country: string, subdivision: string, yesCount: number, noCount: number }> };

export type RegisterAnswerMutationVariables = Exact<{
  hasSymptoms: Scalars['String']['input'];
  country: Scalars['String']['input'];
  subdivision: Scalars['String']['input'];
  authProvider?: InputMaybe<Scalars['String']['input']>;
  authToken?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['String']['input'];
}>;


export type RegisterAnswerMutation = { __typename?: 'Mutation', registerAnswer?: { __typename?: 'RegisterAnswerResponse', id: string } | null };


export const AnswersByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AnswersByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answersByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"subdivision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"yesCount"}},{"kind":"Field","name":{"kind":"Name","value":"noCount"}}]}}]}}]} as unknown as DocumentNode<AnswersByDateQuery, AnswersByDateQueryVariables>;
export const AnswersByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AnswersByLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answersByLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"subdivision"}},{"kind":"Field","name":{"kind":"Name","value":"yesCount"}},{"kind":"Field","name":{"kind":"Name","value":"noCount"}}]}}]}}]} as unknown as DocumentNode<AnswersByLocationQuery, AnswersByLocationQueryVariables>;
export const RegisterAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSymptoms"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authProvider"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSymptoms"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSymptoms"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"subdivision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}}},{"kind":"Argument","name":{"kind":"Name","value":"authProvider"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authProvider"}}},{"kind":"Argument","name":{"kind":"Name","value":"authToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RegisterAnswerMutation, RegisterAnswerMutationVariables>;
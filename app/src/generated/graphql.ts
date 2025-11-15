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

export type JwtResponse = {
  __typename?: 'JwtResponse';
  expiresAt: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type LocationAnswers = {
  __typename?: 'LocationAnswers';
  noCount: Scalars['Int']['output'];
  subdivision: Scalars['String']['output'];
  yesCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerAnswer?: Maybe<RegisterAnswerResponse>;
};


export type MutationRegisterAnswerArgs = {
  date: Scalars['String']['input'];
  hasSymptoms: Scalars['String']['input'];
  subdivision: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  answersByDate: Array<DateAnswers>;
  answersByLocation: Array<LocationAnswers>;
  health: Scalars['String']['output'];
  jwt: JwtResponse;
  nearbySubdivisions: Array<Subdivision>;
  subdivisionsByCountry: Array<Subdivision>;
};


export type QueryAnswersByDateArgs = {
  subdivision: Scalars['String']['input'];
};


export type QueryJwtArgs = {
  provider: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type QueryNearbySubdivisionsArgs = {
  subdivisionId: Scalars['String']['input'];
};


export type QuerySubdivisionsByCountryArgs = {
  countryCode: Scalars['String']['input'];
};

export type RegisterAnswerResponse = {
  __typename?: 'RegisterAnswerResponse';
  id: Scalars['ID']['output'];
};

export type Subdivision = {
  __typename?: 'Subdivision';
  coordinates: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  eastBound: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  northBound: Scalars['Float']['output'];
  southBound: Scalars['Float']['output'];
  westBound: Scalars['Float']['output'];
};

export type AnswersByDateQueryVariables = Exact<{
  subdivision: Scalars['String']['input'];
}>;


export type AnswersByDateQuery = { __typename?: 'Query', answersByDate: Array<{ __typename?: 'DateAnswers', date: string, yesCount: number, noCount: number }> };

export type AnswersByLocationQueryVariables = Exact<{ [key: string]: never; }>;


export type AnswersByLocationQuery = { __typename?: 'Query', answersByLocation: Array<{ __typename?: 'LocationAnswers', subdivision: string, yesCount: number, noCount: number }> };

export type GetJwtQueryVariables = Exact<{
  provider: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type GetJwtQuery = { __typename?: 'Query', jwt: { __typename?: 'JwtResponse', token: string, expiresAt: string } };

export type RegisterAnswerMutationVariables = Exact<{
  hasSymptoms: Scalars['String']['input'];
  subdivision: Scalars['String']['input'];
  date: Scalars['String']['input'];
}>;


export type RegisterAnswerMutation = { __typename?: 'Mutation', registerAnswer?: { __typename?: 'RegisterAnswerResponse', id: string } | null };

export type SubdivisionsByCountryQueryVariables = Exact<{
  countryCode: Scalars['String']['input'];
}>;


export type SubdivisionsByCountryQuery = { __typename?: 'Query', subdivisionsByCountry: Array<{ __typename?: 'Subdivision', id: string }> };


export const AnswersByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AnswersByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answersByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subdivision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"yesCount"}},{"kind":"Field","name":{"kind":"Name","value":"noCount"}}]}}]}}]} as unknown as DocumentNode<AnswersByDateQuery, AnswersByDateQueryVariables>;
export const AnswersByLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AnswersByLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answersByLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subdivision"}},{"kind":"Field","name":{"kind":"Name","value":"yesCount"}},{"kind":"Field","name":{"kind":"Name","value":"noCount"}}]}}]}}]} as unknown as DocumentNode<AnswersByLocationQuery, AnswersByLocationQueryVariables>;
export const GetJwtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJwt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"provider"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jwt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"provider"},"value":{"kind":"Variable","name":{"kind":"Name","value":"provider"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<GetJwtQuery, GetJwtQueryVariables>;
export const RegisterAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSymptoms"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSymptoms"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSymptoms"}}},{"kind":"Argument","name":{"kind":"Name","value":"subdivision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RegisterAnswerMutation, RegisterAnswerMutationVariables>;
export const SubdivisionsByCountryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SubdivisionsByCountry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subdivisionsByCountry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SubdivisionsByCountryQuery, SubdivisionsByCountryQueryVariables>;
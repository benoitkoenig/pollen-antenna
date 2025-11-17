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
  health: Scalars['String']['output'];
  jwt: JwtResponse;
  nearbySubdivisions: Array<SubdivisionGeography>;
  subdivisions: Array<Subdivision>;
};


export type QueryJwtArgs = {
  provider: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type QueryNearbySubdivisionsArgs = {
  subdivisionId: Scalars['String']['input'];
};


export type QuerySubdivisionsArgs = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RegisterAnswerResponse = {
  __typename?: 'RegisterAnswerResponse';
  id: Scalars['ID']['output'];
};

export type Subdivision = {
  __typename?: 'Subdivision';
  answersByDate: Array<DateAnswers>;
  countryCode: Scalars['String']['output'];
  eastBound: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  northBound: Scalars['Float']['output'];
  southBound: Scalars['Float']['output'];
  westBound: Scalars['Float']['output'];
};


export type SubdivisionAnswersByDateArgs = {
  authenticatedOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SubdivisionGeography = {
  __typename?: 'SubdivisionGeography';
  coordinates: Array<Array<Array<Scalars['Float']['output']>>>;
  countryCode: Scalars['String']['output'];
  eastBound: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  northBound: Scalars['Float']['output'];
  southBound: Scalars['Float']['output'];
  westBound: Scalars['Float']['output'];
};

export type NearbySubdivisionsQueryVariables = Exact<{
  subdivisionId: Scalars['String']['input'];
}>;


export type NearbySubdivisionsQuery = { __typename?: 'Query', nearbySubdivisions: Array<{ __typename?: 'SubdivisionGeography', id: string, coordinates: Array<Array<Array<number>>> }> };

export type SubdivisionsQueryVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
  authenticatedOnly: Scalars['Boolean']['input'];
}>;


export type SubdivisionsQuery = { __typename?: 'Query', subdivisions: Array<{ __typename?: 'Subdivision', id: string, answersByDate: Array<{ __typename?: 'DateAnswers', date: string, yesCount: number, noCount: number }> }> };

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


export type SubdivisionsByCountryQuery = { __typename?: 'Query', subdivisions: Array<{ __typename?: 'Subdivision', id: string }> };


export const NearbySubdivisionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NearbySubdivisions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subdivisionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nearbySubdivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subdivisionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subdivisionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"}}]}}]}}]} as unknown as DocumentNode<NearbySubdivisionsQuery, NearbySubdivisionsQueryVariables>;
export const SubdivisionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Subdivisions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authenticatedOnly"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"answersByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authenticatedOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authenticatedOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"yesCount"}},{"kind":"Field","name":{"kind":"Name","value":"noCount"}}]}}]}}]}}]} as unknown as DocumentNode<SubdivisionsQuery, SubdivisionsQueryVariables>;
export const GetJwtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJwt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"provider"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jwt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"provider"},"value":{"kind":"Variable","name":{"kind":"Name","value":"provider"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<GetJwtQuery, GetJwtQueryVariables>;
export const RegisterAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasSymptoms"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hasSymptoms"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasSymptoms"}}},{"kind":"Argument","name":{"kind":"Name","value":"subdivision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subdivision"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RegisterAnswerMutation, RegisterAnswerMutationVariables>;
export const SubdivisionsByCountryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SubdivisionsByCountry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SubdivisionsByCountryQuery, SubdivisionsByCountryQueryVariables>;
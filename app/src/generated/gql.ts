/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query NearbySubdivisions($subdivisionId: String!) {\n    nearbySubdivisions(subdivisionId: $subdivisionId) {\n      id\n      coordinates\n    }\n  }\n": typeof types.NearbySubdivisionsDocument,
    "\n  query Subdivisions($ids: [String!]!) {\n    subdivisions(ids: $ids) {\n      id\n      answersByDate {\n        date\n        yesCount\n        noCount\n      }\n    }\n  }\n": typeof types.SubdivisionsDocument,
    "\n  query GetJwt($provider: String!, $token: String!) {\n    jwt(provider: $provider, token: $token) {\n      token\n      expiresAt\n    }\n  }\n": typeof types.GetJwtDocument,
    "\n  mutation RegisterAnswer(\n    $hasSymptoms: String!\n    $subdivision: String!\n    $date: String!\n  ) {\n    registerAnswer(\n      hasSymptoms: $hasSymptoms\n      subdivision: $subdivision\n      date: $date\n    ) {\n      id\n    }\n  }\n": typeof types.RegisterAnswerDocument,
    "\n  query SubdivisionsByCountry($countryCode: String!) {\n    subdivisions(countryCode: $countryCode) {\n      id\n    }\n  }\n": typeof types.SubdivisionsByCountryDocument,
};
const documents: Documents = {
    "\n  query NearbySubdivisions($subdivisionId: String!) {\n    nearbySubdivisions(subdivisionId: $subdivisionId) {\n      id\n      coordinates\n    }\n  }\n": types.NearbySubdivisionsDocument,
    "\n  query Subdivisions($ids: [String!]!) {\n    subdivisions(ids: $ids) {\n      id\n      answersByDate {\n        date\n        yesCount\n        noCount\n      }\n    }\n  }\n": types.SubdivisionsDocument,
    "\n  query GetJwt($provider: String!, $token: String!) {\n    jwt(provider: $provider, token: $token) {\n      token\n      expiresAt\n    }\n  }\n": types.GetJwtDocument,
    "\n  mutation RegisterAnswer(\n    $hasSymptoms: String!\n    $subdivision: String!\n    $date: String!\n  ) {\n    registerAnswer(\n      hasSymptoms: $hasSymptoms\n      subdivision: $subdivision\n      date: $date\n    ) {\n      id\n    }\n  }\n": types.RegisterAnswerDocument,
    "\n  query SubdivisionsByCountry($countryCode: String!) {\n    subdivisions(countryCode: $countryCode) {\n      id\n    }\n  }\n": types.SubdivisionsByCountryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NearbySubdivisions($subdivisionId: String!) {\n    nearbySubdivisions(subdivisionId: $subdivisionId) {\n      id\n      coordinates\n    }\n  }\n"): (typeof documents)["\n  query NearbySubdivisions($subdivisionId: String!) {\n    nearbySubdivisions(subdivisionId: $subdivisionId) {\n      id\n      coordinates\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Subdivisions($ids: [String!]!) {\n    subdivisions(ids: $ids) {\n      id\n      answersByDate {\n        date\n        yesCount\n        noCount\n      }\n    }\n  }\n"): (typeof documents)["\n  query Subdivisions($ids: [String!]!) {\n    subdivisions(ids: $ids) {\n      id\n      answersByDate {\n        date\n        yesCount\n        noCount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetJwt($provider: String!, $token: String!) {\n    jwt(provider: $provider, token: $token) {\n      token\n      expiresAt\n    }\n  }\n"): (typeof documents)["\n  query GetJwt($provider: String!, $token: String!) {\n    jwt(provider: $provider, token: $token) {\n      token\n      expiresAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterAnswer(\n    $hasSymptoms: String!\n    $subdivision: String!\n    $date: String!\n  ) {\n    registerAnswer(\n      hasSymptoms: $hasSymptoms\n      subdivision: $subdivision\n      date: $date\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterAnswer(\n    $hasSymptoms: String!\n    $subdivision: String!\n    $date: String!\n  ) {\n    registerAnswer(\n      hasSymptoms: $hasSymptoms\n      subdivision: $subdivision\n      date: $date\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubdivisionsByCountry($countryCode: String!) {\n    subdivisions(countryCode: $countryCode) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query SubdivisionsByCountry($countryCode: String!) {\n    subdivisions(countryCode: $countryCode) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
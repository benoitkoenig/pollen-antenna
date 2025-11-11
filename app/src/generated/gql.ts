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
    "\n  query GetJwt($provider: String!, $token: String!) {\n    jwt(provider: $provider, token: $token) {\n      token\n    }\n  }\n": typeof types.GetJwtDocument,
    "\n  query AnswersByDate($country: String!, $subdivision: String!) {\n    answersByDate(country: $country, subdivision: $subdivision) {\n      date\n      yesCount\n      noCount\n    }\n  }\n": typeof types.AnswersByDateDocument,
    "\n  query AnswersByLocation {\n    answersByLocation {\n      country\n      subdivision\n      yesCount\n      noCount\n    }\n  }\n": typeof types.AnswersByLocationDocument,
    "\n  mutation RegisterAnswer(\n    $hasSymptoms: String!\n    $country: String!\n    $subdivision: String!\n    $date: String!\n  ) {\n    registerAnswer(\n      hasSymptoms: $hasSymptoms\n      country: $country\n      subdivision: $subdivision\n      date: $date\n    ) {\n      id\n    }\n  }\n": typeof types.RegisterAnswerDocument,
};
const documents: Documents = {
    "\n  query GetJwt($provider: String!, $token: String!) {\n    jwt(provider: $provider, token: $token) {\n      token\n    }\n  }\n": types.GetJwtDocument,
    "\n  query AnswersByDate($country: String!, $subdivision: String!) {\n    answersByDate(country: $country, subdivision: $subdivision) {\n      date\n      yesCount\n      noCount\n    }\n  }\n": types.AnswersByDateDocument,
    "\n  query AnswersByLocation {\n    answersByLocation {\n      country\n      subdivision\n      yesCount\n      noCount\n    }\n  }\n": types.AnswersByLocationDocument,
    "\n  mutation RegisterAnswer(\n    $hasSymptoms: String!\n    $country: String!\n    $subdivision: String!\n    $date: String!\n  ) {\n    registerAnswer(\n      hasSymptoms: $hasSymptoms\n      country: $country\n      subdivision: $subdivision\n      date: $date\n    ) {\n      id\n    }\n  }\n": types.RegisterAnswerDocument,
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
export function graphql(source: "\n  query GetJwt($provider: String!, $token: String!) {\n    jwt(provider: $provider, token: $token) {\n      token\n    }\n  }\n"): (typeof documents)["\n  query GetJwt($provider: String!, $token: String!) {\n    jwt(provider: $provider, token: $token) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AnswersByDate($country: String!, $subdivision: String!) {\n    answersByDate(country: $country, subdivision: $subdivision) {\n      date\n      yesCount\n      noCount\n    }\n  }\n"): (typeof documents)["\n  query AnswersByDate($country: String!, $subdivision: String!) {\n    answersByDate(country: $country, subdivision: $subdivision) {\n      date\n      yesCount\n      noCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AnswersByLocation {\n    answersByLocation {\n      country\n      subdivision\n      yesCount\n      noCount\n    }\n  }\n"): (typeof documents)["\n  query AnswersByLocation {\n    answersByLocation {\n      country\n      subdivision\n      yesCount\n      noCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterAnswer(\n    $hasSymptoms: String!\n    $country: String!\n    $subdivision: String!\n    $date: String!\n  ) {\n    registerAnswer(\n      hasSymptoms: $hasSymptoms\n      country: $country\n      subdivision: $subdivision\n      date: $date\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterAnswer(\n    $hasSymptoms: String!\n    $country: String!\n    $subdivision: String!\n    $date: String!\n  ) {\n    registerAnswer(\n      hasSymptoms: $hasSymptoms\n      country: $country\n      subdivision: $subdivision\n      date: $date\n    ) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
export const typeDefs = `#graphql
scalar Json

type Query {
  health: String!
  jwt(provider: String!, token: String!): JwtResponse!
  nearbySubdivisions(subdivisionId: String!): [Subdivision!]!
  subdivisions(countryCode: String, ids: [String!]): [Subdivision!]!
}

type DateAnswers {
  date: String!
  yesCount: Int!
  noCount: Int!
}

type JwtResponse {
  token: String!
  expiresAt: String!
}

type RegisterAnswerResponse {
  id: ID!
}

type Subdivision {
  id: ID!
  countryCode: String!
  northBound: Float!
  eastBound: Float!
  westBound: Float!
  southBound: Float!
  answersByDate(authenticatedOnly: Boolean): [DateAnswers!]!
}

type Mutation {
  registerAnswer(hasSymptoms: String!, subdivision: String!, date: String!): RegisterAnswerResponse
}
`;

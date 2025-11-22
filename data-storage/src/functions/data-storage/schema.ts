export const typeDefs = `#graphql
scalar Json

type Query {
  health: String!
  jwt(provider: String!, token: String!): JwtResponse!
  nearbySubdivisions(subdivisionId: String!): [SubdivisionGeography!]!
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

# Subdivision cold-data. Responses to this query are safe to cache for long durations.
# Since "geoJson" is very heavy, it can only be accessed on "SubdivisionGeography"
type SubdivisionGeography {
  id: ID!
  countryCode: String!
  geoJson: Json!
  northBound: Float!
  eastBound: Float!
  westBound: Float!
  southBound: Float!
}

type Mutation {
  registerAnswer(hasSymptoms: String!, subdivision: String!, date: String!): RegisterAnswerResponse
}
`;

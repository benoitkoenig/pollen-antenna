export const typeDefs = `#graphql
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
  answersByDate: [DateAnswers!]!
}

# Subdivision cold-data. Responses to this query are safe to cache for long durations.
# Since "coordinates" are very heavy, they can only be accessed on "SubdivisionGeography"
type SubdivisionGeography {
  id: ID!
  countryCode: String!
  coordinates: [[[Float!]!]!]!
  northBound: Float!
  eastBound: Float!
  westBound: Float!
  southBound: Float!
}

type Mutation {
  registerAnswer(hasSymptoms: String!, subdivision: String!, date: String!): RegisterAnswerResponse
}
`;

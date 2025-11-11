export const typeDefs = `#graphql
type Query {
  health: String!
  answersByDate(country: String!, subdivision: String!): [DateAnswers!]!
  answersByLocation: [LocationAnswers!]!
  jwt(provider: String!, token: String!): JwtResponse!
}

type DateAnswers {
  date: String!
  yesCount: Int!
  noCount: Int!
}

type LocationAnswers {
  country: String!
  subdivision: String!
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

type Mutation {
  registerAnswer(hasSymptoms: String!, country: String!, subdivision: String!, date: String!): RegisterAnswerResponse
}
`;

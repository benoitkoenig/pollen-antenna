import { answersResolvers } from "./answers";
import { authenticationResolvers } from "./authentication";
import { healthResolvers } from "./health";

export const resolvers = [
  answersResolvers,
  authenticationResolvers,
  healthResolvers,
];

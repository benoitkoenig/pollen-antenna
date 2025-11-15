import { answersResolvers } from "./answers";
import { authenticationResolvers } from "./authentication";
import { healthResolvers } from "./health";
import { subdivisionsResolvers } from "./subdivisions";

export const resolvers = [
  answersResolvers,
  authenticationResolvers,
  subdivisionsResolvers,
  healthResolvers,
];

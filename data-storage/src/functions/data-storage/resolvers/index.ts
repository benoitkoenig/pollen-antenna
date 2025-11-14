import { answersResolvers } from "./answers";
import { authenticationResolvers } from "./authentication";
import { geolocationResolvers } from "./geolocation";
import { healthResolvers } from "./health";

export const resolvers = [
  answersResolvers,
  authenticationResolvers,
  geolocationResolvers,
  healthResolvers,
];

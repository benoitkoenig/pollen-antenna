import { ApolloServer } from "@apollo/server";

import type { AuthContext } from "./middlewares/auth";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export const server = new ApolloServer<AuthContext>({
  typeDefs: [typeDefs],
  resolvers,
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

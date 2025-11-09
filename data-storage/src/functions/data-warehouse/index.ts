import { ApolloServer, type HeaderMap } from "@apollo/server";
import {
  app,
  type HttpRequest,
  type HttpResponseInit,
  type InvocationContext,
} from "@azure/functions";

import { getSequelize } from "../../database/get-sequelize";

const typeDefs = `#graphql
type Query {
  health: String!
}

type Mutation {
  registerAnswer(hasSymptoms: String!, country: String!, subdivision: String!): String
}
`;

interface RegisterAnswerArgs {
  hasSymptoms: boolean;
  country: string;
  subdivision: string;
}

const resolvers = {
  Query: {
    health: () => "ok",
  },
  Mutation: {
    registerAnswer: async (
      _: unknown,
      { hasSymptoms, country, subdivision }: RegisterAnswerArgs,
    ) => {
      const sequelize = await getSequelize();

      try {
        await sequelize.models["Answers"].create({
          hasSymptoms,
          country,
          subdivision,
        });
      } finally {
        sequelize.connectionManager.close();
      }

      return "ok";
    },
  },
};

const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers,
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

export async function ewiDataCollector(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const normalizedRequest = {
    method: request.method,
    headers: request.headers as unknown as HeaderMap,
    search: new URL(request.url).search,
    body: await request.json(),
  };

  const { body, headers, status } = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: normalizedRequest,
    context: () => Promise.resolve(context),
  });

  if (body.kind === "chunked") {
    throw Error("Incremental delivery not implemented");
  }

  return {
    status: status ?? 200,
    headers: {
      ...Object.fromEntries(headers),
      "content-length": Buffer.byteLength(body.string).toString(),
    },
    body: body.string,
  };
}

app.http("ewi-data-collector", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: ewiDataCollector,
});

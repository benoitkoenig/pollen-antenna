import { ApolloServer, type HeaderMap } from "@apollo/server";
import {
  app,
  type HttpRequest,
  type HttpResponseInit,
  type InvocationContext,
} from "@azure/functions";
import * as jwt from "jsonwebtoken";
import { QueryTypes } from "sequelize";

import { getSequelize } from "../../database/get-sequelize";

import getAuthId from "./get-auth-id";

const typeDefs = `#graphql
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
}

type RegisterAnswerResponse {
  id: ID!
}

type Mutation {
  registerAnswer(hasSymptoms: String!, country: String!, subdivision: String!, date: String!): RegisterAnswerResponse
}
`;

interface RegisterAnswerArgs {
  hasSymptoms: boolean;
  country: string;
  subdivision: string;
  date: string;
}

interface AnswersByDateArgs {
  country: string;
  subdivision: string;
}

interface JwtArgs {
  provider: string;
  token: string;
}

const resolvers = {
  Query: {
    health: () => "ok",
    answersByDate: async (
      _: unknown,
      { country, subdivision }: AnswersByDateArgs,
    ) => {
      const sequelize = await getSequelize();

      try {
        const results = await sequelize.query(
          `
          SELECT
            CAST("createdAt" AS DATE) as date,
            SUM(CASE WHEN "hasSymptoms" = 'yes' THEN 1 ELSE 0 END) as "yesCount",
            SUM(CASE WHEN "hasSymptoms" = 'no' THEN 1 ELSE 0 END) as "noCount"
          FROM "Answers"
          WHERE "country" = :country AND "subdivision" = :subdivision
          GROUP BY CAST("createdAt" AS DATE)
          ORDER BY "date" DESC
          `,
          {
            replacements: { country, subdivision },
            type: QueryTypes.SELECT,
          },
        );

        return results;
      } finally {
        sequelize.connectionManager.close();
      }
    },
    answersByLocation: async () => {
      const sequelize = await getSequelize();

      try {
        const results = await sequelize.query(
          `
          SELECT
            "country",
            "subdivision",
            SUM(CASE WHEN "hasSymptoms" = 'yes' THEN 1 ELSE 0 END) as "yesCount",
            SUM(CASE WHEN "hasSymptoms" = 'no' THEN 1 ELSE 0 END) as "noCount"
          FROM "Answers"
          WHERE CAST("createdAt" AS DATE) = CURRENT_DATE
          GROUP BY "country", "subdivision"
          ORDER BY "country", "subdivision"
          `,
          {
            type: QueryTypes.SELECT,
          },
        );

        return results;
      } finally {
        sequelize.connectionManager.close();
      }
    },
    jwt: async (_: unknown, { provider, token }: JwtArgs) => {
      const authId = await getAuthId(provider, token);

      const jwtSecret = process.env["JWT_SECRET"];
      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not configured");
      }

      return {
        token: jwt.sign({ authId }, jwtSecret, {
          expiresIn: "1h",
        }),
      };
    },
  },
  Mutation: {
    registerAnswer: async (
      _: unknown,
      { hasSymptoms, country, subdivision, date }: RegisterAnswerArgs,
    ) => {
      const sequelize = await getSequelize();

      try {
        const answer = await sequelize.models["Answers"].create({
          hasSymptoms,
          country,
          subdivision,
          authId: null, // TODO
          date,
        });

        return { id: answer.get("id") };
      } finally {
        sequelize.connectionManager.close();
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers,
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

export async function pollenAntenna(
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

app.http("pollen-antenna", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: pollenAntenna,
});

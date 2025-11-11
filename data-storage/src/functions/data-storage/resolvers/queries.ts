import * as jwt from "jsonwebtoken";
import { QueryTypes } from "sequelize";

import { getSequelize } from "../../../database/get-sequelize";
import getUserId from "../get-user-id";

export interface AnswersByDateArgs {
  country: string;
  subdivision: string;
}

export interface JwtArgs {
  provider: string;
  token: string;
}

export const queries = {
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
    const userId = await getUserId(provider, token);

    const jwtSecret = process.env["JWT_SECRET"];
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const jwtToken = jwt.sign({ userId }, jwtSecret, {
      expiresIn: "70m", // Must last a little longer than {@link expiresAt}
    });

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    return {
      token: jwtToken,
      expiresAt: expiresAt.toUTCString(),
    };
  },
};

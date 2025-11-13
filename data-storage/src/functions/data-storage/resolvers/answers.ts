import { QueryTypes } from "sequelize";

import { getSequelize } from "../../../database/get-sequelize";
import type { ExtendedContext } from "../middlewares";

export interface AnswersByDateArgs {
  country: string;
  subdivision: string;
}

export interface RegisterAnswerArgs {
  hasSymptoms: boolean;
  country: string;
  subdivision: string;
  date: string;
}

export const answersResolvers = {
  Query: {
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
  },
  Mutation: {
    registerAnswer: async (
      _: unknown,
      { hasSymptoms, country, subdivision, date }: RegisterAnswerArgs,
      context: ExtendedContext,
    ) => {
      const sequelize = await getSequelize();

      try {
        const answer = await sequelize.models["Answers"].create({
          hasSymptoms,
          country,
          subdivision,
          userId: context.userId,
          date,
        });

        return { id: answer.get("id") };
      } finally {
        sequelize.connectionManager.close();
      }
    },
  },
};

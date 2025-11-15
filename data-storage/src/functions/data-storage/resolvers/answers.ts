import { QueryTypes } from "sequelize";

import { getSequelize } from "../../../database/get-sequelize";
import type { ExtendedContext } from "../middlewares";

export interface AnswersByDateArgs {
  subdivision: string;
}

export interface RegisterAnswerArgs {
  hasSymptoms: boolean;
  subdivision: string;
  date: string;
}

export const answersResolvers = {
  Query: {
    answersByDate: async (_: unknown, { subdivision }: AnswersByDateArgs) => {
      const sequelize = await getSequelize();

      try {
        const results = await sequelize.query(
          `
          SELECT
            CAST("createdAt" AS DATE) as date,
            SUM(CASE WHEN "hasSymptoms" = 'yes' THEN 1 ELSE 0 END) as "yesCount",
            SUM(CASE WHEN "hasSymptoms" = 'no' THEN 1 ELSE 0 END) as "noCount"
          FROM "Answers"
          WHERE "subdivision" = :subdivision
          GROUP BY CAST("createdAt" AS DATE)
          ORDER BY "date" DESC
          `,
          {
            replacements: { subdivision },
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
            "subdivision",
            SUM(CASE WHEN "hasSymptoms" = 'yes' THEN 1 ELSE 0 END) as "yesCount",
            SUM(CASE WHEN "hasSymptoms" = 'no' THEN 1 ELSE 0 END) as "noCount"
          FROM "Answers"
          WHERE CAST("createdAt" AS DATE) = CURRENT_DATE
          GROUP BY "subdivision"
          ORDER BY "subdivision"
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
      { hasSymptoms, subdivision, date }: RegisterAnswerArgs,
      context: ExtendedContext,
    ) => {
      const sequelize = await getSequelize();

      try {
        const answer = await sequelize.models["Answers"].create({
          hasSymptoms,
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

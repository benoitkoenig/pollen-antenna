import { getSequelize } from "../../../database/get-sequelize";
import type { ExtendedContext } from "../middlewares";

export interface RegisterAnswerArgs {
  hasSymptoms: boolean;
  subdivision: string;
  date: string;
}

export const answersResolvers = {
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

import { getSequelize } from "../../../database/get-sequelize";
import type { ExtendedContext } from "../middlewares";

export interface RegisterAnswerArgs {
  hasSymptoms: boolean;
  country: string;
  subdivision: string;
  date: string;
}

export const mutations = {
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
};

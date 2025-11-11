import { getSequelize } from "../../../database/get-sequelize";

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
  ) => {
    const sequelize = await getSequelize();

    try {
      const answer = await sequelize.models["Answers"].create({
        hasSymptoms,
        country,
        subdivision,
        userId: null, // TODO
        date,
      });

      return { id: answer.get("id") };
    } finally {
      sequelize.connectionManager.close();
    }
  },
};

import { QueryTypes, Op } from "sequelize";

import { getSequelize } from "../../../database/get-sequelize";

export interface Subdivision {
  id: string;
}

export interface NearbySubdivisionsArgs {
  subdivisionId: string;
}

export interface SubdivisionsArgs {
  countryCode?: string;
  ids?: string[];
}

export const geolocationResolvers = {
  Query: {
    nearbySubdivisions: async (
      _: unknown,
      { subdivisionId }: NearbySubdivisionsArgs,
    ) => {
      const sequelize = await getSequelize();

      try {
        const targetSubdivision =
          await sequelize.models["Subdivisions"].findByPk(subdivisionId);

        if (!targetSubdivision) {
          throw new Error(`Subdivision with id ${subdivisionId} not found`);
        }

        const northBound = targetSubdivision.get("northBound") as number;
        const eastBound = targetSubdivision.get("eastBound") as number;
        const westBound = targetSubdivision.get("westBound") as number;
        const southBound = targetSubdivision.get("southBound") as number;

        const results = await sequelize.models["Subdivisions"].findAll({
          where: {
            eastBound: { [Op.gt]: westBound },
            westBound: { [Op.lt]: eastBound },
            northBound: { [Op.gt]: southBound },
            southBound: { [Op.lt]: northBound },
          },
          order: [["id", "ASC"]],
          raw: true,
        });

        return results;
      } finally {
        sequelize.connectionManager.close();
      }
    },
    subdivisions: async (
      _: unknown,
      { countryCode, ids }: SubdivisionsArgs,
    ) => {
      if (!countryCode && !ids) {
        throw new Error("At least one of countryCode or ids must be provided");
      }

      const sequelize = await getSequelize();

      try {
        const where: Record<string, unknown> = {};

        if (countryCode) {
          where.countryCode = countryCode;
        }
        if (ids) {
          where.id = { [Op.in]: ids };
        }

        const results = await sequelize.models["Subdivisions"].findAll({
          where,
          order: [["id", "ASC"]],
          raw: true,
        });

        return results;
      } finally {
        sequelize.connectionManager.close();
      }
    },
  },
  Subdivision: {
    answersByDate: async (parent: Subdivision) => {
      const sequelize = await getSequelize();

      try {
        const results = await sequelize.query(
          `
          SELECT
            "date",
            SUM(CASE WHEN "hasSymptoms" = 'yes' THEN 1 ELSE 0 END) as "yesCount",
            SUM(CASE WHEN "hasSymptoms" = 'no' THEN 1 ELSE 0 END) as "noCount"
          FROM "Answers"
          WHERE "subdivision" = :subdivision
          GROUP BY "date"
          ORDER BY "date" DESC
          `,
          {
            replacements: { subdivision: parent.id },
            type: QueryTypes.SELECT,
          },
        );

        return results;
      } finally {
        sequelize.connectionManager.close();
      }
    },
  },
};

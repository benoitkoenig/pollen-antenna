import { Op } from "sequelize";

import { getSequelize } from "../../../database/get-sequelize";

export interface NearbySubdivisionsArgs {
  subdivisionId: string;
}

export interface SubdivisionsByCountryArgs {
  countryCode: string;
}

export interface SubdivisionsByIdArgs {
  ids: string[];
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
    subdivisionsByCountry: async (
      _: unknown,
      { countryCode }: SubdivisionsByCountryArgs,
    ) => {
      const sequelize = await getSequelize();

      try {
        const results = await sequelize.models["Subdivisions"].findAll({
          where: { countryCode },
          order: [["id", "ASC"]],
          raw: true,
        });

        return results;
      } finally {
        sequelize.connectionManager.close();
      }
    },
    subdivisionsById: async (_: unknown, { ids }: SubdivisionsByIdArgs) => {
      const sequelize = await getSequelize();

      try {
        const results = await sequelize.models["Subdivisions"].findAll({
          where: { id: { [Op.in]: ids } },
          order: [["id", "ASC"]],
          raw: true,
        });

        return results;
      } finally {
        sequelize.connectionManager.close();
      }
    },
  },
};

import { QueryTypes } from "sequelize";

import { getSequelize } from "../../../database/get-sequelize";

export interface NearbySubdivisionsArgs {
  subdivisionId: string;
}

export const geolocationResolvers = {
  Query: {
    nearbySubdivisions: async (
      _: unknown,
      { subdivisionId }: NearbySubdivisionsArgs,
    ) => {
      const sequelize = await getSequelize();

      try {
        // First, get the bounds of the target subdivision
        const targetSubdivision =
          await sequelize.models["Subdivisions"].findByPk(subdivisionId);

        if (!targetSubdivision) {
          throw new Error(`Subdivision with id ${subdivisionId} not found`);
        }

        const northBound = targetSubdivision.get("northBound") as number;
        const eastBound = targetSubdivision.get("eastBound") as number;
        const westBound = targetSubdivision.get("westBound") as number;
        const southBound = targetSubdivision.get("southBound") as number;

        // Query for subdivisions that overlap with the target subdivision's bounding box
        // Two bounding boxes overlap if:
        // - The target's westBound is less than the other's eastBound
        // - The target's eastBound is greater than the other's westBound
        // - The target's southBound is less than the other's northBound
        // - The target's northBound is greater than the other's southBound
        const results = await sequelize.query(
          `
          SELECT
            id,
            "countryCode",
            coordinates,
            "northBound",
            "eastBound",
            "westBound",
            "southBound"
          FROM "Subdivisions"
          WHERE
            :westBound < "eastBound" AND
            :eastBound > "westBound" AND
            :southBound < "northBound" AND
            :northBound > "southBound"
          ORDER BY id
          `,
          {
            replacements: { northBound, eastBound, westBound, southBound },
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

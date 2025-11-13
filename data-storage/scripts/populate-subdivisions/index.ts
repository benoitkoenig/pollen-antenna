/**
 * License: Data from geoBoundaries under CC BY 4.0
 * Attribution: Runfola, D. et al. (2020) geoBoundaries: A global database of political administrative boundaries
 */

import { countryCodes } from "@pollen-antenna/static-data";

import { getSequelize } from "../../src/database/get-sequelize.ts";

import { fetchFeatures } from "./fetch-features.ts";
import mapFeatureToSubdivision from "./map-feature-to-subdivision.ts";

async function populateSubdivisions() {
  for (const countryCode of countryCodes) {
    // Wait a delay to not surcharge the API
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

    try {
      const features = await fetchFeatures(countryCode);
      const subdivisions = features.map((feature) =>
        mapFeatureToSubdivision(feature),
      );
      const sequelize = await getSequelize();

      try {
        for (const subdivision of subdivisions) {
          sequelize.models["Subdivisions"].create({
            ...subdivision,
            countryCode,
          });
        }

        console.log(`✔ Subdivisions uploaded for ${countryCode}`);
      } finally {
        sequelize.connectionManager.close();
      }
    } catch (err) {
      console.error(
        `An error occured on ${countryCode}:`,
        err instanceof Error ? err.message : err,
      );
    }
  }
}

populateSubdivisions();

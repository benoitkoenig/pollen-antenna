/**
 * License: Data from geoBoundaries under CC BY 4.0
 * Attribution: Runfola, D. et al. (2020) geoBoundaries: A global database of political administrative boundaries
 */

// import { countryCodes } from "@pollen-antenna/static-data";

import { Sequelize } from "sequelize";

import { defineSubdivisionsModel } from "../../src/database/models/subdivisions.ts";

import { fetchFeatures } from "./fetch-features.ts";
import mapFeatureToSubdivision from "./map-feature-to-subdivision.ts";

const DATABASE_URL = process.env["DATABASE_URL"];

const countryCodes = ["bel", "usa"];

async function populateSubdivisions() {
  if (!DATABASE_URL) {
    throw new Error("Missing DATABASE_URL");
  }

  const s = new Sequelize(DATABASE_URL);
  defineSubdivisionsModel(s);

  for (const countryCode of countryCodes) {
    // Wait a delay to not surcharge the API
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

    try {
      const features = await fetchFeatures(countryCode);
      const subdivisions = features.map((feature) =>
        mapFeatureToSubdivision(feature),
      );

      for (const subdivision of subdivisions) {
        s.models["Subdivisions"].create({
          ...subdivision,
          countryCode,
        });
      }

      console.log(`✔ Subdivisions uploaded for ${countryCode}`);
    } catch (err) {
      console.error(
        `An error occured on ${countryCode}:`,
        err instanceof Error ? err.message : err,
      );
    }
  }
}

populateSubdivisions();

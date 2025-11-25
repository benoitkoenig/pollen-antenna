/**
 * License: Data from geoBoundaries under CC BY 4.0
 * Attribution: Runfola, D. et al. (2020) geoBoundaries: A global database of political administrative boundaries
 */

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { countryCodes } from "../../../static-data/src/countries.ts";

import { fetchFeatures } from "./fetch-features.ts";

const DIR_PATH = "./public/geo-json";

async function populateSubdivisions() {
  if (!existsSync(DIR_PATH)) {
    await mkdir(DIR_PATH, {
      recursive: true,
    });
  }

  for (const countryCode of countryCodes) {
    // Wait a delay to not surcharge the API
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

    try {
      const features = await fetchFeatures(countryCode);

      for (const feature of features) {
        await writeFile(
          path.join(DIR_PATH, `${feature.properties.shapeID}.json`),
          JSON.stringify(feature),
        );
      }

      console.log(`✔ Subdivisions saved for ${countryCode}`);
    } catch (err) {
      console.error(
        `An error occured on ${countryCode}:`,
        err instanceof Error ? err.message : err,
      );
    }
  }
}

populateSubdivisions();

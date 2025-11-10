/**
 * License: Data from geoBoundaries under CC BY 4.0
 * Attribution: Runfola, D. et al. (2020) geoBoundaries: A global database of political administrative boundaries
 */

import { writeFile } from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

import { countryCodes } from "../../src/countries.ts";

import { fetchSubdivisions } from "./fetch-subdivisions.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(
  __dirname,
  "..",
  "..",
  "src",
  "subdivisions-per-country",
);

async function syncSubdivisions() {
  for (const countryCode of countryCodes) {
    const outputPath = path.join(OUTPUT_DIR, `${countryCode}.json`);

    // Wait a delay to not surcharge the API
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

    try {
      const subdivisions = await fetchSubdivisions(countryCode);

      await writeFile(
        outputPath,
        JSON.stringify(subdivisions, null, 2),
        "utf-8",
      );
    } catch (err) {
      console.error(
        `An error occured on ${countryCode}:`,
        err instanceof Error ? err.message : err,
      );

      await writeFile(outputPath, "[]", "utf-8");
    }
  }
}

syncSubdivisions();

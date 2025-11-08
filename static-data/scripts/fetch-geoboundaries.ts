#!/usr/bin/env node

/**
 * Fetches geoBoundaries data for all countries and outputs JSON files
 * with subdivisions (ADM1 level).
 *
 * License: Data from geoBoundaries under CC BY 4.0
 * Attribution: Runfola, D. et al. (2020) geoBoundaries: A global database of political administrative boundaries
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import { countryCodes } from "../src/countries.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "src", "subdivisions-per-country");
const API_BASE = "https://www.geoboundaries.org/api/current/gbOpen";
const DELAY_MS = 500; // Delay between API calls to be respectful

interface GeoBoundariesResponse {
  boundaryID: string;
  boundaryName: string;
  boundaryISO: string;
  boundaryType: string;
  gjDownloadURL?: string;
  [key: string]: unknown;
}

interface CountrySubdivision {
  id: string;
  name: string;
}

/**
 * Delay execution for the specified number of milliseconds
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch ADM1 boundaries for a specific country
 */
async function fetchCountryADM1(
  countryCode: string,
): Promise<CountrySubdivision[] | null> {
  const url = `${API_BASE}/${countryCode}/ADM1/`;

  try {
    console.log(`Fetching ${countryCode}...`);
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`  No ADM1 data available for ${countryCode}`);
        return null;
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as
      | GeoBoundariesResponse
      | GeoBoundariesResponse[];

    const boundaries = Array.isArray(data) ? data : [data];

    // If we got metadata with download URL, we need to fetch the actual GeoJSON
    if (boundaries[0]?.gjDownloadURL) {
      console.log(`  Fetching GeoJSON for ${countryCode}...`);
      const geoJsonUrl = boundaries[0].gjDownloadURL;
      const geoResponse = await fetch(geoJsonUrl);

      if (!geoResponse.ok) {
        throw new Error(`Failed to fetch GeoJSON: HTTP ${geoResponse.status}`);
      }

      const geoJson = await geoResponse.json();

      // Extract subdivisions from GeoJSON features
      if (geoJson.features && Array.isArray(geoJson.features)) {
        const subdivisions: CountrySubdivision[] = geoJson.features.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (feature: any) => ({
            id:
              feature.properties.shapeID ||
              feature.properties.shapeName ||
              feature.properties.HASC_1 ||
              "",
            name:
              feature.properties.shapeName ||
              feature.properties.name ||
              feature.properties.NAME_1 ||
              "",
          }),
        );

        console.log(
          `  ✓ Found ${subdivisions.length} subdivisions for ${countryCode}`,
        );
        return subdivisions;
      }
    }

    // Fallback: use the metadata directly if available
    const subdivisions: CountrySubdivision[] = boundaries.map((boundary) => ({
      id: boundary.boundaryID || boundary.boundaryISO || "",
      name: boundary.boundaryName || "",
    }));

    console.log(
      `  ✓ Found ${subdivisions.length} subdivisions for ${countryCode}`,
    );
    return subdivisions;
  } catch (error) {
    console.error(
      `  ✗ Error fetching ${countryCode}:`,
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

/**
 * Main function to fetch all countries and save to files
 */
async function main() {
  console.log("Starting geoBoundaries data fetch...\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}\n`);
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // Process each country
  for (const countryCode of countryCodes) {
    const subdivisions = await fetchCountryADM1(countryCode);

    if (subdivisions && subdivisions.length > 0) {
      // Save to file
      const outputPath = path.join(
        OUTPUT_DIR,
        `${countryCode.toLowerCase()}.json`,
      );
      fs.writeFileSync(
        outputPath,
        JSON.stringify(subdivisions, null, 2),
        "utf-8",
      );
      successCount++;
    } else if (subdivisions === null) {
      skipCount++;
    } else {
      errorCount++;
    }

    // Be respectful to the API
    await delay(DELAY_MS);
  }

  console.log("\n" + "=".repeat(50));
  console.log("Fetch complete!");
  console.log(`✓ Success: ${successCount} countries`);
  console.log(`- Skipped: ${skipCount} countries (no ADM1 data)`);
  console.log(`✗ Errors: ${errorCount} countries`);
  console.log(`\nOutput directory: ${OUTPUT_DIR}`);
  console.log("\nAttribution: Boundary data from geoBoundaries,");
  console.log("Runfola, D. et al. (2020) geoBoundaries: A global database of");
  console.log("political administrative boundaries. CC BY 4.0");
}

// Run the script
main().catch(console.error);

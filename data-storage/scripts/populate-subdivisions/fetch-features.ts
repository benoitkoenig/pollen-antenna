import { z } from "zod";

import type { CountryCode } from "@pollen-antenna/static-data";

const API_BASE = "https://www.geoboundaries.org/api/current/gbOpen";

const Adm1Schema = z.object({
  boundaryISO: z.string(),
  simplifiedGeometryGeoJSON: z.url(),
});

const GeoJsonSchema = z.object({
  features: z.array(
    z.object({
      properties: z.object({
        shapeID: z.string(),
      }),
      geometry: z.discriminatedUnion("type", [
        z.object({
          type: z.literal("Polygon"),
          coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
        }),
        z.object({
          type: z.literal("MultiPolygon"),
          coordinates: z.array(
            z.array(z.array(z.tuple([z.number(), z.number()]))),
          ),
        }),
      ]),
    }),
  ),
});

export type Feature = z.infer<typeof GeoJsonSchema>["features"][number];

export async function fetchFeatures(countryCode: CountryCode) {
  const response = await fetch(
    `${API_BASE}/${countryCode.toUpperCase()}/ADM1/`,
  );

  if (response.status === 404) {
    return [];
  }

  const json = await response.json();
  const { boundaryISO, simplifiedGeometryGeoJSON } = Adm1Schema.parse(json);

  if (boundaryISO !== countryCode.toUpperCase()) {
    throw new Error("boundaryISO and countryCode mismatch");
  }

  const response2 = await fetch(simplifiedGeometryGeoJSON);
  const json2 = await response2.json();
  const features = GeoJsonSchema.parse(json2).features;

  if (features.length === 0) {
    throw new Error(
      "Expected countries with no subdivisions to return 404 on the first call",
    );
  }

  return features;
}

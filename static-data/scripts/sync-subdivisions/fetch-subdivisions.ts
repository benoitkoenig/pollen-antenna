import type { CountryCode } from "countries";
import z from "zod";

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
    }),
  ),
});

export async function fetchSubdivisions(countryCode: CountryCode) {
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
  const subdivisions = GeoJsonSchema.parse(json2).features.map(
    ({ properties: { shapeID } }) => shapeID,
  );

  if (subdivisions.length === 0) {
    throw new Error(
      "Expected countries with no subdivisions to return 404 on the first call",
    );
  }

  return subdivisions;
}

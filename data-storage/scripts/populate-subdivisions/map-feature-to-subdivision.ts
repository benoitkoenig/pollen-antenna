import type { Feature } from "./fetch-features";

export default function mapFeatureToSubdivision(feature: Feature) {
  const coordinates =
    feature.geometry.type === "Polygon"
      ? [feature.geometry.coordinates.flat()]
      : feature.geometry.coordinates.map((a) => a.flat());

  let northBound = coordinates[0][0][1] as number;
  let southBound = coordinates[0][0][1] as number;
  let eastBound = coordinates[0][0][0] as number;
  let westBound = coordinates[0][0][0] as number;

  for (const a of coordinates) {
    for (const b of a) {
      const [lng, lat] = b as [number, number];

      if (lat > northBound) {
        northBound = lat;
      }
      if (lat < southBound) {
        southBound = lat;
      }
      if (lng > eastBound) {
        eastBound = lng;
      }
      if (lng < westBound) {
        westBound = lng;
      }
    }
  }

  return {
    id: feature.properties.shapeID,
    coordinates,
    northBound,
    southBound,
    eastBound,
    westBound,
  };
}

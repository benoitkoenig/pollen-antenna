import type { Feature } from "./fetch-features";

export default function mapFeatureToSubdivision(feature: Feature) {
  const coordinates =
    feature.geometry.type === "Polygon"
      ? feature.geometry.coordinates.flat()
      : feature.geometry.coordinates.flat(2);

  let northBound = coordinates[0][1];
  let southBound = coordinates[0][1];
  let eastBound = coordinates[0][0];
  let westBound = coordinates[0][0];

  for (const [lng, lat] of coordinates) {
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

  return {
    id: feature.properties.shapeID,
    geoJson: feature,
    northBound,
    southBound,
    eastBound,
    westBound,
  };
}

import { geoEquirectangular, geoPath } from "d3";

interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface Dimensions {
  width: number;
  height: number;
}

export function computeGeoProjection(
  boundingBox: BoundingBox | undefined,
  dimensions: Dimensions | null,
) {
  if (!boundingBox || !dimensions) {
    return geoPath().projection(geoEquirectangular().scale(250));
  }

  const centerLon = (boundingBox.west + boundingBox.east) / 2;
  const centerLat = (boundingBox.south + boundingBox.north) / 2;

  const lonSpan = boundingBox.east - boundingBox.west;
  const latSpan = boundingBox.north - boundingBox.south;

  // geoEquirectangular uses radians internally, so we need to account for the conversion
  // The scale factor represents how many pixels per radian
  const scale = Math.min(
    dimensions.width / ((lonSpan * Math.PI) / 180),
    dimensions.height / ((latSpan * Math.PI) / 180),
  );

  const projection = geoEquirectangular()
    .center([centerLon, centerLat])
    .scale(scale)
    .translate([dimensions.width / 2, dimensions.height / 2]);

  return geoPath().projection(projection);
}

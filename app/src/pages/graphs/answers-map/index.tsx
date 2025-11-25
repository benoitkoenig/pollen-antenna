import { memo, useMemo, useRef } from "react";

import { useGraphsSubdivisions } from "../graphs-providers/subdivisions-provider";

import { computeGeoProjection } from "./compute-geo-projection";
import { useDimensions } from "./use-dimensions";
import { useDrawMap } from "./use-draw-map";
import { useGeoJsons } from "./use-geo-jsons";

export const AnswersMap = memo(function AnswersMap() {
  const { subdivisions, boundingBox } = useGraphsSubdivisions();

  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  const dimensions = useDimensions(svgRef);

  const geoJsons = useGeoJsons(subdivisions);

  const geoGenerator = useMemo(
    () => computeGeoProjection(boundingBox, dimensions),
    [boundingBox, dimensions],
  );

  useDrawMap(gRef, geoJsons, geoGenerator);

  return (
    <svg
      ref={svgRef}
      className="w-full aspect-video border stroke stroke-[#4a90e2] fill-transparent"
    >
      <g ref={gRef} />
    </svg>
  );
});

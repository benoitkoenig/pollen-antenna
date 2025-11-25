import { select, type GeoPath } from "d3";
import type { Feature } from "geojson";
import { useEffect } from "react";

export function useDrawMap(
  gRef: React.RefObject<SVGGElement | null>,
  geoJsons: Feature[],
  geoGenerator: GeoPath,
) {
  useEffect(() => {
    if (!gRef.current) {
      return;
    }

    const g = select(gRef.current);

    g.selectAll("path")
      .data(geoJsons.filter(Boolean))
      .join("path")
      .attr("d", geoGenerator);

    return () => {
      g.selectAll("*").remove();
    };
  }, [gRef, geoJsons, geoGenerator]);
}

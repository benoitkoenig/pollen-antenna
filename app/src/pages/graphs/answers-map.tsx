import { geoEquirectangular, geoPath, select } from "d3";
import type { Feature } from "geojson";
import { memo, useEffect, useMemo, useRef } from "react";

import { useGraphsSubdivisions } from "./graphs-providers/subdivisions-provider";

const geoGenerator = geoPath().projection(geoEquirectangular().scale(250));

export const AnswersMap = memo(function AnswersMap() {
  const { subdivisions } = useGraphsSubdivisions();
  const gRef = useRef<SVGGElement>(null);

  const subdivisionsWithGeoJson = useMemo(
    () => subdivisions.filter((s) => s.geoJson !== undefined),
    [subdivisions],
  );

  useEffect(() => {
    if (!gRef.current || subdivisionsWithGeoJson.length === 0) {
      return;
    }

    const features = subdivisionsWithGeoJson.map(({ geoJson }) => ({
      ...(geoJson as Feature),
      type: "Feature",
    }));

    const g = select(gRef.current);

    g.selectAll("path").data(features).join("path").attr("d", geoGenerator);

    return () => {
      g.selectAll("*").remove();
    };
  }, [subdivisionsWithGeoJson]);

  if (subdivisionsWithGeoJson.length === 0) {
    return null;
  }

  return (
    <svg className="w-full aspect-video border, stroke-[#4a90e2] fill-transparent">
      <g ref={gRef} />
    </svg>
  );
});

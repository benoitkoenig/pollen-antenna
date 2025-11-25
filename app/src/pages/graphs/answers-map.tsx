import { geoEquirectangular, geoPath, select } from "d3";
import type { Feature } from "geojson";
import memoizee from "memoizee";
import { memo, useEffect, useRef, useState } from "react";

import { useGraphsSubdivisions } from "./graphs-providers/subdivisions-provider";

const geoGenerator = geoPath().projection(geoEquirectangular().scale(250));

const CDN_URL = "/cdn/public";

const fetchGeoJson = memoizee(async function fetchGeoJson(
  subdivisionId: string,
) {
  const response = await fetch(`${CDN_URL}/geo-json/${subdivisionId}.json`);

  const json = await response.json();

  return {
    ...json,
    type: "Feature",
  };
});

export const AnswersMap = memo(function AnswersMap() {
  const { subdivisions } = useGraphsSubdivisions();
  const gRef = useRef<SVGGElement>(null);
  const [geoJsons, setGeoJsons] = useState<Feature[]>([]);

  useEffect(() => {
    let isCanceled = false;

    setGeoJsons([]);

    subdivisions.forEach(async ({ id }) => {
      const geoJson = await fetchGeoJson(id);

      if (!isCanceled) {
        setGeoJsons((g) => [...g, geoJson]); // TODO: useDebouncing to save on CPU
      }
    });

    return () => {
      isCanceled = true;
    };
  }, [subdivisions]);

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
  }, [geoJsons]);

  return (
    <svg className="w-full aspect-video border, stroke-[#4a90e2] fill-transparent">
      <g ref={gRef} />
    </svg>
  );
});

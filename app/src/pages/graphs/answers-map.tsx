import { geoEquirectangular, geoPath, select } from "d3";
import type { Feature } from "geojson";
import memoizee from "memoizee";
import { memo, useEffect, useMemo, useRef, useState } from "react";

import { useGraphsSubdivisions } from "./graphs-providers/subdivisions-provider";

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
  const { subdivisions, boundingBox } = useGraphsSubdivisions();
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const [geoJsons, setGeoJsons] = useState<Feature[]>([]);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(svgRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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

  const geoGenerator = useMemo(() => {
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
  }, [boundingBox, dimensions]);

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
  }, [geoJsons, geoGenerator]);

  return (
    <svg
      ref={svgRef}
      className="w-full aspect-video border, stroke-[#4a90e2] fill-transparent"
    >
      <g ref={gRef} />
    </svg>
  );
});

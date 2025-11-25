import type { Feature } from "geojson";
import memoizee from "memoizee";
import { useEffect, useState } from "react";

const CDN_URL = "/cdn/public";

export const fetchGeoJson = memoizee(async function fetchGeoJson(
  subdivisionId: string,
) {
  const response = await fetch(`${CDN_URL}/geo-json/${subdivisionId}.json`);

  const json = await response.json();

  return {
    ...json,
    type: "Feature",
  };
});

interface Subdivision {
  id: string;
}

export function useGeoJsons(subdivisions: Subdivision[]) {
  const [geoJsons, setGeoJsons] = useState<Feature[]>([]);

  useEffect(() => {
    let isCanceled = false;

    (async () => {
      const geoJsons = await Promise.all(
        subdivisions.map(async ({ id }) => await fetchGeoJson(id)),
      );

      if (!isCanceled) {
        setGeoJsons(geoJsons);
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, [subdivisions]);

  return geoJsons;
}

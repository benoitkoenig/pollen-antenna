import { memo, useMemo } from "react";

import { Map, type MapSubdivision } from "@pollen-antenna/map";

import { useGraphs } from "./graphs-provider";

export const AnswersMap = memo(function AnswersMap() {
  const { subdivisions } = useGraphs();

  const subdivisionsWithCoordinates = useMemo(
    () =>
      subdivisions.filter(({ coordinates }) => coordinates) as MapSubdivision[],
    [subdivisions],
  );

  if (subdivisionsWithCoordinates.length === 0) {
    return null;
  }

  return <Map subdivisions={subdivisionsWithCoordinates} />;
});

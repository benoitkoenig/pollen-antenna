import { memo } from "react";
import { Navigate } from "react-router-dom";

import { useGeolocation } from "global-providers/geolocation";
import { useTodaysAnswerId } from "global-providers/todays-answer-id";

import { AnswersChart } from "./answers-chart";
import { AnswersMap } from "./answers-map";
import { Filters } from "./filters";
import { GraphsSubdivisionsProvider } from "./graphs-providers/subdivisions-provider";

export default memo(function Graphs() {
  const { todaysAnswerId } = useTodaysAnswerId();
  const { geolocation } = useGeolocation();

  if (!todaysAnswerId) {
    return <Navigate to="/" />;
  }

  if (!geolocation) {
    throw new Error("Geolocation should be defined");
  }

  return (
    <div className="my-6 space-y-6">
      <GraphsSubdivisionsProvider
        currentSubdivisionId={geolocation.subdivision}
      >
        <Filters />
        <AnswersMap />
        <AnswersChart />
      </GraphsSubdivisionsProvider>
    </div>
  );
});

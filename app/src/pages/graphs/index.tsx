import { memo } from "react";
import { Navigate } from "react-router-dom";

import Map from "@pollen-antenna/map";

import { useTodaysAnswerId } from "global-providers/todays-answer-id";

import { AnswersByDate } from "./answers-by-date/answers-by-date";
import { AnswersByLocation } from "./answers-by-location/answers-by-location";
import { Filters } from "./filters";

export default memo(function Graphs() {
  const { todaysAnswerId } = useTodaysAnswerId();

  if (!todaysAnswerId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="my-6 space-y-6">
      <AnswersByDate />
      <Filters />
      <Map />
      <AnswersByLocation />
    </div>
  );
});

import { memo } from "react";
import { Navigate } from "react-router-dom";

import { useTodaysAnswerId } from "store/todays-answer-id";

import { AnswersByDate } from "./answers-by-date/answers-by-date";
import { AnswersByLocation } from "./answers-by-location/answers-by-location";
import LoginButton from "./login-button";

export default memo(function Graphs() {
  const { todaysAnswerId } = useTodaysAnswerId();

  if (!todaysAnswerId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="my-6 space-y-6">
      <AnswersByDate />
      <AnswersByLocation />
      <LoginButton />
    </div>
  );
});

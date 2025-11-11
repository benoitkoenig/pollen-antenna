import { memo } from "react";
import { Navigate } from "react-router-dom";

import { useTodaysAnswerId } from "store/use-todays-answer-id";

import { AnswersByDate } from "./answers-by-date";
import { AnswersByLocation } from "./answers-by-location";
import LoginButton from "./login-button";

export default memo(function Graphs() {
  const { todaysAnswerId } = useTodaysAnswerId();

  if (!todaysAnswerId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-16 xl:px-32">
      <div className="max-w-6xl mx-auto space-y-6">
        <AnswersByDate />
        <AnswersByLocation />
        <LoginButton />
      </div>
    </div>
  );
});

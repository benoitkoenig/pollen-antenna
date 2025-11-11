import { useState, memo, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useTodaysAnswerId } from "store/use-todays-answer-id";

import { useStore } from "../../store";

import type { GeolocationData } from "./types";
import { useRegisterAnswer } from "./use-register-answer";
import Geolocation from "./views/geolocation";
import Symptoms from "./views/symptoms";

export default memo(function YourAnswer() {
  const navigate = useNavigate();
  const registerAnswer = useRegisterAnswer();

  const { todaysAnswerId, setTodaysAnswerId } = useTodaysAnswerId();

  const setGeolocation = useStore(({ setGeolocation }) => setGeolocation);

  const [hasSymptoms, setHasSymptoms] = useState<string | null>(null);

  if (todaysAnswerId) {
    return <Navigate to="/graphs" />;
  }

  const onSubmitSymptoms = useCallback((answer: string) => {
    setHasSymptoms(answer);
  }, []);

  const onSubmitGeolocation = useCallback(
    async (geolocation: GeolocationData) => {
      if (!hasSymptoms) {
        throw new Error("Users cannot submit geolocation before symptoms");
      }

      const now = new Date();
      now.setHours(now.getHours() - 4);
      const date = now.toLocaleDateString("en-CA"); // en-CA gives yyyy-mm-dd format

      const answerId = await registerAnswer(
        hasSymptoms,
        geolocation.countryCode,
        geolocation.subdivision,
        date,
      );

      setTodaysAnswerId(answerId, date);
      setGeolocation(geolocation);

      navigate("/graphs");
    },
    [hasSymptoms, registerAnswer, navigate],
  );

  // Display symptoms view if hasSymptoms is not set
  if (!hasSymptoms) {
    return <Symptoms onSubmit={onSubmitSymptoms} />;
  }

  // Display geolocation view if hasSymptoms is set
  return <Geolocation onSubmit={onSubmitGeolocation} />;
});

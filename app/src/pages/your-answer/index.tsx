import { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useGeolocation } from "global-providers/geolocation";
import { useTodaysAnswerId } from "global-providers/todays-answer-id";

import type { GeolocationData } from "./types";
import { useRegisterAnswer } from "./use-register-answer";
import Geolocation from "./views/geolocation";
import Symptoms from "./views/symptoms";

export default memo(function YourAnswer() {
  const navigate = useNavigate();
  const registerAnswer = useRegisterAnswer();

  const { setTodaysAnswerId } = useTodaysAnswerId();
  const { setGeolocation } = useGeolocation();

  const [hasSymptoms, setHasSymptoms] = useState<string | null>(null);

  const onSubmitSymptoms = useCallback((answer: string) => {
    setHasSymptoms(answer);
  }, []);

  const onSubmitGeolocation = useCallback(
    async (geolocation: GeolocationData) => {
      if (!hasSymptoms) {
        throw new Error("Users cannot submit geolocation before symptoms");
      }

      const answerId = await registerAnswer(
        hasSymptoms,
        geolocation.countryCode,
        geolocation.subdivision,
      );

      setTodaysAnswerId(answerId);
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

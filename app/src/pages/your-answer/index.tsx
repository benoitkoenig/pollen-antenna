import { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import type { GeolocationData } from "./types";
import Geolocation from "./views/geolocation";
import Symptoms from "./views/symptoms";

export default memo(function YourAnswer() {
  const navigate = useNavigate();

  const [hasSymptoms, setHasSymptoms] = useState<string | null>(null);

  const onSubmitSymptoms = useCallback((answer: string) => {
    setHasSymptoms(answer);
  }, []);

  const onSubmitGeolocation = useCallback((_answer: GeolocationData) => {
    navigate("/graphs");
  }, []);

  // Display symptoms view if hasSymptoms is not set
  if (!hasSymptoms) {
    return <Symptoms onSubmit={onSubmitSymptoms} />;
  }

  // Display geolocation view if hasSymptoms is set
  return <Geolocation onSubmit={onSubmitGeolocation} />;
});

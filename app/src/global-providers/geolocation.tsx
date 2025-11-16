import {
  createContext,
  memo,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  checkIsCountryCode,
  type CountryCode,
} from "@pollen-antenna/static-data";

const COOKIE_NAME = "geolocation";

export interface Geolocation {
  countryCode: CountryCode;
  subdivision: string;
}

function getGeolocationFromCookie(): Geolocation | null {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${COOKIE_NAME}=`));

  if (!cookie) {
    return null;
  }

  const [countryCode, subdivision] = cookie.split("=")[1].split(":");

  if (!checkIsCountryCode(countryCode)) {
    throw new Error("CountryCode is not valid");
  }

  return { countryCode, subdivision };
}

function setGeolocationCookie({ countryCode, subdivision }: Geolocation) {
  document.cookie = `${COOKIE_NAME}=${countryCode}:${subdivision}; expires=Tue, 31 Dec 2999 00:00:00 GMT; path=/`;
}

interface GeolocationContextValue {
  geolocation: Geolocation | null;
  setGeolocation: (geolocation: Geolocation) => void;
}

const GeolocationContext = createContext<GeolocationContextValue>({
  geolocation: null,
  setGeolocation() {
    throw new Error("Cannot set geolocation: provider not found");
  },
});

export const GeolocationProvider = memo(function GeolocationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [geolocation, setGeolocationState] = useState<Geolocation | null>(() =>
    getGeolocationFromCookie(),
  );

  const setGeolocation = useCallback((geolocation: Geolocation) => {
    setGeolocationState(geolocation);
    setGeolocationCookie(geolocation);
  }, []);

  return (
    <GeolocationContext.Provider
      value={{
        geolocation,
        setGeolocation,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
});

export function useGeolocation() {
  return useContext(GeolocationContext);
}

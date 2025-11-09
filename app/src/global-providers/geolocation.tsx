import {
  createContext,
  memo,
  useContext,
  useEffect,
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

function setGeolocationCookie({ countryCode, subdivision }: Geolocation): void {
  document.cookie = `${COOKIE_NAME}=${countryCode}_${subdivision}; path=/; SameSite=Strict`;
}

function getGeolocationCookie(): Geolocation | null {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");

    if (name === COOKIE_NAME) {
      const [countryCode, subdivision] = value.split("_");

      if (!checkIsCountryCode(countryCode)) {
        document.cookie = `${COOKIE_NAME}=; expires=${new Date(0).toUTCString()}; path=/; SameSite=Strict`;

        return null;
      }

      return { countryCode, subdivision };
    }
  }

  return null;
}

interface GeolocationContextValue {
  geolocation: Geolocation | null;
  setGeolocation: (geolocation: Geolocation) => void;
}

const GeolocationContext = createContext<GeolocationContextValue>({
  geolocation: null,
  setGeolocation: () => {
    throw new Error("Cannot set geolocation: context provider not found");
  },
});

export const GeolocationProvider = memo(function GeolocationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [geolocation, setGeolocation] = useState<Geolocation | null>(() =>
    getGeolocationCookie(),
  );

  useEffect(() => {
    if (geolocation) {
      setGeolocationCookie(geolocation);
    }
  }, [geolocation]);

  const value = {
    geolocation,
    setGeolocation,
  };

  return (
    <GeolocationContext.Provider value={value}>
      {children}
    </GeolocationContext.Provider>
  );
});

export function useGeolocation() {
  return useContext(GeolocationContext);
}

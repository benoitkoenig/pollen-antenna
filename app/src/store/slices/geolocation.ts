import type { StateCreator } from "zustand";

import type { CountryCode } from "@pollen-antenna/static-data";

export interface Geolocation {
  countryCode: CountryCode;
  subdivision: string;
}

export interface GeolocationSlice {
  geolocation: Geolocation | null;
  setGeolocation: (geolocation: Geolocation | null) => void;
}

export const createGeolocationSlice: StateCreator<GeolocationSlice> = (
  set,
) => ({
  geolocation: null,
  setGeolocation: (geolocation) => set({ geolocation }),
});

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  createGeolocationSlice,
  type GeolocationSlice,
} from "./slices/geolocation";

export type StoreState = GeolocationSlice;

export const useStore = create<StoreState>()(
  persist(
    (...args) => ({
      ...createGeolocationSlice(...args),
    }),
    {
      name: "pollen-antenna-storage",
    },
  ),
);

export type { Geolocation } from "./slices/geolocation";

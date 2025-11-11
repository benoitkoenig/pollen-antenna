import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createAuthTokenSlice, type AuthTokenSlice } from "./slices/auth-token";
import {
  createGeolocationSlice,
  type GeolocationSlice,
} from "./slices/geolocation";

export type StoreState = AuthTokenSlice & GeolocationSlice;

export const useStore = create<StoreState>()(
  persist(
    (...args) => ({
      ...createAuthTokenSlice(...args),
      ...createGeolocationSlice(...args),
    }),
    {
      name: "pollen-antenna-storage",
    },
  ),
);

export type { Geolocation } from "./slices/geolocation";

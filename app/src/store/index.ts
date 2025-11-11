import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createAuthTokenSlice, type AuthTokenSlice } from "./slices/auth-token";
import {
  createGeolocationSlice,
  type GeolocationSlice,
} from "./slices/geolocation";
import {
  createTodaysAnswerIdSlice,
  type TodaysAnswerIdSlice,
} from "./slices/todays-answer-id";

export type StoreState = AuthTokenSlice &
  TodaysAnswerIdSlice &
  GeolocationSlice;

export const useStore = create<StoreState>()(
  persist(
    (...args) => ({
      ...createAuthTokenSlice(...args),
      ...createTodaysAnswerIdSlice(...args),
      ...createGeolocationSlice(...args),
    }),
    {
      name: "pollen-antenna-storage",
    },
  ),
);

export type { Geolocation } from "./slices/geolocation";

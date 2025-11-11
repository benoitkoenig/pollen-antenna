import { create } from "zustand";

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

export const useStore = create<StoreState>()((...args) => ({
  ...createAuthTokenSlice(...args),
  ...createTodaysAnswerIdSlice(...args),
  ...createGeolocationSlice(...args),
}));

export type { Geolocation } from "./slices/geolocation";

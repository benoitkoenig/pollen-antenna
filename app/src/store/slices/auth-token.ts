import type { StateCreator } from "zustand";

interface AuthToken {
  provider: "google";
  token: string;
}

export interface AuthTokenSlice {
  authToken: AuthToken | null;
  setAuthToken: (token: AuthToken | null) => void;
}

export const createAuthTokenSlice: StateCreator<AuthTokenSlice> = (set) => ({
  authToken: null,
  setAuthToken: (token) => set({ authToken: token }),
});

import type { StateCreator } from "zustand";

export interface TodaysAnswerIdSlice {
  todaysAnswerId: string | null;
  setTodaysAnswerId: (id: string | null) => void;
}

export const createTodaysAnswerIdSlice: StateCreator<TodaysAnswerIdSlice> = (
  set,
) => ({
  todaysAnswerId: null,
  setTodaysAnswerId: (todaysAnswerId) => set({ todaysAnswerId }),
});

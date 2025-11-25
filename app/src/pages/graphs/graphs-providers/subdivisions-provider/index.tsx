import {
  createContext,
  memo,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import type { NearbySubdivisionsQuery } from "generated/graphql";

import { useFilters } from "../filters-provider";

import useNearbySubdivisions from "./use-nearby-subdivisions";

interface GraphsSubdivisionsContextValue {
  subdivisions:
    | { id: string; answersByDate?: never }[]
    | NearbySubdivisionsQuery["nearbySubdivisions"];
  focusedSubdivisionId: string;
}

const GraphsSubdivisionsContext = createContext<GraphsSubdivisionsContextValue>(
  {
    subdivisions: [],
    focusedSubdivisionId: "",
  },
);

export const GraphsSubdivisionsProvider = memo(
  function GraphsSubdivisionsProvider({
    currentSubdivisionId,
    children,
  }: {
    currentSubdivisionId: string;
    children: ReactNode;
  }) {
    const { authenticatedOnly } = useFilters();
    const nearbySubdivisions = useNearbySubdivisions({
      subdivisionId: currentSubdivisionId,
      authenticatedOnly,
    });

    const subdivisions = useMemo(
      () => nearbySubdivisions ?? [{ id: currentSubdivisionId }],
      [nearbySubdivisions, currentSubdivisionId],
    );

    return (
      <GraphsSubdivisionsContext.Provider
        value={{
          subdivisions,
          focusedSubdivisionId: currentSubdivisionId,
        }}
      >
        {children}
      </GraphsSubdivisionsContext.Provider>
    );
  },
);

export function useGraphsSubdivisions() {
  return useContext(GraphsSubdivisionsContext);
}

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
    | NearbySubdivisionsQuery["nearbySubdivisions"]["subdivisions"];
  boundingBox?:
    | NearbySubdivisionsQuery["nearbySubdivisions"]["boundingBox"]
    | undefined;
  focusedSubdivisionId: string;
}

const GraphsSubdivisionsContext = createContext<GraphsSubdivisionsContextValue>(
  {
    subdivisions: [],
    boundingBox: undefined,
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
    const nearbySubdivisionsResponse = useNearbySubdivisions({
      subdivisionId: currentSubdivisionId,
      authenticatedOnly,
    });

    const subdivisions = useMemo(
      () =>
        nearbySubdivisionsResponse?.subdivisions ?? [
          { id: currentSubdivisionId },
        ],
      [nearbySubdivisionsResponse, currentSubdivisionId],
    );

    const boundingBox = useMemo(
      () => nearbySubdivisionsResponse?.boundingBox,
      [nearbySubdivisionsResponse],
    );

    return (
      <GraphsSubdivisionsContext.Provider
        value={{
          subdivisions,
          boundingBox,
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

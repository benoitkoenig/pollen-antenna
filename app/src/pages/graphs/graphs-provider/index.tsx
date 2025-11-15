import {
  createContext,
  memo,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import type { SubdivisionData } from "./types";
import useNearbySubdivisions from "./use-nearby-subdivisions";
import useSubdivisions from "./use-subdivisions";

interface GraphsContextValue {
  subdivisions: SubdivisionData[];
  focusedSubdivisionId: string;
}

const GraphsContext = createContext<GraphsContextValue>({
  subdivisions: [],
  focusedSubdivisionId: "",
});

export const GraphsProvider = memo(function GraphsProvider({
  currentSubdivisionId,
  children,
}: {
  currentSubdivisionId: string;
  children: ReactNode;
}) {
  const currentSubdivisionSingleton = useSubdivisions([currentSubdivisionId]);
  const subdivisionGeographies = useNearbySubdivisions(currentSubdivisionId);

  const otherSubdivisionIds = useMemo(() => {
    if (!subdivisionGeographies) {
      return null;
    }

    return subdivisionGeographies
      .filter(({ id }) => id !== currentSubdivisionId)
      .map(({ id }) => id);
  }, [currentSubdivisionId, subdivisionGeographies]);

  const otherSubdivisions = useSubdivisions(otherSubdivisionIds);

  const subdivisions = useMemo((): SubdivisionData[] => {
    const currentSubdivision = currentSubdivisionSingleton?.[0] ?? undefined;

    if (!currentSubdivision && !subdivisionGeographies) {
      return [
        {
          id: currentSubdivisionId,
        },
      ];
    }

    if (currentSubdivision && !subdivisionGeographies) {
      return [currentSubdivision];
    }

    if (!currentSubdivision && subdivisionGeographies) {
      return subdivisionGeographies;
    }

    if (!currentSubdivision || !subdivisionGeographies) {
      throw new Error("Impossible scenario, but I need to tell typescript");
    }

    const subdivisionsAnswersData = [
      currentSubdivision,
      ...(otherSubdivisions ?? []),
    ];

    const subdivisions: SubdivisionData[] = [];

    for (const subdivisionGeography of subdivisionGeographies) {
      const completeSubdivision: SubdivisionData = {
        id: subdivisionGeography.id,
        coordinates: subdivisionGeography.coordinates,
      };

      const answerData = subdivisionsAnswersData.find(
        ({ id }) => id === subdivisionGeography.id,
      );

      if (answerData) {
        completeSubdivision.answersByDate = answerData.answersByDate;
      }

      subdivisions.push(completeSubdivision);
    }

    return subdivisions;
  }, [currentSubdivisionSingleton, subdivisionGeographies, otherSubdivisions]);

  return (
    <GraphsContext.Provider
      value={{
        subdivisions,
        focusedSubdivisionId: currentSubdivisionId,
      }}
    >
      {children}
    </GraphsContext.Provider>
  );
});

export function useGraphs() {
  return useContext(GraphsContext);
}

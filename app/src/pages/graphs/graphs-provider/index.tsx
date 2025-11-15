import {
  createContext,
  memo,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface SubdivisionData {
  id: string;
  coordinates?: [number, number][][];
  answers?: {
    date: string;
    yesCount: number;
    noCount: number;
  }[];
}

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
  const [currentSubdivision, setCurrentSubdivisionId] =
    useState<SubdivisionData>({
      id: currentSubdivisionId,
    });
  const [nearbySubdivisions, setNearbySubdivisions] = useState<
    SubdivisionData[] | null
  >(null);

  const subdivisions = useMemo(
    () => [currentSubdivision, ...(nearbySubdivisions ?? [])],
    [currentSubdivision, nearbySubdivisions],
  );

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

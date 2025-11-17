import {
  createContext,
  memo,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface FiltersContextValue {
  authenticatedOnly: boolean;
  allergen: string | null;
  setAuthenticatedOnly: Dispatch<SetStateAction<boolean>>;
  setAllergen: Dispatch<SetStateAction<string | null>>;
}

const FiltersContext = createContext<FiltersContextValue>({
  authenticatedOnly: false,
  allergen: null,
  setAuthenticatedOnly() {
    throw new Error("Cannot set authenticatedOnly: provider not found");
  },
  setAllergen() {
    throw new Error("Cannot set allergen: provider not found");
  },
});

export const FiltersProvider = memo(function FiltersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authenticatedOnly, setAuthenticatedOnly] = useState(false);
  const [allergen, setAllergen] = useState<string | null>(null);

  return (
    <FiltersContext.Provider
      value={{
        authenticatedOnly,
        allergen,
        setAuthenticatedOnly,
        setAllergen,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
});

export function useFilters() {
  return useContext(FiltersContext);
}

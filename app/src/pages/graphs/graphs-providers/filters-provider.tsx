import {
  createContext,
  memo,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface FiltersContextValue {
  authenticatedOnly: boolean;
  allergen: string | null;
  setAuthenticatedOnly: (authenticatedOnly: boolean) => void;
  setAllergen: (allergen: string | null) => void;
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
  const [authenticatedOnly, setAuthenticatedOnlyState] = useState(false);
  const [allergen, setAllergenState] = useState<string | null>(null);

  const setAuthenticatedOnly = useCallback((authenticatedOnly: boolean) => {
    setAuthenticatedOnlyState(authenticatedOnly);

    if (!authenticatedOnly) {
      setAllergen(null);
    }
  }, []);

  const setAllergen = useCallback((allergen: string | null) => {
    setAllergenState(allergen);

    if (allergen) {
      setAuthenticatedOnly(true);
    }
  }, []);

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

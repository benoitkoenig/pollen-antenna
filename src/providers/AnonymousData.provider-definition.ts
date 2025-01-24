import type { InjectionKey, Ref } from "vue";

import type { Allergen } from "../static-data/allergens.static-data";

export interface AnonymousData {
  location: Ref<string | undefined>;
  setLocation: (newLocation: string) => void;
  diagnosedAllergenData: Ref<Allergen[]>;
  setDiagnosedAllergenData: (diagnosedAllergenData: Allergen[]) => void;
}

export const anonymousDataProviderKey = Symbol(
  "anonymous-data",
) as InjectionKey<AnonymousData>;

import type { InjectionKey, Ref } from "vue";

import type { Allergen } from "../static-data/allergens.static-data";

export interface DiagnosedAllergenData {
  date: Date;
  allergens: Allergen[];
}

export interface ProfileData {
  latestLocation: Ref<string | undefined>;
  setLatestLocation: (newLocation: string) => void;
  diagnosedAllergenHistory: Ref<DiagnosedAllergenData[]>;
  addDiagnosedAllergenData: (
    diagnosedAllergenData: DiagnosedAllergenData,
  ) => void;
  removeDiagnosedAllergenData: (date: Date) => void;
}

export const profileDataProviderKey = Symbol(
  "profile-data",
) as InjectionKey<ProfileData>;

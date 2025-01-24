import type { InjectionKey, Ref } from "vue";

import type { DateOnRecord } from "../date-on-record";
import type { Allergen } from "../static-data/allergens.static-data";

export interface DiagnosedAllergenData {
  date: DateOnRecord;
  allergens: Allergen[];
}

export interface ProfileData {
  latestLocation: Ref<string | undefined>;
  setLatestLocation: (newLocation: string) => void;
  diagnosedAllergenHistory: Ref<DiagnosedAllergenData[]>;
  addDiagnosedAllergenData: (
    diagnosedAllergenData: DiagnosedAllergenData,
  ) => void;
  removeDiagnosedAllergenData: (date: DateOnRecord) => void;
}

export const profileDataProviderKey = Symbol(
  "profile-data",
) as InjectionKey<ProfileData>;

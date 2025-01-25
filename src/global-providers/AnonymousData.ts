import { ref } from "vue";
import type { InjectionKey, Ref } from "vue";

import type { Allergen } from "../static-data/allergens.static-data";

export interface AnonymousData {
  location: Ref<string | undefined>;
  setLocation: (newLocation: string) => void;
  diagnosedAllergenData: Ref<Allergen[]>;
  setDiagnosedAllergenData: (diagnosedAllergenData: Allergen[]) => void;
}

export const anonymousDataKey = Symbol(
  "anonymous-data",
) as InjectionKey<AnonymousData>;

const location = ref<string>();

function setLocation(value: string) {
  location.value = value;
}

const diagnosedAllergenData = ref<Allergen[]>([]);

function setDiagnosedAllergenData(value: Allergen[]) {
  diagnosedAllergenData.value = value;
}

export const anonymousData: AnonymousData = {
  location,
  setLocation,
  diagnosedAllergenData,
  setDiagnosedAllergenData,
};

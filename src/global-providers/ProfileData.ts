import { ref } from "vue";
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

export const profileDataKey = Symbol(
  "profile-data",
) as InjectionKey<ProfileData>;

const latestLocation = ref<string>();

function setLatestLocation(newLocation: string) {
  latestLocation.value = newLocation;
}

const diagnosedAllergenHistory = ref<DiagnosedAllergenData[]>([]);

function addDiagnosedAllergenData(
  diagnosedAllergenData: DiagnosedAllergenData,
) {
  if (
    diagnosedAllergenHistory.value.some(
      ({ date }) => date === diagnosedAllergenData.date,
    )
  ) {
    // TODO: using the date as the ID is not acceptable. Introduce a proper ID
    throw new Error("Cannot have two allergen data diagnosed on the same date");
  }

  diagnosedAllergenHistory.value.push(diagnosedAllergenData);
}

function removeDiagnosedAllergenData(date: DateOnRecord) {
  const index = diagnosedAllergenHistory.value.findIndex(
    (diagnosedAllergenEntry) => date !== diagnosedAllergenEntry.date,
  );

  if (index === -1) {
    throw new Error("Could not find the diagnosed allergen data to remove");
  }

  diagnosedAllergenHistory.value.splice(index, 1);
}

export const profileData: ProfileData = {
  latestLocation,
  setLatestLocation,
  diagnosedAllergenHistory,
  addDiagnosedAllergenData,
  removeDiagnosedAllergenData,
};

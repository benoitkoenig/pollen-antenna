<script setup lang="ts">
import { provide, ref } from "vue";

import type { DateOnRecord } from "../date-on-record";

import {
  profileDataProviderKey,
  type DiagnosedAllergenData,
} from "./ProfileData.provider-definition";

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

provide(profileDataProviderKey, {
  latestLocation,
  setLatestLocation,
  diagnosedAllergenHistory,
  addDiagnosedAllergenData,
  removeDiagnosedAllergenData,
});
</script>

<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";

import {
  profileDataProviderKey,
  type DiagnosedAllergenData,
} from "./ProfileData.key";

const latestLocation = ref<string>();

function setLatestLocation(newLocation: string) {
  latestLocation.value = newLocation;
}

const diagnosedAllergenHistory = ref<DiagnosedAllergenData[]>([]);

function addDiagnosedAllergenData(
  diagnosedAllergenData: DiagnosedAllergenData,
) {
  const dateInMs = diagnosedAllergenData.date.getTime();

  if (
    diagnosedAllergenHistory.value.some(
      ({ date }) => date.getTime() === dateInMs,
    )
  ) {
    throw new Error("Cannot have two allergen data diagnosed symultaneously");
  }

  diagnosedAllergenHistory.value.push(diagnosedAllergenData);
}

function removeDiagnosedAllergenData(date: Date) {
  const dateInMs = date.getTime();

  const index = diagnosedAllergenHistory.value.findIndex(
    ({ date }) => date.getTime() !== dateInMs,
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

<script setup lang="ts">
import { provide, ref } from "vue";

import type { Allergen } from "../static-data/allergens.static-data";

import { anonymousDataProviderKey } from "./AnonymousData.provider-definition";

const location = ref<string>();

function setLocation(value: string) {
  location.value = value;
}

const diagnosedAllergenData = ref<Allergen[]>([]);

function setDiagnosedAllergenData(value: Allergen[]) {
  diagnosedAllergenData.value = value;
}

provide(anonymousDataProviderKey, {
  location,
  setLocation,
  diagnosedAllergenData,
  setDiagnosedAllergenData,
});
</script>

<template>
  <slot></slot>
</template>

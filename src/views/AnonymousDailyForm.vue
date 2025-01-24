<script setup lang="ts">
import { inject } from "vue";

import AllergenPicker from "../components/AllergenPicker.vue";
import CityPicker from "../components/CityPicker.vue";
import QuestionBlock from "../components/QuestionBlock.vue";
import { anonymousDataProviderKey } from "../providers/AnonymousData.provider-definition";

const {
  location,
  setLocation,
  diagnosedAllergenData,
  setDiagnosedAllergenData,
} = inject(anonymousDataProviderKey)!;

function proceed() {
  alert("Not implemented");
}
</script>

<template>
  <div class="relative w-full h-full">
    <div
      class="absolute inset-y-0 inset-x-1/3 flex flex-col gap-4 items-center"
    >
      <QuestionBlock title="What is your current location?">
        <CityPicker :default-value="location" @select="setLocation" />
      </QuestionBlock>
      <QuestionBlock title="What are your known allergies?">
        <AllergenPicker @update="setDiagnosedAllergenData" />
        <template #collapsed>{{ diagnosedAllergenData.join(", ") }}</template>
      </QuestionBlock>
      <button @click="proceed">Proceed</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import AllergenPicker from "../components/AllergenPicker.vue";
import CityPicker from "../components/CityPicker.vue";
import QuestionBlock from "../components/QuestionBlock.vue";
import { type Allergen } from "../static-data/allergens.static-data";

const latestLocation = ref();
const knownAllergies = ref<Allergen[]>([]);

function setLatestLocation(value: string) {
  latestLocation.value = value;
}

function updateKnownAllergies(value: Allergen[]) {
  knownAllergies.value = value;
}
</script>

<template>
  <div class="relative w-full h-full">
    <div
      class="absolute inset-y-0 inset-x-1/3 flex flex-col gap-4 items-center"
    >
      <QuestionBlock title="What is your current location?">
        <CityPicker
          :default-value="latestLocation"
          @select="setLatestLocation"
        />
      </QuestionBlock>
      <QuestionBlock title="What are your known allergies?">
        <AllergenPicker @update="updateKnownAllergies" />
        <template #collapsed>{{ knownAllergies.join(", ") }}</template>
      </QuestionBlock>
    </div>
  </div>
</template>

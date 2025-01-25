<script setup lang="ts">
import { computed, inject } from "vue";
import { useRouter } from "vue-router";

import AllergenPicker from "../components/AllergenPicker.vue";
import CityPicker from "../components/CityPicker.vue";
import QuestionBlock from "../components/QuestionBlock.vue";
import { anonymousDataKey } from "../global-providers/AnonymousData.ts";

const {
  location,
  setLocation,
  diagnosedAllergenData,
  setDiagnosedAllergenData,
} = inject(anonymousDataKey)!;

const router = useRouter();

function proceed() {
  router.push("/graph");
}

const areThereSelectedAllergen = computed(
  () => diagnosedAllergenData.value.length !== 0,
);
</script>

<template>
  <div class="relative w-full">
    <div class="absolute top-12 inset-x-1/3 flex flex-col gap-4 items-center">
      <QuestionBlock title="What is your current location?">
        <div class="w-full flex place-content-center">
          <CityPicker
            class="w-1/2"
            :default-value="location"
            @select="setLocation"
          />
        </div>
      </QuestionBlock>
      <QuestionBlock title="What are your known allergies?">
        <AllergenPicker @update="setDiagnosedAllergenData" />
        <template #collapsed>
          <span v-if="areThereSelectedAllergen" class="italic">{{
            diagnosedAllergenData.join(", ")
          }}</span>
          <span v-else class="italic">- No allergen selected -</span>
        </template>
      </QuestionBlock>
      <button
        class="py-2 px-8 border bg-teal-600 hover:bg-teal-800"
        @click="proceed"
      >
        Submit and see the graphs
      </button>
    </div>
  </div>
</template>

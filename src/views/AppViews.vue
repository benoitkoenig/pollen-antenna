<script setup lang="ts">
import { inject } from "vue";

import AllergenPicker from "../components/AllergenPicker.vue";
import CityPicker from "../components/CityPicker.vue";
import { profileDataProviderKey } from "../providers/ProfileData.key";

const { latestLocation, setLatestLocation } = inject(profileDataProviderKey)!;
</script>

<template>
  <div class="relative w-full h-full">
    <div
      class="absolute inset-y-0 inset-x-1/3 flex flex-col justify-evenly items-center"
    >
      <div v-if="latestLocation">Picked city: {{ latestLocation }}</div>
      <CityPicker :default-value="latestLocation" @select="setLatestLocation" />
      <AllergenPicker />
    </div>
  </div>
</template>

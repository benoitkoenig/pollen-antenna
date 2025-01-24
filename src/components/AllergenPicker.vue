<script setup lang="ts">
import { ref, watch } from "vue";

import { allergensStaticData } from "../static-data/allergens.static-data";

const pickedAllergens = ref([]);
const emit = defineEmits({
  update: null,
});

watch(pickedAllergens, (allergens) => emit("update", allergens));
</script>

<template>
  <div class="grid grid-cols-4 p-8 gap-8 border bg-gray-800">
    <span v-for="allergen of allergensStaticData" :key="allergen">
      <input
        :id="allergen"
        v-model="pickedAllergens"
        type="checkbox"
        :value="allergen"
      />
      <label :for="allergen" class="ml-2">{{ allergen }}</label>
    </span>
  </div>
</template>

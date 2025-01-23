<script setup lang="ts">
import { ref, watch } from "vue";

import allergensStaticData from "../static-data/allergens.static-data";

const pickedAllergens = ref([]);
const emit = defineEmits({
  update: null,
});

watch(pickedAllergens, (allergens) => emit("update", allergens));
</script>

<template>
  <div class="grid grid-cols-2">
    <span v-for="allergen of allergensStaticData" :key="allergen">
      <input
        :id="allergen"
        v-model="pickedAllergens"
        type="checkbox"
        :value="allergen"
      />
      <label :for="allergen">{{ allergen }}</label>
    </span>
  </div>
</template>

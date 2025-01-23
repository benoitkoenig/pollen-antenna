<script setup lang="ts">
import allergensStaticData from '../static-data/allergens.static-data';
import { ref, watch } from 'vue';

const pickedAllergens = ref([]);
const emit = defineEmits({
  update: null,
})

watch(pickedAllergens, (allergens) => emit("update", allergens));
</script>

<template>
  <div class="grid grid-cols-2">
    <span v-for="allergen of allergensStaticData" :key="allergen">
      <input :id="allergen" type="checkbox" :value="allergen" v-model="pickedAllergens">
      <label :for="allergen">{{ allergen }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ title: string }>();

const isExpanded = ref(true);

function collapse() {
  isExpanded.value = false;
}

function expand() {
  isExpanded.value = true;
}
</script>

<template>
  <div class="w-full flex flex-col p-4 gap-4 border border-teal-600">
    <div class="w-full flex gap-4">
      <h3 class="flex-grow">{{ title }}</h3>
      <button v-if="$slots.collapsed && isExpanded" @click="collapse">V</button>
      <button v-else-if="$slots.collapsed" @click="expand">&lt;</button>
    </div>
    <div v-show="isExpanded" class="w-full">
      <slot></slot>
    </div>
    <div v-show="!isExpanded" class="w-full">
      <slot name="collapsed"></slot>
    </div>
  </div>
</template>

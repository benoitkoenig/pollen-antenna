<script setup lang="ts">
import memoizee from "memoizee";

import AutoComplete, { type AutoCompleteOption } from "./AutoComplete.vue";

defineProps<{
  defaultValue?: string | undefined;
}>();

const emit = defineEmits({
  select: (_location: string) => true,
});

const fetchLocationsPerCountry = memoizee(
  async function fetchLocationsPerCountry(countryCode: string) {
    const response = await fetch(`/locations/${countryCode}.tsv`);
    const rawResponse = await response.text();

    const options = rawResponse
      .split("\n")
      .map((row) => {
        const [, postalCode, city] = row.split("\t");

        return `${city} - ${postalCode}`;
      })
      .filter((v, i, arr) => arr.indexOf(v) === i);

    return options;
  },
  { max: 1 },
);

async function search(value: string) {
  const allLocations = await fetchLocationsPerCountry("FR");

  const valueLowerCase = value.toLowerCase();

  const startingMatches = [];
  const otherMatches = [];

  for (const location of allLocations) {
    const locationLowerCase = location.toLowerCase();

    if (locationLowerCase.startsWith(valueLowerCase)) {
      startingMatches.push(location);
    } else if (locationLowerCase.match(valueLowerCase)) {
      otherMatches.push(location);
    }

    if (startingMatches.length === 5) {
      break;
    }
  }

  const matches = [
    ...startingMatches,
    ...otherMatches.slice(0, 5 - startingMatches.length),
  ];

  return matches.map((value): AutoCompleteOption => ({ value }));
}
</script>

<template>
  <AutoComplete
    :search="search"
    @select="({ value, label }) => emit('select', label ?? value)"
  />
</template>

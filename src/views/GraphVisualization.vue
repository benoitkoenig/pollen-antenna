<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from "vue";

import {
  getDateOnRecord,
  getDateOnRecordRange,
  type DateOnRecord,
} from "../date-on-record";
import {
  allergensStaticData,
  type Allergen,
} from "../static-data/allergens.static-data";

const selectedAllergen = ref<Allergen>();
const dateOnMount = ref<Date>();

onMounted(() => (dateOnMount.value = new Date()));

interface GraphData {
  allergen: Allergen;
  datesOnRecord: DateOnRecord[];
  answeredYes: number[];
  answeredNo: number[];
}

const graphData = shallowRef<GraphData>();

watch([selectedAllergen, dateOnMount], async ([allergen, to], _, onCleanup) => {
  if (!to) {
    throw new Error("dateOnMount should be defined");
  }

  if (!allergen) {
    return;
  }

  const from = new Date(to);
  from.setDate(from.getDate() - 7);

  let isCanceled = false;

  onCleanup(() => {
    isCanceled = true;
  });

  const graphDataToSet = await fetchMockGraphData(
    allergen as Allergen,
    getDateOnRecord(from),
    getDateOnRecord(to),
  );

  if (isCanceled) {
    return;
  }

  graphData.value = graphDataToSet;
});

/** Not currently async, but the non-mocked function will be */
async function fetchMockGraphData(
  allergen: Allergen,
  from: string,
  to: string,
): Promise<GraphData> {
  const datesOnRecord = getDateOnRecordRange(from, to);

  const answeredNo = datesOnRecord.map(() => 0);
  const answeredYes = datesOnRecord.map(() => 0);

  return {
    allergen,
    datesOnRecord,
    answeredNo,
    answeredYes,
  };
}
</script>

<template>
  <div class="relative top-12 w-full">
    <div
      class="absolute inset-y-0 inset-x-1/3 flex flex-col gap-4 items-center"
    >
      <select v-model="selectedAllergen" class="text-black">
        <option
          v-for="allergen of allergensStaticData"
          :key="allergen"
          :value="allergen"
        >
          {{ allergen }}
        </option>
      </select>
      <Transition
        mode="out-in"
        enter-active-class="duration-150 ease-out"
        enter-from-class="transform opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-150 ease-out"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="opacity-0 scale-75"
      >
        <div v-if="graphData" :key="selectedAllergen || 'none'">
          {{ JSON.stringify(graphData, undefined, 2) }}
        </div>
        <div v-else>Pick an allergen to see the graph</div>
      </Transition>
    </div>
  </div>
</template>

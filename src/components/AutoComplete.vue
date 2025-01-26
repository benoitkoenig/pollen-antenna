<script setup lang="ts">
import { computed, ref, watch } from "vue";

export interface AutoCompleteOption {
  label?: string;
  value: string;
}

const { search = () => Promise.resolve([]), defaultValue } = defineProps<{
  search: (value: string) => Promise<AutoCompleteOption[]>;
  defaultValue?: AutoCompleteOption;
}>();
const inputRawText = ref(defaultValue?.label ?? "");
const selectedOption = defineModel<AutoCompleteOption>();
const options = ref<AutoCompleteOption[]>();
const emit = defineEmits({
  select: (_option: AutoCompleteOption) => true,
});

/**
 * Checks if {@link inputRawText} matches any {@link AutoCompleteOption} from {@link options}. If it does, select it.
 * @returns `true` if there is an option that matches rawValue, `false` otherwise
 */
function selectOptionIfRelevant() {
  const optionToSelect = options.value?.find(
    (v) => (v.label ?? v.value) === inputRawText.value,
  );

  if (!optionToSelect) {
    selectedOption.value = undefined;

    return false;
  }

  if (
    !options.value ||
    options.value.length !== 1 ||
    options.value[0] !== optionToSelect
  ) {
    options.value = [optionToSelect];
  }

  if (optionToSelect.value !== selectedOption.value?.value) {
    selectedOption.value = optionToSelect;
    emit("select", optionToSelect);
  }

  return true;
}

watch(inputRawText, async (_, __, onCleanup) => {
  const hasAMatchInExistingOptions = selectOptionIfRelevant();

  if (hasAMatchInExistingOptions) {
    // This condition avoids re-searching when selecting the match
    return;
  }

  let isCanceled = false;

  onCleanup(() => {
    isCanceled = true;
  });

  // Adds debouncing
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (isCanceled) {
    return;
  }

  const matchingOptions = await search(inputRawText.value);

  if (isCanceled) {
    return;
  }

  options.value = matchingOptions;

  selectOptionIfRelevant();
});

const inputIsFocus = ref(false);

const hasOptionsToShow = computed(
  () =>
    options.value?.length &&
    (!selectedOption.value ||
      options.value.some(({ value }) => value !== selectedOption.value!.value)),
);
</script>

<template>
  <div class="relative text-black">
    <input
      v-model="inputRawText"
      class="w-full px-4 rounded-full bg-gray-200"
      type="text"
      @focus="inputIsFocus = true"
      @blur="inputIsFocus = false"
    />
    <!-- Adding a duration of 75ms is a simple hack to ensure that the @click event is fired before the list is hidden by the inputs blur -->
    <Transition leave-active-class="duration-75">
      <ul
        v-show="hasOptionsToShow && inputIsFocus"
        class="absolute top-[calc(100%+4px)] inset-x-2 text-left bg-gray-200"
      >
        <li
          v-for="{ value, label } of options"
          :key="value"
          role="button"
          class="hover:bg-gray-300 px-2"
          @click="inputRawText = value"
        >
          {{ label ?? value }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

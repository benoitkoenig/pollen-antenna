import type { Meta, StoryObj } from "@storybook/vue3";
import { computed, ref } from "vue";

import AutoComplete, { type AutoCompleteOption } from "./AutoComplete.vue";

const meta = {
  title: "AutoComplete",
  component: AutoComplete,
  tags: ["autodocs"],
  args: {
    search: (value: string) =>
      Promise.resolve(
        (
          [
            { value: "Paris - 75000" },
            { value: "Toulouse - 31000" },
          ] as AutoCompleteOption[]
        ).filter((option) =>
          (option.label ?? option.value)
            .toLowerCase()
            .match(value.toLowerCase()),
        ),
      ),
  },
  argTypes: {
    modelValue: {
      type: "string",
    },
  },
} satisfies Meta<typeof AutoComplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: (args) => ({
    components: { AutoComplete },
    setup() {
      const selectedValue = ref();

      const selectedValueAsString = computed(
        () => selectedValue.value?.label ?? selectedValue.value?.value,
      );

      return { args, selectedValue, selectedValueAsString };
    },
    template: `
      <AutoComplete v-bind="args" v-model="selectedValue" />
      <div v-if="selectedValueAsString">{{ selectedValueAsString }}</div>
      `,
  }),
};

export const ListenToSelectEvent: Story = {
  render: (args) => ({
    components: { AutoComplete },
    setup() {
      const selectedValue = ref<AutoCompleteOption>();

      const selectedValueAsString = computed(
        () => selectedValue.value?.label ?? selectedValue.value?.value,
      );

      return { args, selectedValue, selectedValueAsString };
    },
    template: `
      <AutoComplete v-bind="args" @select="(v) => selectedValue = v" />
      <div v-if="selectedValueAsString">{{ selectedValueAsString }}</div>
      `,
  }),
};

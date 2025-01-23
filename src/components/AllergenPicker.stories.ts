import type { Meta, StoryObj } from '@storybook/vue3';

import AllergenPicker from './AllergenPicker.vue';
import { ref } from 'vue';

const meta = {
  title: 'AllergenPicker',
  component: AllergenPicker,
  tags: ['autodocs'],
} satisfies Meta<typeof AllergenPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: (args) => ({
    components: { AllergenPicker },
    setup() {
      const pickedAllergens = ref([]);

      return { args, pickedAllergens };
    },
    template: `
      <AllergenPicker @update="(values) => pickedAllergens = values" />
      <div>{{ JSON.stringify(pickedAllergens) }}</div>
      `,
  })
};

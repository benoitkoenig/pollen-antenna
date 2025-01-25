import type { Meta, StoryObj } from "@storybook/vue3";

import QuestionBlock from "./QuestionBlock.vue";

const meta = {
  title: "QuestionBlock",
  component: QuestionBlock,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
  },
} satisfies Meta<typeof QuestionBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithoutCollapsed: Story = {
  args: {
    title: "My title",
  },
  render: (args) => ({
    setup: () => ({ args }),
    components: { QuestionBlock: QuestionBlock },
    template: `
      <QuestionBlock v-bind="args">
        This is the only version of the content<br />
        It can be long texts<br />
      </QuestionBlock>
      `,
  }),
};

export const WithCollapsed: Story = {
  args: {
    title: "My title",
  },
  render: (args) => ({
    setup: () => ({ args }),
    components: { QuestionBlock: QuestionBlock },
    template: `
      <QuestionBlock v-bind="args">
        This is the long version of the content<br />
        Intended for long texts<br />
        <template #collapsed>
          This is the collapsed version
        </template>
      </QuestionBlock>
      `,
  }),
};

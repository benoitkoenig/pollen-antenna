import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import QuestionBlock from "./QuestionBlock.vue";

describe("QuestionBlock", () => {
  it("should toggle between expanded and collapsed mode", async () => {
    const wrapper = mount(QuestionBlock, {
      props: {
        title: "QuestionBlock title",
      },
      slots: {
        default: "Default slot",
        collapsed: "Collapsed slot",
      },
    });

    const expandedHtml = wrapper.html();

    await wrapper.find("button").trigger("click");

    const collapsedHtml = wrapper.html();
    expect(collapsedHtml).not.toMatch(expandedHtml);

    await wrapper.find("button").trigger("click");

    expect(wrapper.html()).toMatch(expandedHtml);

    await wrapper.find("button").trigger("click");

    expect(wrapper.html()).toMatch(collapsedHtml);
  });
});

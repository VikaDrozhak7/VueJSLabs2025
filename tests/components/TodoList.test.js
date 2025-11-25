import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TodoList from "../../src/components/TodoList.vue";

describe("TodoList component", () => {
    it("renders component", () => {
        const wrapper = mount(TodoList);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find("h2").text()).toContain("Додати задачу");
    });

    it("adds a new task", async () => {
        const wrapper = mount(TodoList);

        const titleInput = wrapper.find("input[placeholder='Назва *']");
        await titleInput.setValue("New Task");

        await wrapper.find("form").trigger("submit.prevent");
        await flushPromises();

        expect(wrapper.text()).toContain("New Task");
    });

    it("deletes a task", async () => {
        const wrapper = mount(TodoList);

        const titleInput = wrapper.find("input[placeholder='Назва *']");
        await titleInput.setValue("Task to delete");
        await wrapper.find("form").trigger("submit.prevent");
        await flushPromises();

        expect(wrapper.text()).toContain("Task to delete");

        const deleteBtn = wrapper.find("button.danger");
        expect(deleteBtn.exists()).toBe(true);

        await deleteBtn.trigger("click");
        await flushPromises();

        expect(wrapper.text()).not.toContain("Task to delete");
    });
});

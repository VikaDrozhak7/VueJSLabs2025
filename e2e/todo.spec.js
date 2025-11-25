import { test, expect } from "@playwright/test";

/**
 * E2E-тести для Todo App
 * Включає:
 * - відкриття сторінки
 * - додавання задачі
 * - toggle статусу
 * - фільтрацію
 * - видалення
 * - screenshot (вимога 1.7.3)
 */

test.describe("Todo App E2E", () => {

    test.beforeEach(async ({ page }) => {
        // Переходимо на сайт
        await page.goto("http://localhost:5173/");

        // очищаємо localStorage щоб тести були чисті
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    // --- 1. Завантаження сторінки ---
    test("loads the page", async ({ page }) => {
        await expect(page.getByRole("heading", { name: "Додати задачу" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Фільтри" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Задачі" })).toBeVisible();

        // 📸 Screenshot for LAB 7 (1.7.3)
        await page.screenshot({
            path: "screenshots/todo-home.png",
            fullPage: true
        });
    });

    // --- 2. Додавання задачі ---
    test("adds a new task", async ({ page }) => {

        await page.getByPlaceholder("Назва *").fill("E2E Task");
        await page.getByPlaceholder("Опис").fill("Testing");
        await page.getByLabel("Дата").fill("2024-12-01");

        await page.getByRole("button", { name: "Додати" }).click();

        // Перевіряємо що задача зʼявилась у таблиці
        await expect(page.getByText("E2E Task")).toBeVisible();
    });

    // --- 3. Перемикання статусу ---
    test("toggles task status (active -> done)", async ({ page }) => {

        await page.getByPlaceholder("Назва *").fill("Toggle Task");
        await page.getByLabel("Дата").fill("2024-12-01");
        await page.getByRole("button", { name: "Додати" }).click();

        // Чекбокс у рядку Task
        const row = page.locator("tr", { has: page.getByText("Toggle Task") });
        const checkbox = row.locator("input[type=checkbox]");

        await expect(checkbox).not.toBeChecked();

        await checkbox.check();

        await expect(checkbox).toBeChecked();
        await expect(page.getByText(/Виконані:\s*1/)).toBeVisible();
    });

    // --- 4. Фільтрація задач ---
    test("filters tasks", async ({ page }) => {

        // Додаємо Task A
        await page.getByPlaceholder("Назва *").fill("Task A");
        await page.getByLabel("Дата").fill("2024-12-01");
        await page.getByRole("button", { name: "Додати" }).click();

        // Додаємо Task B
        await page.getByPlaceholder("Назва *").fill("Task B");
        await page.getByLabel("Дата").fill("2024-12-01");
        await page.getByRole("button", { name: "Додати" }).click();

        // Позначаємо виконаною саме Task A
        const rowA = page.locator("tr", { has: page.getByText("Task A") });
        const checkboxA = rowA.locator("input[type=checkbox]");
        await checkboxA.check();

        // Фільтр виконаних задач
        await page.getByLabel("Статус").selectOption("done");

        await expect(page.getByText("Task A")).toBeVisible();
        await expect(page.getByText("Task B")).not.toBeVisible();
    });

    // --- 5. Видалення задачі ---
    test("deletes a task", async ({ page }) => {

        await page.getByPlaceholder("Назва *").fill("Delete Me");
        await page.getByLabel("Дата").fill("2024-12-01");
        await page.getByRole("button", { name: "Додати" }).click();

        await expect(page.getByText("Delete Me")).toBeVisible();

        // Кнопка видалення має class="danger"
        const deleteBtn = page.locator("tr", {
            has: page.getByText("Delete Me")
        }).locator("button.danger");

        await deleteBtn.click();

        // Після видалення Task має зникнути
        await expect(page.getByText("Delete Me")).not.toBeVisible();
    });

});

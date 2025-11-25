# Лабораторна робота №7

---

#  Встановлення та запуск

##  Встановлення залежностей

```bash
npm install
```

##  Запуск dev-сервера

```bash
npm run dev
```

Додаток доступний за адресою:

```
http://localhost:5173/
```

---

#  Запуск тестів

Усі тести поділені на:

- **Unit тести**
- **Component тести**
- **E2E тести**

---

##  Unit / Component тести (Vitest)

Запуск unit/component тестів:

```bash
npm run test:unit
```
![результат](screenshots/Screenshot%20at%20Oct%2004%2016-34-23.png)

Графічний режим Vitest UI:

```bash
npm run test:unit:ui
```
![результат](screenshots/Screenshot%20at%20Nov%2024%2020-43-08.png)
---

##  Coverage 

Команда:

```bash
npm run test:unit:cov
```

![результат](screenshots/Screenshot%20at%20Nov%2024%2020-43-55.png)
HTML-звіт знаходиться в:

```
coverage/index.html
```

Відкрити:

```bash
open coverage/index.html
```
![результат](screenshots/Screenshot%20at%20Nov%2024%2020-44-44.png)


##  E2E-тести Playwright

Запуск headless:

```bash
npm run test:e2e
```
![результат](screenshots/Screenshot%20at%20Nov%2024%2020-45-55.png)
Запуск у видимому браузері:

```bash
npm run test:e2e:headed
```
![результат](screenshots/Screenshot%20at%20Oct%2004%2016-34-23.png)
Режим UI Mode:

```bash
npm run test:e2e:ui
```
![результат](screenshots/Screenshot%20at%20Nov%2024%2020-51-40.png)
---


# Unit Tests

Файл: `tests/unit/todoUtils.test.js`

Протестовані функції:

###  `getActiveCount(list)`
Рахує кількість активних задач.

```js
const list = [
  { title: "A", done: false },
  { title: "B", done: true }
];
expect(getActiveCount(list)).toBe(1);
```

###  `filterTodos(list, status)`
Перевірка фільтрації списку задач за статусом.

```js
expect(filterTodos(list, "active")).toEqual([{ title: "A", done: false }]);
```

---

#   Component Tests (TodoList.vue)

Файл: `tests/components/TodoList.test.js`

###  Рендеринг компоненту

```js
const wrapper = mount(TodoList);
expect(wrapper.exists()).toBe(true);
```

---

###  Додавання задачі

```js
await wrapper.find("input").setValue("New Task");
await wrapper.find("button").trigger("click");
expect(wrapper.text()).toContain("New Task");
```

---

### Видалення задачі

```js
await wrapper.find("button.danger").trigger("click");
expect(wrapper.text()).not.toContain("New Task");
```

---

#   Coverage: що покрито / що не покрито

##  Покриті файли:

| Файл | Покриття | Протестовано |
|------|----------|--------------|
| **TodoList.vue** | ~60%     | рендер, додавання, видалення |
| **todoUtils.js** | ~55%     | getActiveCount, filterTodos |

---

##  Не покриті частини:

| Функція | Причина |
|--------|---------|
| `startEdit()` | Не протестовано редагування |
| `saveEdit()` | Не протестовано |
| `cancelEdit()` | Теж не охоплено |
| `formatDate()` | Не тестувався |
| Пагінація | Жодного тесту |
| Комбіновані фільтри | Протестовано тільки статус |

---

#  E2E-тести Playwright

Файл: `e2e/todo.spec.js`

Реалізовано 5 основних E2E-сценаріїв:

---

##   Завантаження сторінки + screenshot

```js
await page.screenshot({
  path: "screenshots/todo-home.png",
  fullPage: true
});
```

---

##   Додавання задачі

```js
await page.getByPlaceholder("Назва *").fill("E2E Task");
await page.getByRole("button", { name: "Додати" }).click();
await expect(page.getByText("E2E Task")).toBeVisible();
```

---

##  Перемикання статусу задачі

```js
const checkbox = row.locator("input[type=checkbox]");
await checkbox.check();
await expect(checkbox).toBeChecked();
```

---

##   Фільтрація задач

```js
await page.getByLabel("Статус").selectOption("done");
await expect(page.getByText("Task B")).not.toBeVisible();
```

---

##   Видалення задачі

```js
await deleteBtn.click();
await expect(page.getByText("Delete Me")).not.toBeVisible();
```

---

# . Playwright Codegen

Один тест записано автоматично через codegen.

Запуск:

```bash
npx playwright codegen http://localhost:5173
```

Отриманий код збережено у:

```
e2e/codegen.spec.js
```

---

#  Playwright UI Mode

Запуск:

```bash
npm run test:e2e:ui
```

UI Mode дозволяє переглядати:

- виконання тестів у реальному часі,
- DOM-стан,
- screenshots,
- таймлайн,
- assertion details.

---

# Лабораторна робота №1
## Тема: Знайомство з Vue.js 3 (Composition API)

---

##  запуск проєкту

1. Клонування та перехід у проєкт
   ```bash
   git clone https://github.com/YourUsername/VueJSLabs2025.git
   cd VueJSLabs2025/lab1
   ```

2. Встановлення залежностей
   ```bash
   npm install
   ```

3. Запуск дев-сервера
   ```bash
   npm run dev
   ```
   Проєкт відкриється за адресою http://localhost:5173

---

## Скріншоти та пояснення

### 1. Початковий вигляд застосунку
![Початковий екран](screenshots/Screenshot%20at%20Oct%2004%2017-21-39.png)

Інтерфейс після запуску:
- форма додавання задачі з обов’язковими полями;
- фільтри ще не активні;
- таблиця порожня;
- лічильники `Усього: 0`, `Активні: 0`, `Виконані: 0`.

---

### 2. Додано кілька задач
![Список задач](screenshots/Screenshot%20at%20Oct%2004%2017-26-02.png)

На цьому екрані вже створено задачі:
- відображається таблиця з назвами, описом, пріоритетом, датою;
- кнопки **Редагувати** і **Видалити** активні;
- лічильники показують актуальні дані (`Усього: 4`, `Активні: 4`, `Виконані: 0`).

---

### 3. Робота фільтра за назвою
![Фільтр за назвою](screenshots/Screenshot%20at%20Oct%2004%2017-26-56.png)

У полі **Title contains...** введено «ма»:
- `filteredTasks` (computed) одразу перераховує список;
- відображено лише задачу “Магазин купити”;


---

### 4. Робота фільтра за описом
![Фільтр за описом](screenshots/Screenshot%20at%20Oct%2004%2017-27-12.png)

Демонструє пошук за вмістом поля **Опис**:
- фільтр `filters.description` реактивно оновлює computed `filteredTasks`;
- залишилася лише одна задача, що містить введений текст.

---

### 5. Повний список задач з різними пріоритетами
![Усі задачі](screenshots/Screenshot%20at%20Oct%2004%2017-26-02.png)

Тут видно три задачі з різним пріоритетом:
- **Low**, **Medium**, **High** — відображені кольоровими тегами;
- усі активні;
- реалізовано сортування та відображення за computed `paginatedTasks`.

---

### 6. Vue DevTools – структура компонентів
![Vue DevTools структура](screenshots/Screenshot%20at%20Oct%2004%2017-29-40.png)

У Vue DevTools видно:
- компонент `<App>` і вкладений `<TodoList>`;
- реактивні змінні (`tasks`, `filters`, `page`, `pageSize`, `editId`, `editDraft`);
- computed-властивості (`total`, `activeCount`, `completedCount`, `filteredTasks`, `paginatedTasks`);
- методи (`addTask`, `removeTask`, `toggleStatus`, `startEdit`, `saveEdit`, `resetFilters` ).


![Vue DevTools структура](screenshots/Screenshot%20at%20Oct%2004%2017-59-00.png)
- масив tasks, який містить 4 задачі;
- кожен елемент є Reactive Object, що доводить — Vue відстежує зміни на рівні полів;
- computed filteredTasks та paginatedTasks автоматично оновлюються;
- статус і пріоритет (status: done, priority: low) змінюються миттєво при взаємодії з чекбоксами у застосунку;

![Vue DevTools структура](screenshots/Screenshot%20at%20Oct%2004%2018-00-07.png)

На цьому скріншоті видно:
- ключ STORAGE_KEY: lab1-tasks — саме під цим ім’ям дані зберігаються у LocalStorage;
- список tasks складається з 4 об’єктів, кожен містить поля:`title`, `description`, `status`, `priority`, `createdAt`, `id`;
- Vue DevTools відображає, що tasks  це Ref(Array), а значить watch стежить за всіма змінами у масиві;
- кожна зміна (наприклад, редагування або оновлення статусу) викликає спрацювання watch, який одразу оновлює запис у LocalStorage.
---

### 7. Виконані задачі (зміна статусу)
![Виконані задачі](screenshots/Screenshot%20at%20Oct%2004%2017-28-43.png)

На екрані:
- дві задачі відмічені як виконані (чекбокси);
- статуси оновлюються реактивно, рядки перекреслені (`.done`);
- computed `activeCount` і `completedCount` оновлені автоматично.

---

### 8. Фільтр за статусом “Виконані”
![Фільтр виконаних](screenshots/Screenshot%20at%20Oct%2004%2017-28-24.png)

Тут користувач вибрав у фільтрі статус **“Виконані”**:
- computed `filteredTasks` показує лише завершені задачі;
- у таблиці відображається одна виконана задача;
- лічильники `Активні: 3`, `Виконані: 1`.

---



##  застосовані ref / reactive

```js
const tasks = ref([])
const newTask = reactive({
  title: '',
  description: '',
  priority: 'medium',
  createdAt: new Date().toISOString().slice(0, 10),
})
const filters = reactive({
  title: '',
  description: '',
  status: '',
  priority: '',
  dateFrom: '',
  dateTo: '',
})
const page = ref(1)
const pageSize = ref(5)
const editId = ref(null)
const editDraft = reactive({ title: '', description: '' })
```

`ref` використано для простих значень і масивів, `reactive` — для групових об’єктів стану.

---

##  застосовані computed

```js
const total = computed(() => tasks.value.length)
const activeCount = computed(() => tasks.value.filter(t => t.status === 'active').length)
const completedCount = computed(() => tasks.value.filter(t => t.status === 'done').length)
```

Використано для підрахунку кількості задач, активних і виконаних.

---

## застосовано watch

```js
onMounted(() => {
  const raw = localStorage.getItem('lab1-tasks')
  tasks.value = raw ? JSON.parse(raw) : []
})

watch(tasks, (v) => localStorage.setItem('lab1-tasks', JSON.stringify(v)), {
  deep: true,
})
```

Список зберігається у **LocalStorage** під ключем `lab1-tasks`  
і автоматично оновлюється через `watch`.

---

## Використані директиви

- `v-model` — двостороння прив’язка у формах і фільтрах
- `v-on` або `@` — обробка подій (`click`, `submit`, `change`)
- `v-bind` або `:` — прив’язка динамічних атрибутів (`:class`, `:key`)
- `v-for` — відображення списку задач
- `v-if / v-else` — перемикання режиму редагування
- `v-show` — показ/приховування пагінації



<template>
  <section class="card">
    <h2>Додати задачу</h2>
    <form @submit.prevent="addTask">
      <div class="grid">
        <input v-model.trim="newTask.title" placeholder="Назва *" />
        <select v-model="newTask.priority" aria-label="Пріоритет">
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
        <input v-model.trim="newTask.description" placeholder="Опис" />
        <input v-model="newTask.createdAt" type="date" aria-label="Дата" />
      </div>
      <button type="submit" :disabled="!newTask.title.trim()">Додати</button>
      <small class="muted">Поля з * обов’язкові</small>
    </form>
  </section>

  <section class="card">
    <h2>Фільтри</h2>
    <div class="grid">
      <input v-model.trim="filters.title" placeholder="Title contains..." />
      <input v-model.trim="filters.description" placeholder="Description contains..." />
      <select v-model="filters.status" aria-label="Статус">
        <option value="">Будь-який статус</option>
        <option value="active">Активні</option>
        <option value="done">Виконані</option>
      </select>
      <select v-model="filters.priority" aria-label="Пріоритет">
        <option value="">Усі пріоритети</option>
        <option value="low">Низький</option>
        <option value="medium">Середній</option>
        <option value="high">Високий</option>
      </select>
      <input v-model="filters.dateFrom" type="date" aria-label="Від дати" />
      <input v-model="filters.dateTo" type="date" aria-label="До дати" />
    </div>
    <div class="row">
      <button type="button" @click="resetFilters">Очистити фільтри</button>
    </div>
  </section>

  <section class="stats">
    <span>Усього: <strong>{{ total }}</strong></span>
    <span>Активні: <strong>{{ activeCount }}</strong></span>
    <span>Виконані: <strong>{{ completedCount }}</strong></span>
  </section>

  <section class="card">
    <div class="row">
      <h2>Задачі</h2>
      <label>
        На сторінці:
        <select v-model.number="pageSize">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </label>
    </div>

    <table class="table">
      <thead>
      <tr>
        <th>Статус</th>
        <th>Назва</th>
        <th>Опис</th>
        <th>Пріоритет</th>
        <th>Створено</th>
        <th>Дії</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="t in paginatedTasks" :key="t.id">
        <td>
          <input
              type="checkbox"
              :checked="t.status === 'done'"
              @change="toggleStatus(t.id)"
              aria-label="Позначити виконаною"
          />
        </td>

        <template v-if="editId !== t.id">
          <td :class="{ done: t.status === 'done' }">{{ t.title }}</td>
          <td class="muted">{{ t.description }}</td>
        </template>
        <template v-else>
          <td><input v-model.trim="editDraft.title" /></td>
          <td><input v-model.trim="editDraft.description" /></td>
        </template>

        <td>
          <template v-if="editId !== t.id">
            <span class="tag" :data-p="t.priority">{{ t.priority }}</span>
          </template>
          <template v-else>
            <select v-model="editDraft.priority">
              <option value="low">Низький</option>
              <option value="medium">Середній</option>
              <option value="high">Високий</option>
            </select>
          </template>
        </td>

        <td>{{ formatDate(t.createdAt) }}</td>
        <td class="actions">
          <template v-if="editId !== t.id">
            <button type="button" @click="startEdit(t)">Редагувати</button>
            <button type="button" class="danger" @click="removeTask(t.id)">Видалити</button>
          </template>
          <template v-else>
            <button type="button" @click="saveEdit(t.id)" :disabled="!editDraft.title.trim()">Зберегти</button>
            <button type="button" class="ghost" @click="cancelEdit">Скасувати</button>
          </template>
        </td>
      </tr>

      <tr v-if="paginatedTasks.length === 0">
        <td colspan="6" class="muted center">Нічого не знайдено</td>
      </tr>
      </tbody>
    </table>

    <div class="pagination" v-show="totalPages > 1">
      <button type="button" @click="prevPage" :disabled="page === 1">«</button>
      <span>Сторінка {{ page }} з {{ totalPages }}</span>
      <button type="button" @click="nextPage" :disabled="page === totalPages">»</button>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";

const STORAGE_KEY = "lab1-tasks";
const tasks = ref([]);

const newTask = reactive({
  title: "",
  description: "",
  priority: "medium",
  createdAt: new Date().toISOString().slice(0, 10),
});

const filters = reactive({
  title: "",
  description: "",
  status: "",
  priority: "",
  dateFrom: "",
  dateTo: "",
});

const page = ref(1);
const pageSize = ref(5);

const editId = ref(null);
const editDraft = reactive({ title: "", description: "", priority: "medium" });

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    tasks.value = Array.isArray(parsed) ? parsed : [];
  } catch {
    tasks.value = [];
  }
});

watch(tasks, (v) => localStorage.setItem(STORAGE_KEY, JSON.stringify(v)), {
  deep: true,
});

watch(
    () => ({ ...filters, pageSize: pageSize.value }),
    () => {
      page.value = 1;
    },
    { deep: true },
);

const total = computed(() => tasks.value.length);
const activeCount = computed(() => tasks.value.filter((t) => t.status === "active").length);
const completedCount = computed(() => tasks.value.filter((t) => t.status === "done").length);

const filteredTasks = computed(() => {
  return tasks.value
      .filter((t) => (filters.title ? t.title.toLowerCase().includes(filters.title.toLowerCase()) : true))
      .filter((t) =>
          filters.description ? t.description?.toLowerCase().includes(filters.description.toLowerCase()) : true,
      )
      .filter((t) => (filters.status ? t.status === filters.status : true))
      .filter((t) => (filters.priority ? t.priority === filters.priority : true))
      .filter((t) => (filters.dateFrom ? t.createdAt >= filters.dateFrom : true))
      .filter((t) => (filters.dateTo ? t.createdAt <= filters.dateTo : true));
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredTasks.value.length / pageSize.value)));

const paginatedTasks = computed(() => {
  if (page.value > totalPages.value) page.value = 1;
  const start = (page.value - 1) * pageSize.value;
  return filteredTasks.value.slice(start, start + pageSize.value);
});

function addTask() {
  if (!newTask.title.trim()) return;
  tasks.value.unshift({
    id: crypto.randomUUID(),
    title: newTask.title.trim(),
    description: newTask.description?.trim() || "",
    status: "active",
    createdAt: newTask.createdAt,
    priority: newTask.priority,
  });
  newTask.title = "";
  newTask.description = "";
  resetFilters();
  page.value = 1;
}

function toggleStatus(id) {
  const t = tasks.value.find((x) => x.id === id);
  if (t) t.status = t.status === "active" ? "done" : "active";
}

function removeTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
}

function startEdit(t) {
  editId.value = t.id;
  editDraft.title = t.title;
  editDraft.description = t.description;
  editDraft.priority = t.priority;
}

function saveEdit(id) {
  const t = tasks.value.find((x) => x.id === id);
  if (!t || !editDraft.title.trim()) return;
  t.title = editDraft.title.trim();
  t.description = editDraft.description?.trim() || "";
  t.priority = editDraft.priority;
  cancelEdit();
}

function cancelEdit() {
  editId.value = null;
  editDraft.title = "";
  editDraft.description = "";
  editDraft.priority = "medium";
}

function resetFilters() {
  filters.title = "";
  filters.description = "";
  filters.status = "";
  filters.priority = "";
  filters.dateFrom = "";
  filters.dateTo = "";
  page.value = 1;
}

function nextPage() {
  if (page.value < totalPages.value) page.value++;
}
function prevPage() {
  if (page.value > 1) page.value--;
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fff;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
.row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  border-top: 1px solid #f1f5f9;
  padding: 0.5rem 0.4rem;
  vertical-align: top;
}
.muted {
  color: #6b7280;
  font-size: 0.9rem;
}
.center {
  text-align: center;
}
.actions button {
  margin-right: 0.25rem;
}
button {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.35rem 0.6rem;
  background: #f8fafc;
  cursor: pointer;
}
button:hover {
  background: #eef2ff;
}
button.danger {
  border-color: #fecaca;
  background: #fee2e2;
}
button.ghost {
  background: transparent;
}
input,
select {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.35rem 0.5rem;
  width: 100%;
}
h2 {
  margin: 0 0 0.75rem 0;
}
.done {
  text-decoration: line-through;
  color: #9ca3af;
}
.tag {
  text-transform: capitalize;
}
.tag[data-p="high"] {
  color: #b91c1c;
  font-weight: 600;
}
.tag[data-p="medium"] {
  color: #92400e;
}
.tag[data-p="low"] {
  color: #047857;
}
.stats {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0 1rem 0;
}
.pagination {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  margin-top: 0.75rem;
}
</style>

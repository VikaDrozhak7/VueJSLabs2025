<template>
  <main class="container">
    <h1>To-Do (Lab 1)</h1>
    <TodoList />
  </main>
</template>

<script setup>
import TodoList from "@/components/TodoList.vue";
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    "Apple Color Emoji",
    "Segoe UI Emoji";
}
h1 {
  margin: 0 0 1rem 0;
}
</style>

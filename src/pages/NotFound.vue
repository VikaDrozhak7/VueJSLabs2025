<template>
  <section class="container">
    <h2>Сторінку не знайдено</h2>
    <p class="muted">Схоже, ви перейшли за некоректним посиланням.</p>
    <RouterLink to="/">← На головну</RouterLink>
  </section>
</template>

<script setup>
</script>

<style scoped>
.container { padding: 2rem 0; }
.muted { color: var(--muted); margin: .5rem 0 1rem; }
</style>

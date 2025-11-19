<template>
  <header class="header">
    <div class="header-inner">

      <div class="logo" @click="$emit('scrollTo', 'hero')">
        <span class="logo-text">TaskFlow</span>
      </div>

      <nav class="nav">
        <button class="nav-item" @click="$emit('scrollTo', 'hero')">
          Головна
        </button>

        <button class="nav-item" @click="$emit('scrollTo', 'problem')">
          Проблема
        </button>

        <button class="nav-item" @click="$emit('scrollTo', 'advantages')">
          Переваги
        </button>

        <button class="nav-item" @click="$emit('scrollTo', 'how-it-works')">
          Як це працює
        </button>

        <button class="nav-item" @click="$emit('scrollTo', 'pricing')">
          Тарифи
        </button>

        <button class="nav-item" @click="$emit('scrollTo', 'faq')">
          FAQ
        </button>

        <button class="nav-item" @click="$emit('scrollTo', 'contact')">
          Контакти
        </button>
      </nav>

      <div class="header-actions">
        <Button
            label="Скопіювати демо"
            icon="pi pi-copy"
            @click="$emit('copyDemo')"
        />

        <Button
            label="Спробувати"
            class="p-button-raised p-button-primary"
            @click="$emit('scrollTo', 'contact')"
        />
      </div>

    </div>
  </header>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 0;
  animation: fadeIn 0.5s ease;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-item {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 6px 10px;
  transition: 0.2s;
}

.nav-item:hover {
  color: #007bff;
}

.header-actions {
  display: flex;
  gap: 12px;
}
</style>

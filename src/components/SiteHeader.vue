<script setup>
import { computed } from 'vue'

const props = defineProps({
  theme: { type: String, required: true }
})
const emit = defineEmits(['toggle-theme'])

const themeLabel = computed(() =>
    props.theme === 'dark' ? 'Світла тема' : 'Темна тема'
)
const onToggle = () => emit('toggle-theme')
</script>

<template>
  <header class="hdr container">
    <nav class="nav" aria-label="Головна навігація">
      <RouterLink to="/" class="logo">Житомирська політехніка новини</RouterLink>

      <div class="links">
        <RouterLink to="/">Головна</RouterLink>
        <RouterLink to="/about">Про нас</RouterLink>
      </div>

      <button
          class="theme"
          type="button"
          @click="onToggle"
          :aria-label="`Перемкнути тему. Зараз: ${props.theme === 'dark' ? 'темна' : 'світла'}`"
          :title="themeLabel"
      >
        {{ themeLabel }}
      </button>
    </nav>
  </header>
</template>

<style scoped>
.hdr {
  margin: var(--space-4) 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  background: var(--card);
  background: color-mix(in srgb, var(--card) 88%, transparent);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) - 4px);
  backdrop-filter: blur(6px);
  box-shadow: var(--shadow-sm);
}

.links {
  display: flex;
  gap: 14px;
}

.links :deep(a) {
  color: inherit;
  text-decoration: none;
  padding: 4px 6px;
  border-radius: 8px;
  transition: background-color 180ms ease, color 180ms ease;
}

.links :deep(a:hover),
.links :deep(a:focus-visible) {
  background: color-mix(in srgb, var(--card) 70%, transparent);
  outline: none;
}

:deep(.is-active) {
  font-weight: 700;
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.logo {
  font-weight: 800;
  letter-spacing: 0.2px;
  padding: 6px 10px;
  border-radius: 10px;
  background: var(--card);
  border: 1px solid var(--border);
}

.theme {
  border: 1px solid var(--border);
  background: transparent;
  color: inherit;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.theme:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
  border-color: var(--accent);
}

.theme:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .links :deep(a),
  .theme {
    transition: none !important;
  }
}

@media (max-width: 600px) {
  .nav {
    gap: 8px;
  }
  .logo {
    padding: 4px 8px;
  }
  .links {
    gap: 10px;
  }
}
</style>

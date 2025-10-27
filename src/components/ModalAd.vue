<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const onKey = (e) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="wrap" @click.self="$emit('close')">
        <div class="modal container">
          <h3>🎓 День відкритих дверей Житомирської політехніки</h3>
          <p>
            Запрошуємо абітурієнтів, студентів і всіх охочих дізнатися більше про
            можливості навчання, сучасні лабораторії, ІТ-програми та міжнародні обміни.
          </p>
          <p>
            Долучайся до інноваційної спільноти вже сьогодні — твоя кар’єра починається тут!
          </p>

          <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:12px">
            <button class="btn" @click="$emit('close')">Закрити</button>
            <a
                class="btn"
                href="https://ztu.edu.ua/"
                target="_blank"
                rel="noopener"
            >Дізнатись більше</a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.wrap {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: var(--space-4);
  backdrop-filter: blur(4px);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
.modal-enter-active,
.modal-leave-active {
  transition: all var(--t-base) cubic-bezier(0.2, 0.7, 0.3, 1);
}

.modal {
  max-width: 560px;
  width: 100%;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  text-align: left;
}

.btn {
  border: 1px solid var(--border);
  background: transparent;
  color: inherit;
  padding: 8px 12px;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  transition: transform var(--t-fast), box-shadow var(--t-fast),
  border-color var(--t-fast);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
  border-color: var(--accent);
}

.btn:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
</style>

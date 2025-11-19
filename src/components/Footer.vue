<template>
  <footer class="app-footer">
    <div class="footer-inner">


      <div class="footer-brand">
        <span class="footer-logo"></span>
        <strong>TaskFlow.cloud</strong>
      </div>


      <div class="footer-links">
        <button class="footer-link-btn" @click="$emit('scrollTo', 'pricing')">
          Тарифи
        </button>

        <button class="footer-link-btn" @click="$emit('scrollTo', 'faq')">
          FAQ
        </button>

        <button class="footer-link-btn" @click="$emit('scrollTo', 'contact')">
          Контакти
        </button>

        <a href="#" class="footer-static-link">Політика конфіденційності</a>
      </div>


      <div class="footer-copy">
        © {{ currentYear }} TaskFlow.cloud — Всі права захищено
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  padding: 2.5rem 1rem;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  animation: fadeIn 1s ease both;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

.footer-brand {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  opacity: .9;
}

.footer-logo {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(135deg, #22c55e, #3b82f6);
  display: inline-block;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
}

.footer-link-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #1e293b;
  font-size: 0.9rem;
  padding: 0.25rem;
  transition: 0.25s ease;
}

.footer-link-btn:hover {
  color: #2563eb;
  transform: translateY(-2px);
}

.footer-static-link {
  color: #1e293b;
  text-decoration: none;
  transition: 0.25s ease;
}

.footer-static-link:hover {
  color: #2563eb;
}

.footer-copy {
  font-size: 0.85rem;
  opacity: .7;
}

/* Animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>

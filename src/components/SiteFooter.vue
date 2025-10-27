<template>
  <footer class="footer">
    <div class="container" style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
      <small>© {{ new Date().getFullYear() }} Vue Lab #3</small>

      <nav class="links">

        <a href="https://ztu.edu.ua/" target="_blank" rel="noopener noreferrer">
          Житомирська політехніка
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  padding: 16px 0;
  background: var(--bg);
  border-top: 1px solid var(--border);
  color: var(--muted);
}

.links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.links a {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.links a:hover {
  color: var(--brand);
}
</style>

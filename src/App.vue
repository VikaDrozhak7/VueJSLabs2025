<template>
  <div class="app">
    <header class="header">
      <nav class="nav">
        <RouterLink to="/profile">{{ t('menu.profile') }}</RouterLink>
        <RouterLink to="/cart">{{ t('menu.cart') }}</RouterLink>
        <RouterLink to="/products">{{ t('menu.products') }}</RouterLink>
      </nav>

      <LanguageSwitcher />

      <h1>{{ t('appTitleUpper') }}</h1>
    </header>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 16px 22px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  margin-bottom: 28px;
}

.nav {
  display: flex;
  gap: 18px;
}

.nav a {
  font-size: 16px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 8px;
  transition: 0.2s;
}

.nav a.router-link-active {
  background: #eef3ff;
  color: #365acb;
  font-weight: 700;
}

.main {
  margin-top: 10px;
}
</style>

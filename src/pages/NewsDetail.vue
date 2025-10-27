<script setup>
import { computed, inject } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { findNewsById } from '@/data/news'
import AdBanner from '@/components/AdBanner.vue'
import bannerMain from '@/assets/banner_main.jpg'

const route = useRoute()
const id = Number(route.params.id)
const entry = computed(() => findNewsById(id))

const openAd = inject('openAd', () => {})
const accentColor = computed(() => '#3b82f6')
</script>

<template>
  <section v-if="entry" class="container article">
    <RouterLink to=".." class="back-link">← Назад</RouterLink>

    <h2 class="title">{{ entry.title }}</h2>
    <small class="date">{{ new Date(entry.date).toLocaleDateString('uk-UA') }}</small>

    <img
        v-if="entry.image"
        :src="entry.image"
        :alt="entry.title"
        class="hero"
    />

    <p class="body">{{ entry.body }}</p>

    <AdBanner
        position="inline"
        :image="bannerMain"
        title="🎓 Долучайся до ІТ-спільноти Житомирської політехніки"
        subtitle="Слідкуй за навчальними програмами та подіями університету!"
        @click="openAd && openAd()"
    />
  </section>

  <section v-else class="container">
    <p>Новину не знайдено.</p>
    <RouterLink to="/">На головну</RouterLink>
  </section>
</template>

<style scoped>
.article {
  display: grid;
  gap: var(--space-4);
  margin-top: 1rem;
}

.back-link {
  text-decoration: none;
  color: v-bind(accentColor);
  font-weight: 500;
}

.title {
  margin-top: 10px;
  color: var(--text);
}

.date {
  color: var(--muted);
}

.hero {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.body {
  margin-top: 12px;
  line-height: 1.6;
  white-space: pre-line;
}
</style>

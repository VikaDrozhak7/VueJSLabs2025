<script setup>
import { computed, inject, ref, watch } from 'vue'
import { NEWS } from '@/data/news'
import NewsCard from '@/components/NewsCard.vue'
import AdBanner from '@/components/AdBanner.vue'

const openAd = inject('openAd')

const q = ref('')
const qDebounced = ref('')

let t
watch(q, (val) => {
  clearTimeout(t)
  t = setTimeout(() => (qDebounced.value = val.trim().toLowerCase()), 250)
})

const list = computed(() => {
  if (!qDebounced.value) return NEWS
  return NEWS.filter((n) => {
    const hay = (n.title + ' ' + n.summary + ' ' + n.body).toLowerCase()
    return hay.includes(qDebounced.value)
  })
})
</script>

<template>
  <section class="container">
    <h1>Список новин</h1>

    <div class="search-bar">
      <input
          v-model="q"
          type="search"
          placeholder="Пошук новин..."
          class="search-input"
      />
      <button
          class="clear-btn"
          type="button"
          @click="q = ''"
          :disabled="!q"
      >
        <span class="icon">✕</span>
        <span class="label">Очистити</span>
      </button>
    </div>

    <div class="ad-block">
      <AdBanner @click="openAd && openAd()" />
    </div>

    <div class="grid news-list">
      <NewsCard v-for="item in list" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
h1 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: clamp(1.6rem, 2.4vw, 2rem);
  font-weight: 700;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.search-input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--fg);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent);
  outline: none;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: color-mix(in srgb, var(--card) 90%, var(--bg));
  color: var(--fg);
  cursor: pointer;
  transition:
      background 0.25s ease,
      color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.2s ease;
}

.clear-btn:hover:not(:disabled) {
  background: var(--accent);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.clear-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-btn .icon {
  font-size: 1rem;
  line-height: 1;
}

.ad-block {
  margin-bottom: 1.5rem;
}

.news-list {
  margin-top: 1rem;
}

@media (max-width: 600px) {
  .label {
    display: none;
  }
  .clear-btn {
    padding: 8px 10px;
  }
}
</style>

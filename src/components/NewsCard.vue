<script setup>
import { computed } from 'vue'
import styles from './NewsCard.module.css'

const props = defineProps({
  item: { type: Object, required: true },
})

const dateStr = computed(() =>
    new Date(props.item.date).toLocaleDateString('uk-UA')
)

const cardClass = computed(() => [
  'card',
  styles.card,
  props.item.featured ? styles.featured : null
])
</script>

<template>
  <article :class="cardClass" tabindex="-1">
    <img :src="item.image" :alt="item.title" loading="lazy" :class="styles.preview" />

    <div :class="styles.row">
      <h3 :class="styles.title">
        <RouterLink :to="`/article/${item.id}`">{{ item.title }}</RouterLink>
      </h3>
      <span :class="styles.muted">{{ dateStr }}</span>
    </div>

    <p>{{ item.summary }}</p>

    <RouterLink class="btn" :to="`/article/${item.id}`">Читати</RouterLink>
  </article>
</template>

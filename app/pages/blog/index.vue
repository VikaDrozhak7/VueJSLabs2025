<!-- app/pages/blog/index.vue -->
<script setup lang="ts">
useSeoMeta({
  title: 'Інформаційні матеріали — Житомирська політехніка',
  description: 'Добірка інформаційних матеріалів про історію, студентське життя та міжнародну діяльність Житомирської політехніки.',
  ogTitle: 'Інформаційні матеріали — Житомирська політехніка',
  ogDescription: 'Статті та аналітичні матеріали університету.'
})

const { data: posts, pending, error } = await useFetch('/api/posts')
</script>

<template>
  <div>
    <section class="section-gray">
      <h1>Інформаційні матеріали</h1>
      <p>
        Тут зібрані статті, що розкривають історію, освітні програми, студентське життя
        та міжнародну співпрацю Житомирської політехніки.
      </p>
    </section>

    <div v-if="pending">
      <UAlert title="Завантаження матеріалів..." />
    </div>

    <div v-else-if="error">
      <UAlert color="error" title="Помилка" :description="error.message" />

    </div>

    <div v-else class="grid-2">
      <UCard
          v-for="post in posts"
          :key="post.slug"
          class="card"
      >
        <h2>{{ post.title }}</h2>
        <p>
          <!-- трохи обрізаємо текст (без HTML) -->
          {{ post.content.replace(/<[^>]+>/g, '').slice(0, 150) }}...
        </p>
        <NuxtLink :to="`/blog/${post.slug}`" class="btn btn-primary">
          Детальніше
        </NuxtLink>
      </UCard>
    </div>
  </div>
</template>

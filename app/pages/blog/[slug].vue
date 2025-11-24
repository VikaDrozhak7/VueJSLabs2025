<!-- app/pages/blog/[slug].vue -->
<script setup lang="ts">
const route = useRoute()

const { data: post, pending, error } = await useFetch(
    () => `/api/posts/${route.params.slug}`
)

useSeoMeta({
  title: () => (post.value ? `${post.value.title} — Житомирська політехніка` : 'Матеріал — Житомирська політехніка'),
  description: () => (post.value ? post.value.title : 'Інформаційний матеріал університету.'),
  ogTitle: () => (post.value ? post.value.title : 'Матеріал'),
  ogDescription: () => (post.value ? post.value.title : 'Інформаційний матеріал про університет.')
})
</script>

<template>
  <div>
    <div v-if="pending">
      <UAlert title="Завантаження матеріалу..." />
    </div>

    <div v-else-if="error">
      <UAlert color="error" title="Матеріал не знайдено" />

    </div>

    <article v-else class="section-light">
      <h1>{{ post?.title }}</h1>
      <div class="article" v-html="post?.content" />

      <section class="section-gray" style="margin-top: 30px;">
        <h2>Житомирська політехніка сьогодні</h2>
        <p>
          Університет активно розвиває нові освітні програми, оновлює матеріально-технічну базу,
          підтримує цифровізацію навчального процесу та створює можливості для розвитку студентів
          і молодих науковців.
        </p>
      </section>
    </article>
  </div>
</template>

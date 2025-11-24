# Проєкт Nuxt.js 4 — README

##  Запуск проєкту

### 1. Встановлення залежностей

```bash
npm install
```

### 2. Запуск у режимі розробки

```bash
npm run dev
```

### 3. Білд для продакшену

```bash
npm run build
```

### 4. Запуск зібраного проєкту

```bash
npm run preview
```

---



###  Головна сторінка — `/`


![Сторінка](screen/Screenshot%20at%20Nov%2024%2019-23-06.png)
![Сторінка](screen/Screenshot%20at%20Nov%2024%2019-23-06.png)

###  Сторінка блогу — `/blog`


![Сторінка блогу](screen/Screenshot%20at%20Nov%2024%2019-29-20.png)


### Сторінка поста — `/blog/[slug]`


![Сторінка поста](screen/Screenshot%20at%20Nov%2024%2019-30-39.png)


###  Сторінка "Про нас" — `/about`


![Сторінка "Про нас"](screen/Screenshot%20at%20Nov%2024%2019-31-12.png)





---


### Використання `useFetch`


###  Отримання списку постів блогу — `app/pages/blog/index.vue`

```vue
<script setup lang="ts">
const { data: posts } = await useFetch('/api/posts')
</script>

<template>
  <div>
    <h1>Блог</h1>
    <UCard v-for="post in posts" :key="post.slug" class="my-4">
      <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
    </UCard>
  </div>
</template>
```

###  Отримання одного поста — `app/pages/blog/[slug].vue`

```vue
<script setup lang="ts">
const route = useRoute()
const { data: post } = await useFetch(`/api/posts/${route.params.slug}`)
</script>

<template>
  <article>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </article>
</template>
```

`useFetch` використовується для отримання даних із внутрішнього API Nuxt.



Використання:

* **Сторінка блогу:** `app/pages/blog/index.vue`
* **Сторінка детального поста:** `app/pages/blog/[slug].vue`

API-ендпоїнти:

* `/server/api/posts.ts`
* `/server/api/posts/[slug].ts`

---

## ️ Розташування API-коду

 REST API реалізований у директорії `server/api/`.


###  Список постів — `server/api/posts.ts`

```ts
export default defineEventHandler(() => {
  return [
    { slug: 'welcome', title: 'Вітальна стаття', content: 'Текст…' },
    { slug: 'nuxt-guide', title: 'Гайд по Nuxt 4', content: 'Текст…' }
  ]
})
```

###  Окремий пост — `server/api/posts/[slug].ts`

```ts
export default defineEventHandler((event) => {
  const slug = event.context.params.slug
  const posts = [
    { slug: 'welcome', title: 'Вітальна стаття', content: 'Текст…' },
    { slug: 'nuxt-guide', title: 'Гайд по Nuxt 4', content: 'Текст…' }
  ]

  return posts.find((p) => p.slug === slug)
})
```

Усі маршрути API знаходяться у папці:

```
server/api/
```



##  Налаштування SEO-тегів

SEO у проєкті налаштоване за допомогою `useSeoMeta()` та `useHead()`.

###  Приклад із головної сторінки — `app/pages/index.vue`

```ts
<script setup lang="ts">
useSeoMeta({
  title: 'Житомирська політехніка — Головна',
  description: 'Офіційна інформація про університет',
  ogTitle: 'Житомирська політехніка — Головна',
  ogDescription: 'Сучасний університет з технічними та IT-напрямами.'
})
</script>
```

###  Розширені метатеги через `useHead()` — `app/pages/blog/[slug].vue`

```ts
useHead({
  meta: [
    { name: 'author', content: 'Cleveroad' },
    { property: 'og:type', content: 'article' }
  ]
})
```

У проєкті використовуються:

* `useSeoMeta()` — основний спосіб налаштування SEO у сторінках
* `useHead()` — для складніших мета-тегів

### Де використовується

* **Головна сторінка**: `app/pages/index.vue`
* **Сторінка "Про нас"**: `app/pages/about.vue`
* **Сторінка поста**: `app/pages/blog/[slug].vue`

### Приклад (із сторінки `index.vue`)

```ts
useSeoMeta({
  title: 'Житомирська політехніка — Головна',
  description: 'Офіційна інформація про університет',
  ogTitle: 'Житомирська політехніка — Головна'
})
```

---

## Sitemap та Robots



###  `sitemap.config.ts`

```ts

import { posts } from './server/postsData'

export default {
    sitemaps: {
        default: {
            urls: [
                '/',
                '/about',
                '/blog',
                ...posts.map(p => `/blog/${p.slug}`)
            ]
        }
    }
}

```

### До sitemap додаються основні статичні сторінки:

індексується через sitemap

* Головна сторінка — `/`
* Сторінка "Про нас" — `/about`
* Сторінка блогу — `/blog`


Таким чином **усі публічні сторінки сайту доступні для індексації**. 

###  `robots в файлф nuxt.config.ts `

```ts
robots: {
    allow: ['/'],
        disallow: ['/admin', '/api'],
        sitemap: '/sitemap.xml'
}
```
Дозволено індексувати

* Весь публічний сайт (`allow: ['/']`)

###  Заборонено індексувати

* `/admin` — адміністративна зона
* `/api` — серверні ендпоїнти

### Sitemap


  ![Сторінка блогу](screen/Screenshot%20at%20Nov%2024%2019-34-07.png)
### Robots.txt

![Сторінка блогу](screen/Screenshot%20at%20Nov%2024%2020-25-57.png)
---
Компоненти Nuxt UI

Використані компоненти з пакету `@nuxt/ui`:

Приклади (залежно від проєкту):

* `<UButton>` на сторінках навігації
* `<UCard>` у списку постів (`/blog`)
* `<UContainer>` у макеті `app/layouts/default.vue`

Файли, де зустрічаються компоненти:

* `app/pages/blog/index.vue`
* `app/pages/blog/[slug].vue`
* `app/pages/index.vue`

---
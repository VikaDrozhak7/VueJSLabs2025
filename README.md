# Лабораторна робота №3




###  1. Створення маршрутизації проєкту

У файлі `src/router/index.js` створено маршрути:
```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import NewsDetail from '@/pages/NewsDetail.vue'
import About from '@/pages/About.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/article/:id', component: NewsDetail },
    { path: '/about', component: About },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ],
  scrollBehavior: () => ({ top: 0 }),
  linkActiveClass: 'is-active'
})

export default router
```
визначено всі маршрути, реалізовано поведінку скролу, активне підсвічування посилань.

---

### 2. Головна сторінка (Home.vue)

На головній сторінці відображається список новин із файлу `src/data/news.js`:

```vue
<script setup>
import { NEWS } from '@/data/news'
import NewsCard from '@/components/NewsCard.vue'
import AdBanner from '@/components/AdBanner.vue'
</script>

<template>
  <section class="container">
    <AdBanner /> <!-- Рекламний блок -->
    <div class="grid news-list">
      <NewsCard v-for="item in NEWS" :key="item.id" :item="item" />
    </div>
  </section>
</template>
```
виведення масиву даних, використано компонент для кожної картки.

---

### 3. Компонент новини (NewsCard.vue)

Використано **CSS Modules**:
```vue
<script setup>
import styles from './NewsCard.module.css'
defineProps({ item: Object })
</script>

<template>
  <article :class="styles.card">
    <img :src="item.image" :alt="item.title" />
    <h3 :class="styles.title">{{ item.title }}</h3>
    <RouterLink :to="`/article/${item.id}`">Читати далі</RouterLink>
  </article>
</template>
```

`NewsCard.module.css`:
```css
.card {
  background: var(--card);
  border-radius: 10px;
  padding: 12px;
  transition: transform 0.2s ease;
}
.card:hover { transform: translateY(-3px); }
.title { font-weight: bold; }
```

застосовано CSS Modules для інкапсуляції стилів.

---

###  4. Детальна сторінка новини (NewsDetail.vue)

```vue
<script setup>
import { useRoute } from 'vue-router'
import { NEWS } from '@/data/news'
import AdBanner from '@/components/AdBanner.vue'

const route = useRoute()
const item = NEWS.find(n => n.id === Number(route.params.id))
</script>

<template>
  <section v-if="item">
    <h1>{{ item.title }}</h1>
    <img :src="item.image" />
    <p>{{ item.text }}</p>
    <AdBanner />
  </section>
</template>
```

відображення вибраної новини, додано рекламний слот.

---

### 5. Модальне вікно через Teleport (ModalAd.vue)

```vue
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="overlay" @click.self="$emit('close')">
        <div class="modal">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.6);
  display: flex; align-items: center; justify-content: center;
}
.modal {
  background: var(--bg);
  padding: 20px; border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,.3);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

модалка рендериться у `body` через Teleport, має плавну анімацію.

---

###  6. Перемикач теми (Light/Dark)

Файл `src/composables/useTheme.js`:

```js
import { ref, watch } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light')
  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
    localStorage.setItem('theme', theme.value)
  }
  watch(theme, applyTheme)
  const toggleTheme = () => theme.value = theme.value === 'dark' ? 'light' : 'dark'
  return { theme, toggleTheme, applyTheme }
}
```
 збереження стану теми в LocalStorage, динамічна зміна класу `dark`.

---

###  7. Анімації переходів між сторінками

У `App.vue` реалізовано анімацію `<Transition>`:

```vue
<template>
  <SiteHeader @toggle-theme="toggleTheme" />
  <Transition name="fade" mode="out-in">
    <RouterView />
  </Transition>
  <SiteFooter />
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

 плавні переходи сторінок 

---

###  8. Рекламні блоки (AdBanner.vue)

Компонент `AdBanner.vue` використовується тричі на головній сторінці та сторінці новини та про нас.

```vue
<template>
  <div class="ad" role="button" tabindex="0" @click="$emit('open')">
    <img :src="image" alt="Ad banner" />
    <p>{{ title }}</p>
  </div>
</template>

<style scoped>
.ad {
  display: flex; flex-direction: column; align-items: center;
  padding: 10px; border: 1px solid #ddd; border-radius: 8px;
  cursor: pointer; transition: transform 0.2s ease;
}
.ad:hover { transform: scale(1.03); }
</style>
```
Нижче наведено скріншоти інтерфейсу застосунку, що демонструють виконання лабораторної роботи:

1. **Головна сторінка (Home.vue)**  
   ![Головна сторінка](screen/Screenshot%20at%20Oct%2020%2018-04-08.png)
2. **Головна сторінка (Home.vue)**  
   ![Головна сторінка](screen/Screenshot%20at%20Oct%2020%2018-05-34.png)
 
3. **Головна сторінка (Home.vue) наведення на рекламний блок**  
   ![Головна сторінка](screen/Screenshot%20at%20Oct%2020%2018-06-59.png)

4. **Детальна новина (NewsDetail.vue)**  
   ![Детальна новина](screen/Screenshot%20at%20Oct%2020%2018-08-32.png)

5. **Детальна новина (NewsDetail.vue)**  
![Детальна новина](screen/Screenshot%20at%20Oct%2020%2018-10-14.png)
6. **Детальна новина (NewsDetail.vue) наведення на рекламний блок**  
![Детальна новина](screen/Screenshot%20at%20Oct%2020%2018-12-42.png)

7. **Сторінка “Про нас” (About.vue)**  
   ![Сторінка About](screen/Screenshot%20at%20Oct%2020%2018-14-17.png)

8. **Сторінка “Про нас” (About.vue)**  
![Сторінка About](screen/Screenshot%20at%20Oct%2020%2018-18-02.png)

9. **Сторінка “Про нас” (About.vue) наведення на рекламний блок**  
![Сторінка About](screen/Screenshot%20at%20Oct%2020%2018-18-56.png)

10. **Модальне вікно реклами (ModalAd.vue)**  
   ![Модалка реклами](screen/Screenshot%20at%20Oct%2020%2018-21-01.png)

11. **Темна тема (Dark Mode)**  
   ![Темна тема](screen/Screenshot%20at%20Oct%2020%2018-21-29.png)
12.**Пошук**
   ![Пошук](screen/Screenshot%20at%20Oct%2020%2018-22-28.png)


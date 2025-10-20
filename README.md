# Лабораторна робота №2 

 Інсталяція та запуск

```bash
git clone https://github.com/VikaDrozhak7/VueJSLabs2025
cd VueJSLabs2025/lab2
npm install
npm run dev
```
Додаток буде доступний за адресою [http://localhost:5173](http://localhost:5173)

---


## Реалізовані вимоги

### Маршрутизація (Vue Router)

```js
{
  path: '/admin',
  meta: { requiresAuth: true },
  component: () => import('../layouts/AdminLayout.vue'),
  children: [
    { path: 'dashboard', component: () => import('../pages/admin/Dashboard.vue') },
    { path: 'users', component: () => import('../pages/admin/Users.vue') },
    { path: 'user/:id', component: () => import('../pages/admin/UserDetails.vue'), props: true },
    { path: 'reports', component: () => import('../pages/admin/Reports.vue') }
  ]
}
```

 **Lazy-loading компонентів**  
 **Catch-all NotFound**  
 **beforeEach guard** перевіряє `requiresAuth`:

```js
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    return { name: 'login' }
  }
})
```

---

###  Props / Emits / v-model / defineModel

```vue
<script setup>
const model = defineModel({ type: String })
const props = defineProps({ label: String, type: String, error: String })
const emit = defineEmits(['blur'])
</script>

<template>
  <label>{{ label }}</label>
  <input :type="type" v-model="model" @blur="$emit('blur', model)" />
  <span v-if="error" class="error">{{ error }}</span>
</template>
```

---

###  Provide / Inject

```vue
<!-- App.vue -->
<script setup>
import { ref, provide } from 'vue'
import { getCurrentUser } from './services/auth'
const currentUser = ref(getCurrentUser())
provide('currentUser', currentUser)
</script>
```

```vue
<!-- AdminLayout.vue -->
<script setup>
import { inject } from 'vue'
const currentUser = inject('currentUser')
</script>

<template>
  <div>Signed in as: {{ currentUser?.value?.email }}</div>
</template>
```

---

###  Слоти

####  Простий слот
```vue
<!-- AuthWrapper.vue -->
<template>
  <div class="card">
    <slot name="title" />
    <slot name="subtitle" />
    <slot />
  </div>
</template>
```

####  Scoped Slot
```vue
<!-- Reports.vue -->
<slot name="row" :item="r">
  <tr>
    <td>{{ r.id }}</td>
    <td>{{ r.title }}</td>
    <td>{{ r.status }}</td>
  </tr>
</slot>
```

---

###  KeepAlive

```vue
<!-- Dashboard.vue -->
<KeepAlive :include="['OverviewTab']" :max="2">
  <component :is="currentTab" />
</KeepAlive>
```
> Використано для збереження стану вкладок Dashboard ( лічильник не скидається).

---

###  Імітація бекенду

```js
// services/auth.js
export function login({ email, password }) {
  const user = { id: 1, email, token: 'fake' }
  localStorage.setItem('lab_user', JSON.stringify(user))
  return user
}
```

---

##  Використані концепти

| Тема | Де реалізовано |
|------|----------------|
| Props / Emits | `InputField.vue` |
| v-model / defineModel | `InputField.vue` |
| Provide / Inject | `App.vue`, `AdminLayout.vue` |
| Slots | `AuthWrapper.vue`, `Sidebar.vue`, `Reports.vue` |
| Scoped Slot | `Reports.vue` |
| KeepAlive | `Dashboard.vue` |
| Vue Router + Guards | `router/index.js` |
| Імітація API | `services/auth.js` |

---

##  Результати роботи


###  Головна сторінка
![Home Screenshot](public/screen/Screenshot%20at%20Oct%2015%2016-16-19.png)
Це публічна сторінка (meta.public=true).
###  Сторінка входу
![Login Screenshot](public/screen/Screenshot%20at%20Oct%2015%2016-29-21.png)
###  Сторінка реєстрації
![Login Screenshot](public/screen/Screenshot%20at%20Oct%2015%2016-35-43.png)
 
### Панель адміністратора (Dashboard)
![Dashboard Screenshot](public/screen/Screenshot%20at%20Oct%2015%2016-44-34.png)
![Dashboard Screenshot](public/screen/Screenshot%20at%20Oct%2015%2016-45-03.png)
![Dashboard Screenshot](public/screen/Screenshot%20at%20Oct%2015%2016-46-34.png)
Стан вкладок зберігається через &lt;KeepAlive&gt;
### Таблиця користувачів
![Users Screenshot](public/screen/Screenshot%20at%20Oct%2015%2016-47-07.png)
![Users Screenshot](public/screen/Screenshot%20at%20Oct%2015%2016-48-34.png)
###  Звіти (Scoped Slot)
![Reports Screenshot](public/screen/Screenshot%20at%20Oct%2015%2016-50-16.png)
Ця таблиця підтримує scoped-slot <code>#row="{ item }"</code> для кастомного рендеру з батька.

###  404 
![404](public/screen/Screenshot%20at%20Oct%2015%2017-05-31.png)

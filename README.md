# Лабораторна робота 4

## 1. Кроки запуску

### Клонувати репозиторій
```
git clone https://github.com/YourUsername/VueJSLabs2025.git
```

###  Перейти в папку лабораторної
```
cd lab4
```

###  Встановити залежності
```
npm install
```

### 4Запустити проект
```
npm run dev
```

Проєкт відкриється за адресою http://localhost:5173

---



---

## 2. Перелік сторів

- settings  src/stores/settings.js  (Мова, персистентність),
- cart  src/stores/cart.js (Товари у кошику)  
- products src/stores/products.js (Список товарів, локалізація)  

---

## 3. Виконання вимог

### PINIA
####  createPinia
```js
const pinia = createPinia()
app.use(pinia)
```

####  defineStore
```js
export const useSettingsStore = defineStore('settings', {
  state: () => ({ locale: 'ua' })
})
```

####  storeToRefs
```js
const { items: products } = storeToRefs(productsStore)
```

#### persistedstate
```js
persist: {
  key: 'settings-store',
  paths: ['locale']
}
```

---

### i18n
#### createI18n
```js
createI18n({
  legacy: false,
  locale,
  messages: { ua, en }
})
```

####  кастомний модифікатор
```js
upper: s => s.toUpperCase()
```

####  синхронізація з Pinia
```js
const i18n = setupI18n(settings.locale)
```

---

### VeeValidate
####  configure()
```js
configure({
  validateOnBlur: true
})
```

####  useForm / useField / useFieldArray
```js
const { errors, handleSubmit } = useForm({
  validationSchema: schema
})
```

#### Yup-схема
```js
const schema = yup.object({
  name: yup.string().required(t("errors.required"))
})
```

####  setFieldError
```js
setFieldError("email", t("errors.emailTaken"))
```

---

## 4. Реалізований функціонал
![Сторінка ](screen/Screenshot%20at%20Nov%2018%2013-10-57.png)
![Сторінка ](screen/Screenshot%20at%20Nov%2018%2013-11-41.png)
![Сторінка ](screen/Screenshot%20at%20Nov%2018%2013-13-34.png)

- Управління кошиком

![Сторінка ](screen/Screenshot%20at%20Nov%2018%2013-18-44.png)

- Валідація форм
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2013-41-33.png)
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2013-43-43.png)
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2013-57-56.png)
 ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2014-06-51.png)


- Локалізація
  
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2014-07-44.png)
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2014-08-25.png)
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2014-09-12.png)
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2014-11-26.png)




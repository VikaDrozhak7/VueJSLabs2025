#  Лабораторна робота №5 


---

#   Запуск проєкту

## 1 Клонування або завантаження проєкту
```sh
git clone https://github.com/YourUsername/VueJSLabs2025.git
cd lab5
```

##  Встановлення залежностей
```sh
npm install
```

##  Запуск у режимі розробки
```sh
npm run dev
```

Після запуску Vite надасть локальну адресу, наприклад:
```
http://localhost:5173/
```




---

#  Опис лендінгу 

## Header
- Логотип, навігація по секціях
- Кнопки: “Скопіювати демо-лінк”, “Спробувати”
- Плавний скрол по сторінці через emit → scrollTo()
 

## Hero (Герой-секція)
- Яскравий заголовок та слоган
- Кнопки:
    - “Демо” → скрол до Контактної форми
    - “Тарифи” → скрол до секції Тарифи
- Промокод (-20%) із кнопкою “Копіювати”

![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-52-43.png)
![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-53-20.png)
## Проблема – Рішення
- Список проблем користувача
- Панель рішення (`Panel`)
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-53-44.png)
##  Переваги
- Три карточки (`Card`) із перевагами сервісу
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-54-19.png)
##  Як це працює
- Три етапи роботи продукту у вигляді карток
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-54-49.png)
## Тарифи / Плани
- **Три тарифні плани:** Basic, Team, Pro
- Кожна картка містить:
    - назву
    - підзаголовок
    - ціну
    - список можливостей
    - кнопку "Обрати план"
      ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-55-19.png)
### Міні-калькулятор:
- Поле `InputNumber`: "Кількість користувачів"
- Формула: *користувачі × базова ціна*
- Вивід результату: “Орієнтовна вартість: N грн/міс”
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-55-53.png)
## Відгуки
- Три картки з текстовими відгуками
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-56-20.png)
## FAQ
- Блок `Accordion` з питаннями/відповідями
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-56-46.png)
## Контактна форма
Містить:
- `InputText`: Ім’я
- `InputText`: Email
- `InputMask`: Телефон
- `Textarea`: Повідомлення
- `Checkbox`: згода з політикою
- Кнопка *"Надіслати"*
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-57-13.png)
Валідація:
- обов’язкові: ім’я, email, повідомлення, чекбокс
- помилки → `p-invalid`
- успіх → форма очищається + Toast “Заявку надіслано”
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-57-54.png)
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2022-00-04.png)
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2021-58-54.png)
  Правий блок:
- email підтримки
- кнопка “Скопіювати email”
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2022-00-39.png)
##  Footer
- Мінімалістичний футер з копірайтом
  ![Сторінка ](screen/Screenshot%20at%20Nov%2018%2022-01-01.png)
---

#  Використані компоненти PrimeVue
**Button** – Header, Hero, Pricing, Contact;<br>
**Card** – Advantages, HowItWorks, Pricing, Testimonials, Contact;<br>
**InputText** – Contact;<br>
**InputNumber** – Pricing Calculator;<br>
**InputMask** – Contact;<br>
**Textarea** – Contact;<br>
**Checkbox** – Contact;<br>
**Panel** – ProblemSolutionSection;<br>
**Accordion** – FAQ;<br>
**AccordionTab** – FAQ;<br>
**Toast** – App.vue


---

#  Налаштування PrimeVue

У `main.js`:

```js
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
```

Глобальна реєстрація компонентів:

```js
app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('InputMask', InputMask);
app.component('Textarea', Textarea);
app.component('Checkbox', Checkbox);
app.component('Panel', Panel);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Toast', Toast);
```

---

#  Плагін CopyToClipboardPlugin

## Файл:
```
src/plugins/copyToClipboard.js
```


Додає глобальну функцію:

```js
$copyToClipboard(text)
```

Підтримує:
- `navigator.clipboard`
- fallback через `textarea + execCommand`

## Підключення у main.js:
```js
import CopyToClipboardPlugin from './plugins/copyToClipboard';
app.use(CopyToClipboardPlugin);
```

##  Де використовується:
**Header.vue** — `@copyDemo` → `"https://demo.taskflow.cloud"`  
**HeroSection.vue** — `@copyPromo` → `"TASKFLOW20"`  
**ContactSection.vue** — `@copySupport` → `"support@taskflow.cloud"`

Toast показує результат копіювання.

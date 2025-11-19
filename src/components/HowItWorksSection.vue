<template>
  <section id="how-it-works" class="section fade-in-up">
    <div class="section-inner">

      <h2 class="section-title">Як це працює</h2>
      <p class="section-subtitle">
        Лише три кроки від хаосу до повної прозорості процесів.
      </p>

      <div class="cards-grid">

        <Card>
          <template #title>1. Створюєте проєкт</template>
          <template #content>
            Додаєте команду, формуєте задачі, налаштовуєте пріоритети і дедлайни.
          </template>
        </Card>

        <Card>
          <template #title>2. Налаштовуєте автоматизацію</template>
          <template #content>
            Обираєте правила для автоматичного переміщення задач і тригерів.
          </template>
        </Card>

        <Card>
          <template #title>3. Контролюєте прогрес</template>
          <template #content>
            Аналітика, дашборди, нагадування та оновлення — все в одному місці.
          </template>
        </Card>

      </div>

    </div>
  </section>
</template>

<script setup>
import Card from 'primevue/card';
</script>

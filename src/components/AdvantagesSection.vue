<template>
  <section id="advantages" class="section fade-in-up">
    <div class="section-inner">

      <h2 class="section-title">Переваги TaskFlow</h2>
      <p class="section-subtitle">
        Ми прибираємо хаос з робочого процесу та даємо команді можливість працювати ефективніше.
      </p>

      <div class="cards-grid">

        <Card>
          <template #title>Автоматизація процесів</template>
          <template #content>
            TaskFlow бере на себе рутинні дії — нагадування, оновлення статусів і планування.
          </template>
        </Card>

        <Card>
          <template #title>Мінімум хаосу</template>
          <template #content>
            Усе структуровано, пріоритети чіткі, а команда завжди знає, що робити далі.
          </template>
        </Card>

        <Card>
          <template #title>Масштабованість</template>
          <template #content>
            Підходить як для маленьких команд, так і для великих компаній з багатьма відділами.
          </template>
        </Card>

      </div>

    </div>
  </section>
</template>

<script setup>
import Card from 'primevue/card';
</script>

<template>
  <section id="problem" class="section fade-in-up">
    <div class="section-inner two-column">

      <div>
        <h2 class="section-title">Основна проблема</h2>
        <p class="text-block">
          У більшості команд щоденне планування задач перетворюється на хаос:
          постійні оновлення статусів, непорозуміння, втрати часу та відсутність
          прозорої картини. Це уповільнює проєкти та демотивує команду.
        </p>
      </div>

      <Panel header="Наше рішення">
        <p class="text-block">
          TaskFlow автоматизує планування, усуває хаос і створює єдиний простір,
          де всі задачі оновлюються автоматично. Ви економите час, а команда
          синхронізується без зайвих зустрічей та листувань.
        </p>
      </Panel>

    </div>
  </section>
</template>

<script setup>
import Panel from 'primevue/panel';
</script>

<style scoped>
.text-block {
  line-height: 1.6;
  font-size: 1.1rem;
}
</style>

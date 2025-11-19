<template>
  <section id="hero" class="section">
    <div class="section-inner hero-grid">

      <div>
        <div class="badge">SaaS для команд</div>

        <h1 class="hero-title fade-up">
          Керуйте задачами<br> швидко та ефективно
        </h1>

        <p class="hero-subtitle fade-up delay-1">
          Один хаб для командної роботи, задач, дедлайнів та ресурсів.
        </p>

        <div class="hero-badges fade-up delay-2">
          <Button label="Демо"
                  icon="pi pi-calendar"
                  @click="$emit('scrollTo','contact')" />

          <Button label="Тарифи"
                  icon="pi pi-arrow-down"
                  outlined
                  severity="secondary"
                  @click="$emit('scrollTo','pricing')" />
        </div>

        <div class="hero-metrics fade-up delay-3">
          <div>
            <div class="hero-metric-number">–35%</div>
            <div class="hero-metric-label">Рутина</div>
          </div>
          <div>
            <div class="hero-metric-number">+24%</div>
            <div class="hero-metric-label">Продуктивність</div>
          </div>
          <div>
            <div class="hero-metric-number">5 хв</div>
            <div class="hero-metric-label">Онбординг</div>
          </div>
        </div>
      </div>

      <div class="hero-mockup scale-in">
        <h3>Промокод на -20%</h3>
        <p>TASKFLOW20</p>

        <Button size="small"
                severity="secondary"
                @click="$emit('copyPromo')">
          Копіювати
        </Button>
      </div>

    </div>
  </section>
</template>

<script setup>
// без логіки — все робиться через emit
</script>

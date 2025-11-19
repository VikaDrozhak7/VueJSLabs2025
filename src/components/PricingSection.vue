<template>
  <section id="pricing" class="section">
    <div class="section-inner">
      <h2 class="section-title">Тарифи / Плани</h2>
      <p class="section-subtitle">
        Оберіть план, який підходить вашій команді. Можна змінити в будь-який момент.
      </p>

      <div class="pricing-grid">
        <Card>
          <template #title>Basic</template>
          <template #subtitle>Для фрилансерів та соло-розробників</template>
          <template #content>
            <div class="pricing-price">199 грн/міс</div>
            <ul>
              <li>До 5 активних проєктів</li>
              <li>Необмежена кількість задач</li>
              <li>Коментарі та теги</li>
              <li>Базова статистика по задачах</li>
            </ul>
            <Button label="Обрати план" class="w-full mt-2" />
          </template>
        </Card>
        <Card>
          <template #title>Team</template>
          <template #subtitle>Для команд до 20 людей</template>
          <template #content>
            <div class="pricing-price">499 грн/міс</div>
            <ul>
              <li>Усі можливості Basic</li>
              <li>Командні дошки та ролі</li>
              <li>Інтеграції (Slack, Email)</li>
              <li>Графік завантаженості по людям</li>
            </ul>
            <Button label="Обрати план" class="w-full mt-2" />
          </template>
        </Card>
        <Card>
          <template #title>Pro</template>
          <template #subtitle>Для компаній 20+ людей</template>
          <template #content>
            <div class="pricing-price">від 999 грн/міс</div>
            <ul>
              <li>Усі можливості Team</li>
              <li>Розширена аналітика та звіти</li>
              <li>Single Sign-On (SSO)</li>
              <li>Виділений Customer Success менеджер</li>
            </ul>
            <Button label="Обрати план" class="w-full mt-2" />
          </template>
        </Card>
      </div>

      <div class="pricing-calculator">
        <h3 style="margin-bottom: 1rem;">Міні-калькулятор вартості (план Team)</h3>

        <div style="display:flex; flex-wrap:wrap; gap:1.5rem; align-items:flex-end;">
          <div style="min-width: 220px;">
            <label for="users" style="display:block; font-size:0.9rem; margin-bottom:0.3rem;">
              Кількість користувачів
            </label>
            <InputNumber
                id="users"
                v-model="usersCount"
                :min="1"
                :max="500"
                showButtons
            />
          </div>

          <div>
            <p style="margin:0; font-size:0.9rem; opacity:0.8;">
              Базова ціна: {{ basePrice }} грн за користувача / міс.
            </p>
            <p style="margin:0.3rem 0 0; font-weight:600;">
              Орієнтовна вартість: {{ formattedTotal }} грн/міс.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const usersCount = ref(5);
const basePrice = 25;

const total = computed(() => usersCount.value * basePrice);
const formattedTotal = computed(() => total.value.toLocaleString('uk-UA'));
</script>

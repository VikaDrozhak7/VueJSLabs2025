<script setup>
import { inject, computed } from 'vue'
import AdBanner from '@/components/AdBanner.vue'
import campusImg from '@/assets/logo.jpg'
import bannerMainImg from '@/assets/banner_main.jpg'

const campus = campusImg
const bannerMain = bannerMainImg
const openAd = inject('openAd', () => {})
const accentColor = computed(() => '#3b82f6')
</script>

<template>
  <section class="container about">
    <div class="hero">
      <div class="hero-text">
        <h2>Про Житомирську політехніку</h2>
        <p>
          Житомирська політехніка — один із провідних технічних університетів України,
          що поєднує інженерні, економічні та IT-напрями. Ми готуємо фахівців, які
          створюють інновації, розвивають бізнес і зміцнюють технологічний потенціал країни.
        </p>
      </div>
      <figure v-if="campus" class="hero-media">
        <img :src="campus" alt="Кампус Житомирської політехніки" />
      </figure>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Наші напрями</h3>
        <ul class="bullets">
          <li>Комп’ютерні науки та ІТ</li>
          <li>Інженерія, робототехніка, енергетика</li>
          <li>Кібербезпека</li>
          <li>Економіка, менеджмент, фінанси</li>
        </ul>
      </div>

      <div class="card">
        <h3>Переваги навчання</h3>
        <ul class="bullets">
          <li>Сучасні лабораторії та технологічні центри</li>
          <li>Стажування в ІТ-компаніях і промислових підприємствах</li>
          <li>Міжнародні обміни й програми Erasmus+</li>
          <li>Студентські хакатони, стартапи, спортивне життя</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>Контакти</h3>
      <ul class="contacts">
        <li>
          <strong>Офіційний сайт:</strong>
          <a href="https://ztu.edu.ua" target="_blank" rel="noopener noreferrer">ztu.edu.ua</a>
        </li>
        <li><strong>Адреса:</strong> м. Житомир, вул. Чуднівська, 103</li>
        <li><strong>Телефон:</strong> +380 (412) 24-14-98</li>
        <li><strong>Email:</strong> info@ztu.edu.ua</li>
      </ul>
    </div>
  </section>

  <AdBanner
      position="inline"
      :image="bannerMain"
      title="💼 Партнерські програми"
      subtitle="Долучайся до співпраці з Житомирською політехнікою!"
      @click="openAd && openAd()"
  />
</template>

<style scoped>
.about {
  display: grid;
  gap: var(--space-6);
}

.hero {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
}

.hero-text h2 {
  color: v-bind(accentColor);
}

.hero-media img {
  width: 80%;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .hero-media img {
    height: 180px;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

.card h3 {
  border-bottom: 2px solid v-bind(accentColor);
  padding-bottom: 0.25rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.bullets {
  margin: 0;
  padding-left: 1.1rem;
  line-height: 1.7;
}

.contacts {
  margin: 0;
  padding-left: 1.1rem;
  line-height: 1.8;
}

.contacts a {
  color: v-bind(accentColor);
  text-decoration: none;
}

.contacts a:hover {
  text-decoration: underline;
}
</style>

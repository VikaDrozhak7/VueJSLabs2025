<script setup>
import { computed } from 'vue'
import promoImg from '@/assets/banner_main.jpg'

const props = defineProps({
  title: { type: String, default: 'Житомирська Політехніка' },
  subtitle: {
    type: String,
    default: 'Вступай сьогодні — стань частиною інноваційного майбутнього!'
  },
  image: { type: String, default: '' },
  position: { type: String, default: 'inline' }
})

const emit = defineEmits(['click'])

const imgSrc = computed(() => props.image || promoImg)
</script>

<template>
  <div
      class="banner"
      :data-pos="position"
      role="button"
      tabindex="0"
      @click="emit('click')"
      @keydown.enter.prevent="emit('click')"
      @keydown.space.prevent="emit('click')"
      aria-label="Промо: натисніть, щоб дізнатись більше"
  >
    <img class="banner-img" :src="imgSrc" :alt="title" loading="lazy" />

    <div class="overlay">
      <div class="text">
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
        <small>Натисни, щоб дізнатись більше</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.3s;
  margin: var(--space-8) 0;
}
@media (hover:hover) {
  .banner:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 16px 40px rgb(15 23 42 / 0.15);
    border-color: var(--accent);
    border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
  }
}

.banner-img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  display: block;
  transition: transform 0.8s ease;
}
@media (hover:hover) {
  .banner:hover .banner-img {
    transform: scale(1.05);
  }
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.6) 100%
  );
  color: #fff;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: inherit;
}
@media (hover:hover) {
  .banner:hover .overlay { opacity: 1; }
}

.text {
  max-width: 700px;
  line-height: 1.4;
}

.text h2 {
  margin: 0 0 0.4rem;
  font-size: clamp(1.8rem, 2.8vw, 2.8rem);
  font-weight: 800;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.6);
}

.text p {
  margin: 0.3rem 0 0.6rem;
  font-size: clamp(1.1rem, 1.4vw, 1.4rem);
  font-weight: 500;
}

.text small {
  display: block;
  margin-top: 0.6rem;
  font-size: 0.95rem;
  opacity: 0.9;
}

@media (max-width: 900px) {
  .banner-img { height: 250px; }
  .overlay { padding: 1.6rem; }
  .text h2 { font-size: 1.6rem; }
  .text p { font-size: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .banner, .banner-img, .overlay { transition: none !important; }
}
</style>

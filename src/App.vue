<template>
  <div class="app-root">
    <Toast />

    <Header
        @scrollTo="scrollTo"
        @copyDemo="copyDemo"
    />

    <main>
      <HeroSection
          @scrollTo="scrollTo"
          @copyPromo="copyPromo"
      />

      <ProblemSolutionSection />
      <AdvantagesSection />
      <HowItWorksSection />

      <PricingSection />
      <TestimonialsSection />
      <FaqSection />

      <ContactSection
          @copySupport="copySupport"
      />
    </main>

    <Footer @scrollTo="scrollTo" />
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { useToast } from 'primevue/usetoast';

import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';

import ProblemSolutionSection from './components/ProblemSolutionSection.vue';
import AdvantagesSection from './components/AdvantagesSection.vue';
import HowItWorksSection from './components/HowItWorksSection.vue';

import PricingSection from './components/PricingSection.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';
import FaqSection from './components/FaqSection.vue';
import ContactSection from './components/ContactSection.vue';
import Footer from './components/Footer.vue';

const toast = useToast();
const { proxy } = getCurrentInstance();

const scrollTo = (id) => {
  const block = document.getElementById(id);
  if (block) {
    block.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const runCopy = async (text, success, fail) => {
  const ok = await proxy.$copyToClipboard(text);
  toast.add({
    severity: ok ? 'success' : 'warn',
    summary: ok ? success : fail,
    life: 2000
  });
};

const copyPromo = () =>
    runCopy('TASKFLOW20', 'Промокод скопійовано', 'Не вдалося скопіювати');

const copyDemo = () =>
    runCopy('https://demo.taskflow.cloud', 'Демо-лінк скопійовано', 'Не вдалося скопіювати');

const copySupport = () =>
    runCopy('support@taskflow.cloud', 'Email скопійовано', 'Не вдалося скопіювати');
</script>

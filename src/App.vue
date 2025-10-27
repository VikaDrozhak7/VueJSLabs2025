<script setup>
import { computed, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ModalAd from '@/components/ModalAd.vue'
import { useTheme } from '@/composables/useTheme'

const showAdModal = ref(false)
const openAd = () => (showAdModal.value = true)
const closeAd = () => (showAdModal.value = false)
provide('openAd', openAd)

const { theme, toggleTheme, applyTheme } = useTheme()
applyTheme()

const route = useRoute()
const transitionName = computed(() => route.meta.transition || 'fade')
</script>

<template>
  <div class="app">
    <SiteHeader :theme="theme" @toggle-theme="toggleTheme" />
    <main>
      <Transition :name="transitionName" mode="out-in">
        <RouterView />
      </Transition>
    </main>
    <SiteFooter />
    <ModalAd :open="showAdModal" @close="closeAd" />
  </div>
</template>

<style scoped>
.app { display: flex; min-height: 100vh; flex-direction: column; }
main { flex: 1; }
</style>

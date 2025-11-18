<template>
  <div class="lang-switcher">
    <select v-model="model" @change="onChange">
      <option value="ua">UA</option>
      <option value="en">EN</option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useI18n } from 'vue-i18n'

const settings = useSettingsStore()
const { locale } = useI18n()

const model = computed({
  get: () => settings.locale,
  set: (v) => settings.setLocale(v)
})

const onChange = () => {
  locale.value = settings.locale
}
</script>

<style scoped>
.lang-switcher select {
  padding: 6px 10px;
  border-radius: 10px;
}
</style>

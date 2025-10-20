<script setup>
import { ref } from 'vue'
import { login } from '../services/auth'
import { useRouter, useRoute } from 'vue-router'
import InputField from '../components/InputField.vue'
import AuthWrapper from '../components/AuthWrapper.vue'

const email = ref('')
const password = ref('')
const errors = ref({})
const router = useRouter()
const route = useRoute()

function submit() {
  errors.value = {}
  if (!email.value) errors.value.email = 'Введіть email'
  if (!password.value) errors.value.password = 'Введіть пароль'
  if (Object.keys(errors.value).length) return

  try {
    login({ email: email.value, password: password.value })
    router.replace(route.query.redirect || { name: 'dashboard' })
  } catch (e) {
    errors.value.form = e.message
  }
}
</script>

<template>
  <AuthWrapper>
    <template #title><h2 style="margin:0">Вхід</h2></template>
    <form class="row" style="flex-direction:column;gap:12px" @submit.prevent="submit">
      <InputField label="Email" v-model="email" type="email" :error="errors.email"/>
      <InputField label="Пароль" v-model="password" type="password" :error="errors.password"/>
      <div v-if="errors.form" class="small" style="color:#ff9b9b">{{ errors.form }}</div>
      <button class="btn" type="submit">Увійти</button>
      <RouterLink class="small" :to="{name:'register'}">Немає акаунта? Реєстрація</RouterLink>
    </form>
  </AuthWrapper>
</template>

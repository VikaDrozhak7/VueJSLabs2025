<script setup>
import { ref } from 'vue'
import { register } from '../services/auth'
import { useRouter } from 'vue-router'
import InputField from '../components/InputField.vue'
import AuthWrapper from '../components/AuthWrapper.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({})
const router = useRouter()

function submit() {
  errors.value = {}
  if (!name.value) errors.value.name = 'Введіть імʼя'
  if (!email.value) errors.value.email = 'Введіть email'
  if (password.value !== confirmPassword.value) errors.value.confirm = 'Паролі не збігаються'
  if (Object.keys(errors.value).length) return

  try {
    register({ name: name.value, email: email.value, password: password.value, confirmPassword: confirmPassword.value })
    router.replace({ name: 'dashboard' })
  } catch (e) {
    errors.value.form = e.message
  }
}
</script>

<template>
  <AuthWrapper>
    <template #title><h2 style="margin:0">Реєстрація</h2></template>
    <form class="row" style="flex-direction:column;gap:12px" @submit.prevent="submit">
      <InputField label="Імʼя" v-model="name" :error="errors.name"/>
      <InputField label="Email" v-model="email" type="email" :error="errors.email"/>
      <InputField label="Пароль" v-model="password" type="password"/>
      <InputField label="Підтвердження пароля" v-model="confirmPassword" type="password" :error="errors.confirm"/>
      <div v-if="errors.form" class="small" style="color:#ff9b9b">{{ errors.form }}</div>
      <button class="btn" type="submit">Зареєструватися</button>
      <RouterLink class="small" :to="{name:'login'}">Маєш акаунт? Вхід</RouterLink>
    </form>
  </AuthWrapper>
</template>

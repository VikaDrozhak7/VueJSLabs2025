<template>
  <form @submit.prevent="submit" class="grid">
    <BaseInput v-model="name" label="Ім'я" placeholder="Ваше ім'я" />
    <BaseInput v-model="email" label="Email" placeholder="email@example.com" />
    <BaseInput v-model="password" label="Password" type="password" />
    <BaseInput v-model="confirm" label="Підтвердження пароля" type="password" />
    <div style="display:flex; gap:8px;">
      <button class="btn" type="submit">Register</button>
    </div>
    <div v-if="error" class="small" style="color:red">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '../ui/BaseInput.vue'
const emit = defineEmits(['registered'])
const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')

function submit() {
  error.value = ''
  if (!name.value || !email.value || !password.value) {
    error.value = 'Заповніть всі поля'
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Паролі не співпадають'
    return
  }
  const user = { name: name.value, email: email.value }
  emit('registered', user)
}
</script>

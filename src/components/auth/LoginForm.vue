<template>
  <form @submit.prevent="submit" class="grid">
    <BaseInput v-model="email" label="Email" placeholder="email@example.com" />
    <BaseInput v-model="password" label="Password" type="password" placeholder="Пароль" />
    <div style="display:flex; gap:8px; align-items:center;">
      <button class="btn" type="submit">Login</button>
      <button class="btn" type="button" @click="fillDemo">Demo</button>
      <div style="margin-left:auto">
        <button class="btn" type="button" @click="logout">Logout</button>
      </div>
    </div>
    <div v-if="error" class="small" style="color:red">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref } from 'vue'


const emit = defineEmits(['login'])
const email = ref('')
const password = ref('')
const error = ref('')

function validate() {
  if (!email.value || !password.value) {
    error.value = 'Заповніть всі поля'
    return false
  }
  return true
}

function submit() {
  error.value = ''
  if (!validate()) return
  // mock "auth" — accept any credentials
  const user = { name: email.value.split('@')[0] || 'User', email: email.value }
  emit('login', user)
}

function fillDemo() {
  email.value = 'demo@example.com'
  password.value = 'demo123'
}

function logout() {
  localStorage.removeItem('mock_user')
  alert('Demo logout (localStorage cleared)')
}
</script>

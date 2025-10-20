<script setup>
import { ref, provide, onMounted } from 'vue'
import { onAuthStateChanged, getCurrentUser } from './services/auth'
const currentUser = ref(getCurrentUser())
provide('currentUser', currentUser)
onMounted(() => onAuthStateChanged(u => (currentUser.value = u)))
</script>

<template>
  <RouterView/>
</template>

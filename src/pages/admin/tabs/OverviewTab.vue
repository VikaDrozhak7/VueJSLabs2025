<script setup>
import { ref, onMounted } from 'vue'
const counter = ref(0)
onMounted(() => console.log('Overview mounted'))
</script>

<template>
  <div class="card">
    <h3 style="margin-top:0">Overview</h3>
    <p>Демонстрація збереження стану: <b>{{ counter }}</b></p>
    <button class="btn" @click="counter++">+1</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const events = ref(['User A logged in', 'User B created report'])
onMounted(()=>console.log('Activity mounted'))
onUnmounted(()=>console.log('Activity unmounted (exclude в KeepAlive)'))
</script>

<template>
  <div class="card">
    <h3 style="margin-top:0">Activity</h3>
    <ul>
      <li v-for="(e,i) in events" :key="i">{{ e }}</li>
    </ul>
  </div>
</template>

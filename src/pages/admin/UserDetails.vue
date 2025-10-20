<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = computed(()=> Number(route.params.id))
const user = computed(()=> ({
  id: id.value,
  name: ['Alice','Bob','Carlos'][ (id.value-1) % 3 ] + ' (mock)',
  email: `user${id.value}@example.com`,
  role: id.value % 2 ? 'Admin' : 'User'
}))
</script>

<template>
  <div>
    <h3 style="margin-top:0">User #{{ user.id }}</h3>
    <p><b>Name:</b> {{ user.name }}</p>
    <p><b>Email:</b> {{ user.email }}</p>
    <p><b>Role:</b> {{ user.role }}</p>
    <RouterLink :to="{name:'users'}" class="btn ghost">← Back</RouterLink>
  </div>
</template>

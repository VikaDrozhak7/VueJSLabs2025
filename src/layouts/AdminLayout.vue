<script setup>
import { inject } from 'vue'
import Sidebar from '../components/Sidebar.vue'
const currentUser = inject('currentUser', null)
</script>

<template>
  <div class="container" style="display:flex;gap:16px;align-items:flex-start">
    <Sidebar>
      <RouterLink :to="{name:'dashboard'}">Dashboard</RouterLink>
      <RouterLink :to="{name:'users'}">Users</RouterLink>
      <RouterLink :to="{name:'reports'}">Reports</RouterLink>
    </Sidebar>

    <main class="card" style="flex:1">
      <div class="row" style="justify-content:space-between">
        <h2 style="margin:0">Admin Panel</h2>
        <div class="small" v-if="currentUser?.value">
          Signed in as <b>{{ currentUser.value.name }}</b> ({{ currentUser.value.email }})
        </div>
      </div>
      <RouterView/>
    </main>
  </div>
</template>

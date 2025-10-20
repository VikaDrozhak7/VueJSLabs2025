<script setup>
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Carlos Diaz', email: 'carlos@example.com' },
]
</script>

<template>
  <div>
    <h3 style="margin-top:0">Users</h3>
    <table class="table">
      <thead><tr><th>#</th><th>Name</th><th>Email</th><th/></tr></thead>
      <tbody>
      <tr v-for="u in users" :key="u.id">
        <td>{{ u.id }}</td>
        <td>{{ u.name }}</td>
        <td>{{ u.email }}</td>
        <td><RouterLink :to="{ name:'user-details', params:{ id: u.id }}">Details</RouterLink></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

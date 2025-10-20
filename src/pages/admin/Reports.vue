<script setup>
const props = defineProps({
})
const reports = [
  { id: 101, title: 'Sales Q1', status: 'Done' },
  { id: 102, title: 'Sales Q2', status: 'In progress' },
  { id: 103, title: 'Churn analysis', status: 'Draft' },
]
</script>

<template>
  <div>
    <h3 style="margin-top:0">Reports</h3>
    <table class="table">
      <thead><tr><th>ID</th><th>Title</th><th>Status</th></tr></thead>
      <tbody>
      <template v-for="r in reports" :key="r.id">
        <slot name="row" :item="r">
          <tr>
            <td>{{ r.id }}</td>
            <td>{{ r.title }}</td>
            <td>{{ r.status }}</td>
          </tr>
        </slot>
      </template>
      </tbody>
    </table>

  </div>
</template>

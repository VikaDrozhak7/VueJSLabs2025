<script setup>
import { ref, computed } from 'vue'
import OverviewTab from './tabs/OverviewTab.vue'
import ActivityTab from './tabs/ActivityTab.vue'

const tabs = [
  { key: 'OverviewTab', label: 'Overview', component: OverviewTab },
  { key: 'ActivityTab', label: 'Activity', component: ActivityTab },
]
const active = ref('OverviewTab')
const current = computed(() => tabs.find(t => t.key === active.value)?.component || OverviewTab)
</script>

<template>
  <div>
    <div class="row" style="gap:8px;margin-bottom:10px">
      <button class="btn" :class="{ghost: active!=='OverviewTab'}" @click="active='OverviewTab'">Overview</button>
      <button class="btn" :class="{ghost: active!=='ActivityTab'}" @click="active='ActivityTab'">Activity</button>
    </div>

    <KeepAlive :include="['OverviewTab']" :exclude="['ActivityTab']" :max="2">
      <component :is="current" :key="active"/>
    </KeepAlive>
  </div>
</template>

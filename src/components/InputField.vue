<script setup>
import { computed } from 'vue'
const model = defineModel({ type: [String, Number], default: '' })

const props = defineProps({
  label: String,
  name: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  error: String
})

const emit = defineEmits(['blur'])
const id = computed(() => props.name || props.label?.toLowerCase().replace(/\s+/g,'-'))
</script>

<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input
        :id="id"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        v-model="model"
        @blur="$emit('blur', model)"
    />
    <div v-if="error" class="small" style="color:#ff9b9b">{{ error }}</div>
  </div>
</template>

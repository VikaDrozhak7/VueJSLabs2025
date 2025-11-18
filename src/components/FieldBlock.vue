<template>
  <div class="field-block">
    <label class="label">{{ label }}</label>

    <input
        v-if="type !== 'textarea'"
        :type="type"
        v-model="model"
        :class="inputClass"
        class="input"
    />

    <textarea
        v-else
        rows="3"
        v-model="model"
        :class="inputClass"
        class="textarea"
    ></textarea>

    <p v-if="errorMessage" class="error-msg">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' }
})

const { value, errorMessage, meta } = useField(props.name)

const model = computed({
  get: () => value.value,
  set: (v) => (value.value = v)
})

const inputClass = computed(() => ({
  'input-error': !!errorMessage.value,
  'input-success': meta.dirty && meta.valid && !errorMessage.value
}))
</script>

<style scoped>
.field-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.label {
  font-weight: 600;
  color: #333;
}

.input,
.textarea {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #ccc;
  border-radius: 10px;
  transition: .25s ease;
}

.input-error {
  border-color: #e63946 !important;
}

.input-success {
  border-color: #2eb872 !important;
}

.error-msg {
  color: #e63946;
  font-size: 0.85rem;
}
</style>

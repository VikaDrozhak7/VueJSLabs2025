<template>
  <div class="overlay" @click="close">
    <div class="modal" @click.stop>
      <h3 class="modal-title">{{ title }}</h3>

      <div class="content">
        <slot></slot>
      </div>

      <button class="btn" @click="close">OK</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: "Результат" }
})

const emit = defineEmits(["close"])

const close = () => emit("close")
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0 0 0 / 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade .25s ease;
  z-index: 999;
}

.modal {
  background: white;
  padding: 26px;
  border-radius: 14px;
  width: 400px;
  animation: popup .25s ease;
  box-shadow: 0 8px 25px rgba(0 0 0 / 0.25);
}

.modal-title {
  margin-bottom: 14px;
  font-size: 20px;
  font-weight: 700;
}

.content {
  margin-bottom: 20px;
  font-size: 16px;
}

.btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background: #1976d2;
  border: none;
  color: white;
  cursor: pointer;
  transition: .2s;
}

.btn:hover {
  background: #0b5fb3;
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popup {
  from { transform: scale(.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>

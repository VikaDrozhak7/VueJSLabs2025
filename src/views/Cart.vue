<template>
  <section>
    <h2>{{ t('cart.title') }}</h2>

    <p v-if="!items.length" class="empty card">
      {{ t('cart.empty') }}
    </p>

    <div v-else>
      <ul class="list">
        <li v-for="item in items" :key="item.id" class="row">
          <div class="info">
            <strong>{{ t('productsData.' + item.key + '_title') }}</strong>
            <span>{{ item.price }}$ × {{ item.qty }}</span>
          </div>
          <button class="remove-btn" @click="removeItem(item.id)">
            {{ t('buttons.remove') }}
          </button>
        </li>
      </ul>

      <div class="summary">
        <p>{{ t('cart.totalCount') }}: <strong>{{ totalCount }}</strong></p>
        <p>{{ t('cart.totalPrice') }}: <strong>{{ totalPrice }}</strong>$</p>
      </div>

      <button class="clear-btn" @click="clearCart">
        {{ t('cart.clear') }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const cart = useCartStore()
const { items, totalCount, totalPrice } = storeToRefs(cart)
const { t } = useI18n()

const removeItem = (id) => cart.remove(id)
const clearCart = () => cart.clear()
</script>



<style scoped>
.empty {
  text-align: center;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 14px;
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.info {
  display: flex;
  flex-direction: column;
}

.remove-btn {
  background: #ff5252;
}
.remove-btn:hover {
  background: #d63232;
}

.summary {
  background: #f0f4ff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 16px;
}

.clear-btn {
  width: 100%;
}
</style>

<template>
  <section>
    <h2 class="page-title">{{ t('products.title') }}</h2>

    <div class="grid">
      <div class="card product-card" v-for="p in products" :key="p.id">
        <img :src="p.image" class="img" />

        <div class="content">
          <h3>{{ t('productsData.' + p.key + '_title') }}</h3>
          <p class="category">{{ t('productsData.' + p.key + '_category') }}</p>
          <p class="desc">{{ t('productsData.' + p.key + '_desc') }}</p>

          <div class="rating">⭐ {{ p.rating }}</div>

          <div class="footer">
            <span class="price">{{ p.price }}$</span>
            <button class="btn" @click="add(p)">
              {{ t('products.addToCart') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const { items: products } = storeToRefs(productsStore)
const { t } = useI18n()

const add = (p) => cartStore.add(p)
</script>

<style scoped>
.page-title {
  margin-bottom: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 26px;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.category {
  font-size: 14px;
  opacity: 0.6;
}

.desc {
  font-size: 14px;
  color: #555;
}

.rating {
  font-weight: 600;
}

.footer {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 20px;
  font-weight: 700;
}
</style>

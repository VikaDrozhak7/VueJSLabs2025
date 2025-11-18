import { createRouter, createWebHistory } from 'vue-router'
import Profile from '@/views/Profile.vue'
import Cart from '@/views/Cart.vue'
import Products from '@/views/Products.vue'

const routes = [
    { path: '/', redirect: '/profile' },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/products', name: 'Products', component: Products }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

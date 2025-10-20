import { createRouter, createWebHistory } from 'vue-router'
import * as auth from '../services/auth'

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'router-link-active',
    scrollBehavior() { return { top: 0 } },
    routes: [
        { path: '/', name: 'home', meta: { public: true }, component: () => import('../pages/Home.vue') },
        { path: '/login', name: 'login', meta: { public: true }, component: () => import('../pages/Login.vue') },
        { path: '/register', name: 'register', meta: { public: true }, component: () => import('../pages/Register.vue') },

        {
            path: '/admin',
            meta: { requiresAuth: true },
            component: () => import('../layouts/AdminLayout.vue'), // <-- цей шлях
            children: [
                { path: 'dashboard', name: 'dashboard', component: () => import('../pages/admin/Dashboard.vue') },
                { path: 'users', name: 'users', component: () => import('../pages/admin/Users.vue') },
                { path: 'user/:id', name: 'user-details', props: true, component: () => import('../pages/admin/UserDetails.vue') },
                { path: 'reports', name: 'reports', component: () => import('../pages/admin/Reports.vue') },
                { path: '', redirect: { name: 'dashboard' } }
            ]
        },

        { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFound.vue') }
    ]
})

router.beforeEach((to) => {
    if (to.meta?.requiresAuth && !auth.isAuthenticated()) {
        return { name: 'login', query: { redirect: to.fullPath } }
    }
    if (to.meta?.public && auth.isAuthenticated() && (to.name === 'login' || to.name === 'register')) {
        return { name: 'dashboard' }
    }
})

export default router

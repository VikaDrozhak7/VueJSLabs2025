import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/pages/Home.vue')
const Article = () => import('@/pages/NewsDetail.vue')
const About = () => import('@/pages/About.vue')
const NotFound = () => import('@/pages/NotFound.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home, meta: { transition: 'fade' } },
        { path: '/article/:id(\\d+)', name: 'article', component: Article, meta: { transition: 'slide' } },
        { path: '/about', name: 'about', component: About, meta: { transition: 'fade' } },
        { path: '/:pathMatch(.*)*', name: '404', component: NotFound, meta: { transition: 'fade' } }
    ],
    linkActiveClass: 'is-active',
    scrollBehavior: () => ({ top: 0 }),
})

export default router

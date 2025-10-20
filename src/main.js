import { createApp, ref, provide } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css'
import * as auth from './services/auth'

const app = createApp({
    setup() {
        // provide/inject: віддаємо поточного користувача вниз по дереву
        const currentUser = ref(auth.getCurrentUser())
        auth.onAuthStateChanged(user => (currentUser.value = user))
        provide('currentUser', currentUser)
    },
    render: () => h(App) // або просто використай App у createApp(App), якщо не хочеш setup на корені
})
createApp(App).use(router).mount('#app')

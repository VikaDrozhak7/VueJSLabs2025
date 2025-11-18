import { createApp } from "vue"
import App from "./App.vue"

import "@/assets/main.css"

import { createPinia } from "pinia"
import piniaPersistedState from "pinia-plugin-persistedstate"
import router from "./router"

import { setupI18n } from "./i18n"
import { useSettingsStore } from "./stores/settings"
import { configure } from "vee-validate"

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersistedState)
app.use(pinia)

const settings = useSettingsStore()

const i18n = setupI18n(settings.locale)
app.use(i18n)
configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true
})

app.use(router)
app.mount("#app")

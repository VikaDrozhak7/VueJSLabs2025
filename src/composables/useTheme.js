import { ref, watch } from 'vue'

export function useTheme(){
    const saved = localStorage.getItem('theme') || 'light'
    const theme = ref(saved)

    const applyTheme = () => {
        document.documentElement.classList.toggle('dark', theme.value === 'dark')
        localStorage.setItem('theme', theme.value)
    }
    watch(theme, applyTheme, { immediate: false })

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return { theme, toggleTheme, applyTheme }
}

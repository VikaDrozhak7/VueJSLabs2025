import { createI18n } from 'vue-i18n'
import ua from './locales/ua.json'
import en from './locales/en.json'

export function setupI18n(locale = 'ua') {
    const modifiers = {
        upper: (s) => s.toUpperCase(),
        lower: (s) => s.toLowerCase(),
        cap: (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)
    }

    return createI18n({
        legacy: false,
        locale,
        fallbackLocale: 'en',
        messages: { ua, en },
        modifiers
    })
}

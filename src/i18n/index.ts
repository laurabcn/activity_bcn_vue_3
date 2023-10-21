import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export default createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'ca', //window.navigator.language.substring(0, 2) || "ca",
    fallbackLocale: 'ca',
    availableLocales: ['ca', 'es', 'en'],
    messages: messages,
})

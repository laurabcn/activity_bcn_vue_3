import './assets/main.css'

import { createApp } from 'vue'
import axios from 'axios'
import { createPinia } from 'pinia'
import VueDayjs from 'vue3-dayjs-plugin'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

const pinia = createPinia()
const app = createApp(App)
app.provide('axios', axios)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(VueDayjs)
app.mount('#app')

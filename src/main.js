import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { firebaseApp } from './config/firebase'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(firebaseApp)
app.use(createPinia())
app.use(router)

app.mount('#app')

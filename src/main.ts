import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import 'bulma/css/bulma.css'
import 'animate.css'

const api_token: string | null = localStorage.getItem('api_token')

axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.withCredentials = true

if (api_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${api_token}`
}

createApp(App).use(router).use(store).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import 'bulma/css/bulma.css'
import 'animate.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const api_token: string | null = localStorage.getItem('api_token')

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true

if (api_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${api_token}`
}

createApp(App).use(router).use(store).mount('#app')

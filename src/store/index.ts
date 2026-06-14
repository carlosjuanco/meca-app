import { createStore } from 'vuex'
import axios from 'axios'

type Data = { [key: string]: any }

type User = {
    id: number;
    name: string;
    email: string;
}

type Pages = {
    id: number;
    name: string;
    name_component: string;
}

type State = {
    apiToken: string;
    user: User;
    pages: Pages;
}

// Define the initial state
const apiToken = localStorage.getItem('apiToken') || ''

if (apiToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`
}
const state: State = {
    apiToken,
    user: {id: 0, name: '', email:''},
    pages: {id: 0, name: '', name_component: ''},
};

export default createStore({
    state,
    mutations: {
        SET_API_TOKEN (state, apiToken) {
            state.apiToken = apiToken
            axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`
        },
        SET_USER (state, user) {
            state.user = user
        },
        SET_PAGES (state, pages) {
            state.pages = pages
        },
    },
    actions: {
        async login ({ commit }, data:Data):Promise<void> {
            const response = await axios.post('/login', data)
            const apiToken = response.data.apiToken

            localStorage.setItem('apiToken', apiToken)

            axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`

            commit('SET_API_TOKEN', apiToken)
            commit('SET_USER', response.data.user)
            commit('SET_PAGES', response.data.user.role.pages)
        },
        async check ({ commit }) {
            const response = await axios.get('/check')

            commit('SET_USER', response.data.user)
            commit('SET_PAGES', response.data.user.role.pages)
        },
        async logout ({ dispatch }) {
            await axios.post('/logout')

            dispatch('destroySession')
        },
        destroySession ({ commit }) {
            localStorage.removeItem('apiToken')

            delete axios.defaults.headers.common['Authorization']

            commit('SET_API_TOKEN', '')
            commit('SET_PAGES', [])
            commit('SET_USER', {})
        },
    },
    modules: {},
    getters: {
        apiToken: state => state.apiToken,
        pages: state => state.pages,
        user: state => state.user,
    }
})
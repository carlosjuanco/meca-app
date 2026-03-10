import { createRouter, createWebHistory } from "vue-router"
import store from '@/store/index'

import HelloWord from "@/components/HelloWorld.vue"
import WelcomeUser from "@/components/WelcomeUser.vue"
import AppLogin from "@/views/AppLogin.vue"
import AppHome from "@/views/AppHome.vue"
import AppComunidad from "@/components/Administrative/AppComunidad.vue"

const routes = [
    {
        path: '/hello',
        name: 'helloworld',
        component: HelloWord,
    },
    {
        path: '/appLogin',
        name: 'login',
        component: AppLogin
    },
    {
      path: '/AppHome',
      name: 'Inicio',
      component: AppHome,
    },
    {
        path: '/WelcomeUser',
        component: AppHome,
        children: [{
            path: '/:name_user', name: 'Bienvenido usuario',
            components: {
                default: WelcomeUser,
                sidebar: WelcomeUser
            }
        }]
    },
    {
        path: '/AppComunidad',
        component: AppHome,
        children: [{
            path: '/AppComunidad', name: 'Comunidades',
            components: {
                default: AppComunidad,
                sidebar: AppComunidad
            }
        }]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
    try {
        await store.dispatch('check')

        const page = store.getters.pages.find((page: {name: string}) => page.name === to.name)
        if(page.name == to.name){
            next()
        }
    }
    catch (error) {
        store.dispatch('destroySession')
        if (to.name == 'login') {
            next()
        }
        else {
            next({ name: 'login' })
        }
    }
})

export default router
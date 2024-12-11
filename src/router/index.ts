import { createRouter, createWebHistory } from "vue-router"
import store from '@/store/index'

import HelloWord from "@/components/HelloWorld.vue"
import WelcomeUser from "@/components/WelcomeUser.vue"
import AppLogin from "@/views/AppLogin.vue"
import AppHome from "@/views/AppHome.vue"
import CapturarInformeActual from "@/components/SecretariaDeIglesia/CapturarInformeActual.vue"
import InformePorMes from "@/components/SecretariaDeIglesia/InformePorMes.vue"
import InformeMesX from "@/components/SecretariaDeIglesia/InformeMesX.vue"

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
        path: '/CapturarInformeActual',
        component: AppHome,
        children: [{
            path: '/CapturarInformeActual', name: 'Capturar informe actual',
            components: {
                default: CapturarInformeActual,
                sidebar: CapturarInformeActual
            }
        }]
    },
    {
        path: '/InformePorMes',
        component: AppHome,
        children: [{
            path: '/InformePorMes', name: 'Informe por mes',
            components: {
                default: InformePorMes,
                sidebar: InformePorMes
            }
        }]
    },
    {
        path: '/InformeMesX',
        component: AppHome,
        children: [{
            path: '/InformeMesX', name: 'Informe mes x',
            components: {
                default: InformeMesX,
                sidebar: InformeMesX
            }
        }]
    },
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
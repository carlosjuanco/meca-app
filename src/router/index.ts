import { createRouter, createWebHistory } from "vue-router"

import HelloWord from "../components/HelloWorld.vue"

const routes = [
  {
      path: '/hello',
      name: 'helloworld',
      component: HelloWord,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

export default router
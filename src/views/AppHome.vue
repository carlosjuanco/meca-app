<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import ModalNotification from '../components/ModalNotification.vue'
  import helpers from '../helpers'

  type Datamodal = {
    title: string
    message: { [key: string]: any }
    url: string
  }

  // Definimos la estructura de "pivot"
  interface Pivot {
    role_id: number
    page_id: number
    permissions: string
  }

  // Definimos la estructura principal de cada página
  interface Page {
    id: number
    name: string
    name_component: string
    page_id: number | null
    human_id: number
    pivot: Pivot
  }

  // Si deseas manejar el arreglo completo
  type Pages = Page[]

	export default defineComponent ({
    name: 'AppHome',
    components: {
      ModalNotification,
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      const { handleErrors } = helpers()
      const pages = ref<Pages>(store.getters.pages)
      
      pages.value = pages.value.filter(page => JSON.parse(page.pivot.permissions).Ver_la_pagina_en_el_menu)
      
      let name_user = store.getters.user.name
      let showModalNotification = ref(false)
      let dataModalNotification: Datamodal = reactive({
        title: '',
        message: {},
        url: ''
      })

      let show_navbar = ref(false)

      router.replace({ name: "Bienvenido usuario", params:{ name_user: name_user} })

      const logout = async () => {
        try {
          await store.dispatch('logout')
          router.replace({ name: 'login' })
        }
        catch (error) {
          dataModalNotification.title = 'Advertencia'
          dataModalNotification.message = handleErrors(error) 
          dataModalNotification.url = `/`

          showModalNotification.value = true
          console.log(error)
        }
      }

      const show_menu = () => {
        show_navbar.value = show_navbar.value ? false : true
      }

      const go_to_route = (page:string): void => {
        if(page === "Inicio"){
          router.replace({ name: "Bienvenido usuario", params:{ name_user: name_user} })
        }else {
          router.replace({ name: page })
        }
      }

      return {
        pages, 
        logout, 
        showModalNotification, 
        dataModalNotification,
        show_menu,
        show_navbar,
        go_to_route,
      }
    }
	})
</script>
<template>
  <div class="container">
    <nav 
      class="navbar is-transparent"
      :class="{'navbar is-transparent animate__animated': true,
        'animate__bounceInDown': true }"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="../assets/logoJuanito.png" alt="Mi Logo">
        </a>
        <div class="navbar-burger js-burger" data-target="navbarExampleTransparentExample" @click="show_menu">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" :class="{'navbar-menu': true, 'is-active': show_navbar}">
        <div class="navbar-start">
          <router-link v-for="page in pages" :key="page.name_component"
                       :to="page.name_component"
                       custom>
            <a
              @click="go_to_route(page.name)"
              class="navbar-item"
            >
              {{ page.name }}
            </a>
          </router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-primary" @click="logout">
                  <span class="icon">
                    <i class="fas fa-power-off"></i>
                  </span>
                  <span>Cerrar</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section>
        <router-view name="sidebar"></router-view>
    </section>

    <!-- Modal de notificasiones -->
    <modal-notification
      :show="showModalNotification"
      :data="dataModalNotification"
      @close="showModalNotification = false"
    ></modal-notification>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive} from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import ModalNotification from '../components/ModalNotification.vue'
  import helpers from '../helpers'

  type Datamodal = {
    title: string
    message: { [key: string]: any }
    url: string
  }

	export default defineComponent ({
    name: 'AppHome',
    components: { ModalNotification },
    setup() {
      const store = useStore()
      const router = useRouter()
      const { handleErrors } = helpers()
      
      let pages = store.getters.pages.filter((page: { [key: string]: any }) => JSON.parse(page.pivot.permissions).Ver_la_pagina_en_el_menu)
      
      let name_user = store.getters.user.name
      let show_modal_notification = ref(false)
      let data_modal_notification: Datamodal = reactive({
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
            data_modal_notification.title = 'Advertencia'
            data_modal_notification.message = handleErrors(error) 
            data_modal_notification.url = `/`

            show_modal_notification.value = true
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
        show_modal_notification, 
        data_modal_notification,
        show_menu,
        show_navbar,
        go_to_route
      }
    }
	})
</script>
<template>
  <div class="container">
    <nav class="navbar is-transparent">
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
    <modal-notification
      :show="show_modal_notification"
      :data="data_modal_notification"
      @close="show_modal_notification = false"
    ></modal-notification>
  </div>
</template>
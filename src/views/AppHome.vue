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
      
      let pages = store.getters.pages
      let show_modal_notification = ref(false)
      let data_modal_notification: Datamodal = reactive({
        title: '',
        message: {},
        url: ''
      })

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
      return {
        pages, 
        logout, 
        show_modal_notification, 
        data_modal_notification
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
        <div class="navbar-burger js-burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link v-for="page in pages" :key="page" :to="page.name_component" class="navbar-item">{{ page.name }}</router-link>
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
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <router-view name="sidebar"></router-view>
      </div>
    </section>
    <modal-notification
      :show="show_modal_notification"
      :data="data_modal_notification"
      @close="show_modal_notification = false"
    ></modal-notification>
  </div>
</template>
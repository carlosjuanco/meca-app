<script lang="ts">
import { defineComponent, ref, reactive, nextTick } from 'vue'
import ModalNotification from '../components/ModalNotification.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import helpers from '../helpers'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { object, string } from 'yup';

type Datamodal = {
  title: string
  message: { [key: string]: any }
  url: string
}

export default defineComponent ({
  name: 'AppLogin',
  components: {
    Form,
    Field,
    ErrorMessage,
    ModalNotification
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const { handleErrors } = helpers()
    const schema = object({
      email: string().email('La estructura del correo no es válido.')
      .required('El campo correo es obligatorio.'),
      password: string().min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('El campo contraseña es obligatorio.'),
    });

    let loading = ref(false)
    let show_modal_notification = ref(false)

    // Variable que me sirve para establecer el foco al input de correo
    const focusOnEmail = ref<HTMLInputElement | null>(null)
    //  Variable que me sirve para establecer el foco al input de contraseña
    // const setFocusToPassword = ref<HTMLInputElement | null>(null)
    //  Variable que sirve para establecer la clase de animacion
    //      para darle una salida al formulario
    const encourageExit = ref(false)
    const encourageEntrance = ref(true)
    // Variable para ocultar el formulario de logueo
    const hideLogin = ref(true)

    let data_modal_notification: Datamodal = reactive({
      title: '',
      message: {},
      url: ''
    })

    const login = async (values:{ [key: string]: any }) => {
      loading.value = true

      try {
        await store.dispatch('login', values)

        encourageExit.value = true
      }
      catch (error) {
        data_modal_notification.title = 'Advertencia'
        data_modal_notification.message = handleErrors(error) 
        data_modal_notification.url = `/`

        show_modal_notification.value = true

        loading.value = false
      }
    }

    /**
     *  Identificar en que momento se termina la animación
     *      cuando termina de aparecer bien el formullario.
     *  Para establecer el foco al campo correo.
     *  Caso:
     *      -Solo cuando se recargue la página o se habra la primera
     *          vez el sitio web realizara esta acción
     * 
     *  return void
    */
    const theLoginFormHasFinishedAnimating = async(event: { [key: string]: any }) => {
      console.info('Se termino la animación', event)
      // event.animationName contiene el nombre de la animación que terminó
      const animationName = event.animationName
    
      if (animationName === 'backInUp') {
        console.log('Animación de entrada terminada')
        encourageEntrance.value = false
        // Lógica específica para entrada
        await nextTick()
        if(focusOnEmail.value) {
          focusOnEmail.value.focus()
        }
      } else if (animationName === 'backOutDown') {
        console.log('Animación de salida terminada')
        hideLogin.value = false
        encourageExit.value = false
        // Lógica específica para salida
        router.replace({ name: store.getters.pages[0].name })
      }
    }

    return {
      loading,
      schema,
      login,
      show_modal_notification,
      data_modal_notification,
      focusOnEmail,
      theLoginFormHasFinishedAnimating,
      encourageExit,
      encourageEntrance,
      hideLogin,
    }
  }
})
</script>

<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-5">
        <nav 
          v-show="hideLogin"
          :class="{'panel animate__animated': true,
          'animate__backInUp': encourageEntrance,
          'animate__backOutDown': encourageExit }"
          @animationend="theLoginFormHasFinishedAnimating($event)"
        >
          <p class="panel-heading">
            Acceso al sistema
          </p>
          <div class="panel-heading has-background-white">
            <div class="columns">
              <div class="column is-12">
                <Form :validation-schema="schema" @submit="login">
                  <div class="field">
                    <div class="control">
                      <Field name="email"
                        v-slot="{ value, handleChange, handleBlur }"
                      >
                        <input 
                          :value="value"
                          @input="handleChange"
                          @blur="handleBlur"
                          ref="focusOnEmail"
                          type="email"
                          :class="{'input is-family-monospace has-text-centered': true }"
                          placeholder="Correo"
                        />
                      </Field>
                    </div>
                    <ErrorMessage name="email" :class="{'tag is-warning': true }"/>
                  </div>

                  <div class="field">
                    <div class="control">
                      <Field name="password" 
                        type="password"
                        :class="{'input is-family-monospace has-text-centered': true }"
                        placeholder="Contraseña"
                      />
                    </div>
                    <ErrorMessage name="password" :class="{'tag is-warning': true }"/>
                  </div>

                  <div class="control has-text-centered">
                    <button type="submit" 
                      :class="{'button is-success is-family-monospace': true,
                      'is-loading': loading }"
                    >
                      Ingresar
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <!-- Modal de notificaciones -->
    <modal-notification
      :show="show_modal_notification"
      :data="data_modal_notification"
      @close="show_modal_notification = false"
    >
    </modal-notification>
  </section>
</template>
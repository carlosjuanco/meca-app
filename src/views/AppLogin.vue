<script lang="ts">
    import { defineComponent, ref, reactive} from 'vue'
    import ModalNotification from '../components/ModalNotification.vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import helpers from '../helpers'
    import { Field, Form, ErrorMessage } from 'vee-validate'
    import * as yup from 'yup'

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
            const schema = yup.object({
              email: yup.string().email('El correo electrónico debe ser un correo electrónico válido')
              .required('El campo correo es obligatorio.'),
              password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
              .required('El contraseña correo es obligatorio.'),
            });

            let loading = ref(false)
            let show_modal_notification = ref(false)

            let data_modal_notification: Datamodal = reactive({
              title: '',
              message: {},
              url: ''
            })

            const login = async (values:{ [key: string]: any }) => {
                loading.value = true

                try {
                    await store.dispatch('login', values)

                    router.replace({ name: store.getters.pages[0].name })
                }
                catch (error) {
                    data_modal_notification.title = 'Advertencia'
                    data_modal_notification.message = handleErrors(error) 
                    data_modal_notification.url = `/`

                    show_modal_notification.value = true

                    loading.value = false
                }
            }

            return {
                loading,
                schema,
                login,
                show_modal_notification,
                data_modal_notification
            }
        }
    })
</script>

<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-5">
                <nav class="panel animate__animated animate__backInUp">
                    <p class="panel-heading">
                        Acceso al sistema
                    </p>
                    <div class="panel-heading has-background-white">
                        <div class="columns">
                            <div class="column is-12">
                                <Form :validation-schema="schema" @submit="login">
                                    <div class="field">
                                        <div class="control">
                                            <Field name="email" type="email"
                                            :class="{'input is-family-monospace has-text-centered': true}"
                                            placeholder="Correo"/>
                                        </div>
                                        <ErrorMessage name="email" :class="{'tag is-warning': true }"/>
                                    </div>

                                    <div class="field">
                                        <div class="control">
                                            <Field name="password" type="password"
                                            :class="{'input is-family-monospace has-text-centered': true}"
                                            placeholder="Contraseña"/>
                                        </div>
                                        <ErrorMessage name="password" :class="{'tag is-warning': true }"/>
                                    </div>

                                    <div class="control has-text-centered">
                                        <button type="submit" :class="{'button is-success is-family-monospace': true, 'is-loading': loading}">
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
        <modal-notification
              :show="show_modal_notification"
              :data="data_modal_notification"
              @close="show_modal_notification = false"
          ></modal-notification>
    </section>
</template>
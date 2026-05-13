<script lang="ts">
import { defineComponent, reactive, ref, watchEffect, PropType, watch, nextTick } from 'vue'
import helpers from '../../helpers'
import InternalNotification from '../InternalNotification.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { object, string, number } from 'yup'
import type { DataModel, DataModelInternal } from '../types/comunidad'

export default defineComponent ({
  name: 'ComunidadForm',
  components: {
    Form,
    Field,
    ErrorMessage,
    InternalNotification
  },
  emits: ['close'],
  props: {
    show: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object as PropType<DataModel>,
      required: true
    }
  },
  setup (props, { emit }) {
    const { handleRequest } = helpers()
    let loading = ref(false)
    // Crear un contador para la key
    const modalKey = ref(0)

    // Inicializar la variable form, con datos vacios
    const initialValues = reactive({} as DataModel)

    // Inicializar la variable dataInternalNotification con datos vacios
    let dataInternalNotification = reactive({} as DataModelInternal)

    let showInternalNotification = ref(false)

     // Esquema de validación
    const schema = object({
      id: number(),
      name: string().min(1, 'El nombre debe tener al menos 1 caracteres')
        .max(25, 'El nombre debe tener como máximo 25 caracteres')
        .required('El nombre es obligatorio.')
    });

    //  Variable que me sirve para establecer el foco al primer elemento del formulario
    const firstInput = ref<HTMLInputElement | null>(null)
    
    // Realiza una petición al servidor para guardar los datos
    const save = async (values: DataModel) => {
      loading.value = true
      try {
        let route: string = props.data.id ? '/communities' : '/communities/store'

        const response = await handleRequest('post', route, values, props.data.id)

        emit('close')

        // La palabra informacion va sin acento porque en el componente
        // es una propiedad y las propiedad en ningun lenguaje llevan acento 
        dataInternalNotification.type = 'Informacion'
        dataInternalNotification.message = response.message

        showInternalNotification.value = true
      } catch (error: any) {
        emit('close')

        dataInternalNotification.type = 'Advertencia'
        dataInternalNotification.message = error.message
        // Si no existe response, eso significa que no es un error de API es un error
        // Network Error
        dataInternalNotification.errors = error.response ? error.response.data.errors : ''

        showInternalNotification.value = true
      } finally {
        loading.value = false
      }
    }

    // Observa a props.data, pero como reemplamos lo de adentro, por eso uso watchEffect
    watchEffect(() => {
      if (props.data) {
        Object.assign(initialValues, props.data)
      }
    })

    /*
      Miro a props.show, si cambia de valor y es verdadero, entonces ponemos el foco
        al primer elemento del formulario
    */
    watch(() => props.show, async (newVal) => {
      if (newVal) {
        // Incrementar la key cada vez que se abre el modal
        modalKey.value++

        await nextTick()
        if(firstInput.value) {
          firstInput.value.focus()
        }
      }
    })

    return { 
      initialValues,
      save,
      loading,
      modalKey,
      firstInput,
      schema,
      showInternalNotification,
      dataInternalNotification
    }
  }
})
</script>
<template>
  <!-- Modal card -->
  <div :class="{'modal': true, 'is-active': show}">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <!-- Cabecera del modal -->
      <header class="modal-card-head">
        <p class="modal-card-title">
          <span v-if="data.id">
            Editar comunidad
          </span>
          <span v-else>
            Nueva comunidad
          </span>
        </p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <Form
        :key="data?.id ? `edit-${data.id}` : `new-${modalKey}`" 
        :validation-schema="schema" 
        :initial-values="initialValues"
        @submit="save"
      >

        <!-- Cuerpo del modal -->
        <section class="modal-card-body">

          <div class="field">
            <label class="label">
              Comunidad
            </label>
            <div class="control">
              <Field name="name" v-slot="{ value, handleChange, handleBlur }">
                <input 
                  :value="value"
                  @input="handleChange"
                  @blur="handleBlur"
                  ref="firstInput"
                  type="text"
                  :class="{ 'is-danger': false, 'input': true }"
                  placeholder="Comunidad"
                />
              </Field>
              <ErrorMessage name="name" class="tag is-warning"/>
            </div>
          </div>
        </section>
        <!-- Pie del modal -->
        <footer class="modal-card-foot">
          <div class="buttons">
            <button type="submit" 
              :class="{'button is-link': true, 'is-loading': loading }"
              :disabled="loading == true"
            >
              <span v-if="data.id">
                Actualizar
              </span>
              <span v-else>
                Guardar
              </span>
            </button>
            <button type="button" class="button" 
              @click="$emit('close')">
              Cancelar
            </button>
          </div>
        </footer>
      </Form>
    </div>
  </div>

  <!-- Modal para la notificacion interna -->
  <internal-notification
    :show="showInternalNotification"
    :data="dataInternalNotification"
    @close="showInternalNotification = false, loading = false"
  />
</template>
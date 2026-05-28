<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, PropType, nextTick, onMounted } from 'vue'
import helpers from '../../helpers'
import InternalNotification from '../InternalNotification.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { object, string, number, mixed } from 'yup'
import type { DataModel } from '../types/escuela'
import type { DataModel as DataModelCominity } from '../types/comunidad'
import type { DataModelInternal } from '../types/tiposGenericos'

export default defineComponent({
  name: 'EscuelaForm',
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
  setup(props, { emit }) {
    const { handleRequest } = helpers()
    let loading = ref(false)
    // Crear un contador para la key
    const modalKey = ref(0)

    // Inicializar la variable form, con datos vacios
    const initialValues = reactive({} as DataModel)

    // Inicializar la variable dataInternalNotification con datos vacios
    let dataInternalNotification = reactive({} as DataModelInternal)
    // Inicializar la variable para mostrar u ocultar el dialogo notificaciones internas
    let showInternalNotification = ref(false)

    // Esquema de validación
    const schema = object({
      id: number(),
      name: string().min(1, 'El nombre debe tener al menos 1 carácter')
        .max(26, 'El nombre debe tener como máximo 26 caracteres'),
      key: string().min(1, 'La clave debe tener al menos 1 carácter')
        .max(10, 'La clave debe tener como máximo 10 caracteres'),
      // Linea 311 de README.md de yup
      // https://github.com/jquense/yup/blob/pre-v1/docs/typescript.md
      type_of_school: mixed()
        .oneOf(['Primaria', 'Preescolar', 'Inicial', 'Albergues escolares'] as const)
        .defined()
        .required('El tipo de escuela es obligatorio.'),
      community_id: number()
        .required('La comunidad es obligatorio.')
        .typeError('Seleccione una comunidad'),
      secondary_number: number()
        .min(10, 'El número consecutivo no puede ser mayor a 10')
    });

    const firstInput = ref<HTMLInputElement | null>(null)

    // Crear la variable communities para almacenar todas las comunidades
    let communities = reactive<DataModelCominity[]>([])

    // Obtener todas la comunidades
    const getAllTheCommunities = async () => {
      try {
        const response = await handleRequest('get', `communities`)

        /*
          Reiniciar el array manteniendo la reactividad
          Los tres puntos son el operador de propagación (spread operator).
            Su función es "expandir" o "desempaquetar" los elementos de un array
        */
        communities.splice(0, communities.length, ...response)
      } catch (error) {
        console.log(error)
      }
    }

    // Realiza una petición al servidor para guardar los datos
    const save = async (values: DataModel) => {
      loading.value = true
      try {
        let route: string = props.data.id ? '/schools' : '/schools/store'

        const response = await handleRequest('post', route, values, props.data.id)

        emit('close')

        // La palabra información va sin acento porque en el componente
        // es una propiedad y las propiedades en ningun lenguaje llevan acento
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
    watch(() => props.show, async (value: boolean) => {
      if (value) {
        // Incrementar la key cada vez que se abre el modal
        modalKey.value++

        await nextTick()
        if(firstInput.value) {
          firstInput.value.focus()
        }
      }
    })

    onMounted(() => {
      getAllTheCommunities()
    })

    return {
      initialValues,
      save,
      loading,
      modalKey,
      firstInput,
      schema,
      showInternalNotification,
      dataInternalNotification,
      communities
    }
  }
})
</script>

<template>
  <!-- Modal card -->
  <div :class="{'modal': true, 'is-active': show}">
    <div class="modal-background" @click="$emit('close')"></div>

    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">
          <span v-if="data.id">Editar escuela</span>
          <span v-else>Nueva escuela</span>
        </p>
        <button class="delete" @click="$emit('close')"></button>
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
            <label class="label">Escuela</label>
            <Field name="name" v-slot="{ value, handleChange, handleBlur }"
            >
              <input 
                :value="value"
                @input="handleChange"
                @blur="handleBlur"
                ref="firstInput"
                type="text"
                :class="{ 'is-danger': false, 'input': true }"
                placeholder="Nombre escuela"
              />
            </Field>
            <ErrorMessage name="name" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Clave</label>
            <Field name="key"
              type="text"
              placeholder="Nombre escuela"
              :class="{ 'is-danger': false, 'input': true }"
            >
            </Field>
            <ErrorMessage name="key" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Tipo de escuela</label>
            <div class="select is-fullwidth">
              <Field name="type_of_school" v-slot="{ field }">
                <select
                  v-bind="field"
                  :class="{ 'is-danger': false }"
                >
                  <option value="Primaria">Primaria</option>
                  <option value="Preescolar">Preescolar</option>
                  <option value="Inicial">Inicial</option>
                  <option value="Albergues escolares">Albergues escolares</option>
                </select>
              </Field>
              <ErrorMessage name="type_of_school" class="tag is-warning"/>
            </div>
          </div>

          <div class="field">
            <label class="label">Comunidad</label>
            <div class="select is-fullwidth">
              <Field name="community_id" v-slot="{ field }">
                <select 
                  v-bind="field"
                >
                  <option value="" disabled>Selecciona una comunidad</option>
                  <option 
                    v-for="community in communities" 
                    :key="community.id" 
                    :value="community.id"
                    :text="community.name"
                  >
                  </option>
                </select>
              </Field>
              <ErrorMessage name="community_id" class="tag is-warning"/>
            </div>
          </div>

          <div class="field">
            <label class="label">Número progresivo</label>
            <input class="input">
          </div>

        </section>

        <!-- Pie del modal -->
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-link" v-if="!loading" @click="save">
              <span v-if="data.id">Actualizar</span>
              <span v-else>Guardar</span>
            </button>

            <button class="button" @click="$emit('close')">
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
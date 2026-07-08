<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, PropType, nextTick, onMounted } from 'vue'
import helpers from '../../helpers'
import InternalNotification from '../InternalNotification.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { object, string, number, mixed } from 'yup'
import type { DataModel } from '../types/escuela'
import type { DataModel as DataModelCominity } from '../types/comunidad'

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
    const { handleRequest, handleErrors } = helpers()
    let loading = ref(false)
    // Crear un contador para la key
    const modalKey = ref(0)

    // Inicializar la variable form, con datos vacios
    const initialValues = reactive({} as DataModel)

    // Inicializar la variable dataInternalNotification con datos vacios
    let dataInternalNotification = ref({})
    // Inicializar la variable para mostrar u ocultar el dialogo notificaciones internas
    let showModalInternalNotification = ref(false)

    // Esquema de validación
    const schema = object({
      id: number(),
      name: string()
        /**
         * Nullable() siempre va despues de string() o number(),
         * 
         * Es necesario utilizarlo cuando no es requerido, cuando edita es donde
         * se ve el beneficio, porque el registrar un nuevo registro no.
         */
        .nullable()
        .max(26, 'El nombre debe tener como máximo 26 caracteres'),
      key: string()
        .nullable()
        .max(10, 'La clave debe tener como máximo 10 caracteres'),
      // Linea 311 de README.md de yup
      // https://github.com/jquense/yup/blob/pre-v1/docs/typescript.md
      type_of_school: mixed()
        .oneOf(['Primaria', 'Preescolar', 'Inicial', 'Albergues escolares'] as const,
          'El tipo de escuela debe ser uno de los siguientes valores: Primaria, Preescolar, Inicial, Albergues escolares ')
        .defined()
        .required('El tipo de escuela es obligatorio.'),
      community_id: number()
        .required('La comunidad es obligatorio.')
        // Si no le pongo esta opcion de que al menos tenga un caracter no hace
        // que la comunidad sea obligatoria
        .min(1, 'Selecciona una comunidad'),
      secondary_number: number()
        .nullable()
        // Para manejar un campo number que puede estar vacío (string vacío) o ser un número positivo
        .transform((value, originalValue) => {
          // Si es string vacío, retorna null
          if (originalValue === '' || originalValue === undefined || originalValue === null) {
            return null;
          }
          // Intenta convertir a número
          const num = Number(originalValue);
          return isNaN(num) ? null : num;
        })
        .max(10, 'El número consecutivo no puede ser mayor a 10')
        .positive('El número consecutivo debe ser un número positivo')
    })

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

        dataInternalNotification.value = {
          type: 'Exito',
          message: response.message
        }

        showModalInternalNotification.value = true

      } catch (error: any) {
        emit('close')

        dataInternalNotification.value = {
          type: 'Error',
          errors: handleErrors(error),
        }

        showModalInternalNotification.value = true
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
      showModalInternalNotification,
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
              v-slot="{ value, handleChange }"
            >
            <!-- Sacamos a handleChange, para que al momento de escribir el usuario, pueda
              visualizar si el máximo de caracteres es permitido y no después de perder
              el foco en el input -->
              <input
                :value="value"
                @input="handleChange"
                type="text"
                placeholder="Clave"
                :class="{ 'is-danger': false, 'input': true }"
              />
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
            </div>
            <ErrorMessage name="type_of_school" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Comunidad</label>
            <div class="select is-fullwidth">
              <Field name="community_id" 
                v-slot="{ field, value }"
              >
                <select 
                  v-bind="field"
                >
                  <option value="" disabled>Selecciona una comunidad</option>
                  <option 
                    v-for="community in communities" 
                    :key="community.id" 
                    :value="Number(community.id)"
                    :selected="value === Number(community.id)"
                  >
                  {{ community.name }}
                  </option>
                </select>
              </Field>
            </div>
            <ErrorMessage name="community_id" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Número progresivo</label>
            <Field name="secondary_number"
              v-slot="{ field, value }"
            >
              <input
                v-bind="field"
                :value="value"
                type="number"
                placeholder="Número progresivo"
                :class="{ 'is-danger': false, 'input': true }"
              >
            </Field>
            <ErrorMessage name="secondary_number" class="tag is-warning"/>
          </div>

        </section>

        <!-- Pie del modal -->
        <footer class="modal-card-foot">
          <div class="buttons">
            <button
              type="submit"
              :class="{'button is-link': true, 'is-loading': loading }"
              :disabled="loading == true"
            >
              <span v-if="data.id">Actualizar</span>
              <span v-else>Guardar</span>
            </button>

            <button class="button" 
              type="button"
              @click="$emit('close')"
            >
              Cancelar
            </button>
          </div>
        </footer>
      </Form>
    </div>

  </div>
  
  <!-- Modal para la notificacion interna -->
  <internal-notification
    :show="showModalInternalNotification"
    :data="dataInternalNotification"
    @close="showModalInternalNotification = false, loading = false"
  />
</template>
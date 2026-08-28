<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, PropType, nextTick } from 'vue'
import helpers from '../../helpers'
import InternalNotification from '../InternalNotification.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { object, string, number, mixed, date } from 'yup'
import type { DataModel } from '../types/teacher'
import type { DataModel as DataModelSchool } from '../types/escuela'

export default defineComponent({
  name: 'ProfesorForm',
  components: {
    Form,
    Field,
    ErrorMessage,
    InternalNotification
  },
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
  emits: ['close'],
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
        .max(20, 'El nombre debe tener como máximo 20 caracteres'),
      paternal_surname: string()
        .max(20, 'El apellido paterno debe tener como máximo 20 caracteres'),
      maternal_surname: string()
        /**
         * Nullable() siempre va después de string() o number(),
         * 
         * Es necesario utilizarlo cuando no es requerido, cuando edita es donde
         * se ve el beneficio, porque el registrar un nuevo registro no.
         */
        .nullable()
        .max(20, 'El apellido materno debe tener como máximo 20 caracteres'),
      curp: string()
        .max(18, 'La CURP debe tener como máximo 18 caracteres'),
      rfc: string()
        .max(13, 'El RFC debe tener como máximo 13 caracteres'),
      gender: mixed()
        .oneOf(['Hombre', 'Mujer'] as const,
          'El sexo debe ser uno de los siguientes valores: Hombre o Mujer')
        .defined()
        .required('El sexo es obligatorio.'),
      budget_code: string()
        .max(23, 'La Clave presupuestal debe tener como máximo 23 caracteres'),
      funcion: mixed()
        .oneOf(['Docente', 'Administrativo', 'Docente con grupo', 'Director'] as const,
          'La función debe ser uno de los siguientes valores: Docente, Administrativo, Docente con grupo o Director')
        .defined(),
      telephone: string()
        .required('El teléfono es requerido')
        .transform((value, originalValue) => {
          return phoneTransform(originalValue)
        })
        .matches(/^\d{3} \d{3} \d{4}$/, 'Formato inválido. Use: xxx xxx xxxx'),
      reason: number()
        .required('El motivo es obligatorio.')
        .max(2, 'El motivo debe tener como máximo 2 caracteres'),
      date_of_entry_into_the_sep: date()
        .format(new Date(), 'dd/mm/yyyy'),
      study_profile: mixed()
        .oneOf(['Titulado de U.P.N.', 'Pasante de normal superior', 'Pasante de maestría', 'Pasante de U.P.N.'] as const,
          'El perfil de estudio debe ser uno de los siguientes valores: Titulado de U.P.N., Pasante de normal superior, Pasante de maestría o Pasante de U.P.N.')
        .defined()
        .nullable(),
      language: mixed()
        .oneOf(['Mixteca', 'Cañada', 'Costa', 'Istmo', 'Papaloapan', 'Sierra sur', 'Sierra norte', 'Valles centrales'] as const,
          'La lengua debe ser uno de los siguientes valores: Mixteca, Cañada, Costa, Istmo, Papaloapan, Sierra sur, Sierra norte o Valles centrales')
        .defined()
        .nullable(),
      language_variant: mixed()
        .oneOf(['Alta', 'Baja'] as const,
          'La lengua debe ser uno de los siguientes valores: Alta o Baja')
        .defined()
        .nullable(),
      school_id: number()
        .required('La escuela es obligatorio.')
        // Si no le pongo esta opción de que al menos tenga un caracter no hace
        // que la comunidad sea obligatoria
        .min(1, 'Selecciona una escuela')
    })

    const firstInput = ref<HTMLInputElement | null>(null)

    // Crear la variable schools para almacenar todas las escuelas
    let schools = reactive<DataModelSchool[]>([])

    // Obtener todas las escuelas
    const getAllTheSchools = async () => {
      try {
        const response = await handleRequest('get', `schools`)

        /*
          Reiniciar el array manteniendo la reactividad
          Los tres puntos son el operador de propagación (spread operator).
            Su función es "expandir" o "desempaquetar" los elementos de un array
        */
        schools.splice(0, schools.length, ...response)
      } catch (error) {
        console.log(error)
      }
    }

    /*
    *
    * Fuente: https://chat.deepseek.com/share/pxzqhbrk5xgduk6m0j
    */
    const phoneTransform = (value) => {
      if (!value) return value;
      
      // Eliminar todos los caracteres que no sean números
      const numbers = value.replace(/\D/g, '')
      
      /* 
        ===============================================================
        📌 SLICE() - MÉTODO PARA ARRAYS Y STRINGS
        ===============================================================
        
        ¿QUÉ ES?
        ---------
        slice() es un método que extrae una parte de un array o string
        y devuelve una NUEVA copia sin modificar el original.
        
        SINTAXIS BÁSICA:
        ----------------
        array.slice(inicio, fin)
        string.slice(inicio, fin)
        
        PARÁMETROS:
        -----------
        • inicio (opcional): Índice donde empieza la extracción (SE INCLUYE)
        • fin (opcional): Índice donde termina (NO SE INCLUYE)
        
        CARACTERÍSTICAS IMPORTANTES:
        ----------------------------
        • Si no se pasa ningún parámetro → copia TODO el array/string
        • Si se pasa solo 'inicio' → desde 'inicio' hasta el final
        • Acepta índices negativos (cuentan desde el final)
        • NO modifica el array/string original
        • Devuelve un NUEVO array o string
        
        EJEMPLO RÁPIDO:
        ---------------
        const arr = [1, 2, 3, 4, 5];
        arr.slice(1, 4);    // [2, 3, 4]
        arr.slice(-2);      // [4, 5]
        arr.slice();        // [1, 2, 3, 4, 5] (copia)
        ================================================================ 
      */
      // Limitar a 10 dígitos (opcional, ajusta según necesites)
      const limitedNumbers = numbers.slice(0, 10)
      
      // Aplicar el formato: 3 números + espacio + 3 números + espacio + 4 números
      let formatted: string = ''
      if (limitedNumbers.length > 0) {
        formatted = limitedNumbers.slice(0, 3)
        if (limitedNumbers.length > 3) {
          formatted += ' ' + limitedNumbers.slice(3, 6)
          if (limitedNumbers.length > 6) {
            formatted += ' ' + limitedNumbers.slice(6, 10)
          }
        }
      }
      
      return formatted
    }

    const save = async (values: DataModel) => {
      loading.value = true
      try {
        let route: string = props.data.id ? '/teachers' : '/teachers/store'

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
      getAllTheSchools()
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
      schools
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
          <span v-if="form.id">Editar profesor</span>
          <span v-else>Nuevo profesor</span>
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
            <label class="label">Nombre</label>
            <Field name="name" v-slot="{ value, handleChange, handleBlur }"
            >
              <input 
                :value="value"
                @input="handleChange"
                @blur="handleBlur"
                ref="firstInput"
                type="text"
                class="input"
                placeholder="Nombre"
              />
            </Field>
            <ErrorMessage name="name" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Apellido paterno</label>
            <Field name="paternal_surname"
              type="text"
              placeholder="Apellido paterno"
              clas="input"
            >
            </Field>
            <ErrorMessage name="paternal_surname" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Apellido materno</label>
            <Field name="maternal_surname"
              type="text"
              placeholder="Apellido materno"
              clas="input"
            >
            </Field>
            <ErrorMessage name="maternal_surname" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">CURP</label>
            <Field name="curp"
              type="text"
              placeholder="CURP"
              clas="input"
            >
            </Field>
            <ErrorMessage name="curp" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">R.F.C.</label>
            <Field name="rfc"
              type="text"
              placeholder="R.F.C."
              clas="input"
            >
            </Field>
            <ErrorMessage name="rfc" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Sexo</label>
            <div class="select is-fullwidth">
              <Field name="gender" v-slot="{ field }">
                <select
                  v-bind="field"
                  :class="{ 'is-danger': false }"
                >
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                </select>
              </Field>
            </div>
            <ErrorMessage name="gender" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Clave presupuestal</label>
            <Field name="budget_code"
              type="text"
              placeholder="Clave presupuestal"
              clas="input"
            >
            </Field>
            <ErrorMessage name="budget_code" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Función</label>
            <div class="select is-fullwidth">
              <Field name="funcion" v-slot="{ field }">
                <select
                  v-bind="field"
                  :class="{ 'is-danger': false }"
                >
                  <option value="Docente">Docente</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Docente con grupo">Docente con grupo</option>
                  <option value="Director">Director</option>
                </select>
              </Field>
            </div>
            <ErrorMessage name="funcion" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Escuela</label>
            <div class="select is-fullwidth">
              <Field name="school_id" 
                v-slot="{ field, value }"
              >
                <select 
                  v-bind="field"
                >
                  <option value="" disabled>Selecciona una escuela</option>
                  <option 
                    v-for="school in schools" 
                    :key="school.id" 
                    :value="Number(school.id)"
                    :selected="value === Number(school.id)"
                  >
                  {{ school.name }}
                  </option>
                </select>
              </Field>
            </div>
            <ErrorMessage name="school_id" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Teléfono</label>
            <Field 
              name="telephone" 
              v-model="telephone"
              placeholder="Teléfono"
              class="input"
              maxlength="12"
            />
            <ErrorMessage name="telephone" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Motivo</label>
            <Field name="reason"
              type="number"
              placeholder="Motivo"
              clas="input"
            >
            </Field>
            <ErrorMessage name="reason" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Fecha de ingreso a la SEP</label>
            <Field name="date_of_entry_into_the_sep"
              type="date"
              placeholder="Fecha de ingreso a la SEP"
              clas="input"
            >
            </Field>
            <ErrorMessage name="date_of_entry_into_the_sep" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Perfil de estudios</label>
            <div class="select is-fullwidth">
              <Field name="study_profile" 
                v-slot="{ field, value }"
              >
                <select 
                  v-bind="field"
                >
                  <option value="" disabled>Seleccione un perfil de estudios</option>
                  <option value="Titulado de U.P.N.">Titulado de U.P.N.</option>
                  <option value="Pasante de normal superior">Pasante de normal superior</option>
                  <option value="Pasante de maestría">Pasante de maestría</option>
                  <option value="Pasante de U.P.N.">Pasante de U.P.N.</option>
                </select>
              </Field>
            </div>
            <ErrorMessage name="study_profile" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Lengua</label>
            <div class="select is-fullwidth">
              <Field name="language" 
                v-slot="{ field, value }"
              >
                <select 
                  v-bind="field"
                >
                  <option value="" disabled>Selecciona una lengua</option>
                  <option value="Mixteca">Mixteca</option>
                  <option value="Cañada">Cañada</option>
                  <option value="Costa">Costa</option>
                  <option value="Istmo">Istmo</option>
                  <option value="Papaloapan">Papaloapan</option>
                  <option value="Sierra sur">Sierra sur</option>
                  <option value="Sierra norte">Sierra norte</option>
                  <option value="Valles centrales">Valles centrales</option>
                </select>
              </Field>
            </div>
            <ErrorMessage name="language" class="tag is-warning"/>
          </div>

          <div class="field">
            <label class="label">Variante de lengua</label>
              <Field name="language" 
                v-slot="{ field, value }"
              >
                <select 
                  v-bind="field"
                >
                  <option value="" disabled>Selecciona una variante</option>
                  <option value="Alta">Alta</option>
                  <option value="Baja">Baja</option>
                </select>
              </Field>
            </div>
            <ErrorMessage name="language" class="tag is-warning"/>
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
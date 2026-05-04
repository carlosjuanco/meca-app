<script lang="ts">
import { defineComponent, reactive, ref, watchEffect, PropType, watch, nextTick } from 'vue'
import helpers from '../../helpers'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { object, string, number } from 'yup'

// Describir la forma del objeto para almacenar los datos
type DataModel = {
  id?: number;
  name: string;
}

export default defineComponent ({
  name: 'ComunidadForm',
  components: {
    Form,
    Field,
    ErrorMessage,
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

    // Inicializar la variable form, con datos vacios
    const initialValues = reactive({} as DataModel)

    // Declarar las reglas de negocio
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
      try {
        loading.value = true

        const response = await handleRequest('post', '/communities/store', values)
        console.info('Que respondes puto', response)
        loading.value = false
        emit('close')
      }
      catch (error) {
        console.info('Error grave', error)
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
        await nextTick()
        if(firstInput.value) {
          firstInput.value.focus()
        }
      }
    })

    return { initialValues, save, loading, firstInput, schema }
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
        :key="data?.id || 'new'" 
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
</template>
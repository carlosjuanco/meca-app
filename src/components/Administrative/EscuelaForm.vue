<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, PropType, nextTick } from 'vue'
import helpers from '../../helpers'
import InternalNotification from '../InternalNotification.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { object, string, number } from 'yup'
import type { DataModel } from '../types/escuela'
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
    / Crear un contador para la key
    const modalKey = ref(0)

    // Inicializar la variable form, con datos vacios
    const initialValues = reactive({} as DataModel)

    // Inicializar la variable dataInternalNotification con datos vacios
    let dataInternalNotification = reactive({} as DataModelInternal)
    // Inicializar la variable para mostrar u ocultar el dialogo notificaciones internas
    let showInternalNotification = ref(false)

    const form = reactive({} as DataModel)

    // Esquema de validación
    const schema = object({
      id: number(),
      name: string().min(1, 'El nombre debe tener al menos 1 carácter')
        .max(26, 'El nombre debe tener como máximo 26 caracteres'),
      key: string().min(1, 'La clave debe tener al menos 1 carácter')
        .max(10, 'La clave debe tener como máximo 10 caracteres'),
      type_of_school: string().min(1, 'La clave debe tener al menos 1 carácter')
        .max(10, 'La clave debe tener como máximo 10 caracteres'),
    });

    const firstInput = ref<HTMLInputElement | null>(null)

    const save = () => {
      console.log('Guardar...')
      emit('close')
    }

    watchEffect(() => {
      if (props.data) {
        Object.assign(form, props.data)
      }
    })

    watch(() => props.show, async (value: boolean) => {
      if (value) {
        await nextTick()
        firstInput.value?.focus()
      }
    })

    return {
      form,
      firstInput,
      save,
      emit,
      loading
    }
  }
})
</script>

<template>

  <div :class="{'modal': true, 'is-active': show}">
    <div class="modal-background" @click="$emit('close')"></div>

    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">
          <span v-if="form.id">Editar escuela</span>
          <span v-else>Nueva escuela</span>
        </p>
        <button class="delete" @click="$emit('close')"></button>
      </header>

      <section class="modal-card-body">

        <div class="field">
          <label class="label">Escuela</label>
          <input ref="firstInput" v-model="form.school" class="input">
        </div>

        <div class="field">
          <label class="label">Clave</label>
          <input v-model="form.code" class="input">
        </div>

        <div class="field">
          <label class="label">Tipo de escuela</label>
          <div class="select is-fullwidth">
            <select v-model="form.schoolType">
              <option>Primaria</option>
              <option>Preescolar</option>
              <option>Inicial</option>
              <option>Albergues escolares</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label class="label">Localidad</label>
          <div class="select is-fullwidth">
            <select v-model="form.location">
              <option>San Juan Monteflor</option>
              <option>Cañada de Hielo</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label class="label">Número progresivo</label>
          <input v-model="form.progressiveNumber" class="input">
        </div>

      </section>

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

    </div>

  </div>

</template>
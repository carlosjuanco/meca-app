<script lang="ts">
import { defineComponent, reactive, ref, watchEffect, PropType, watch, nextTick } from 'vue'

// Describir la forma del objeto para almacenar los datos
type DataModel = {
  id: number;
  name: string;
}

export default defineComponent ({
  name: 'ComunidadForm',
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
    let loading = ref(false)

    // Inicializar la variable form, con datos vacios
    const form = reactive({} as DataModel)

    //  Variable que me sirve para establecer el foco al primer elemento del formulario
    const firstInput = ref<HTMLInputElement | null>(null)
    
    // Realiza una petición al servidor para guardar los datos
    const save = () => {
        loading.value = true
        loading.value = false
        emit('close')
    }

    // Observa a props.data, pero como reemplamos lo de adentro, por eso uso watchEffect
    watchEffect(() => {
      if (props.data) {
        Object.assign(form, props.data)
      }
    })

    /*
      Miro a props.show, si cambia de valor y es verdadero, entonces ponemos el foco
        al primer elemento del formulario
    */
    watch(() => props.show, async (newVal) => {
      if (newVal) {
        await nextTick()
        firstInput.value?.focus()
      }
    })

    return { form, save, loading, firstInput }
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
      <!-- Cuerpo del modal -->
      <section class="modal-card-body">
        <div class="field">
          <label class="label">
            Comunidad
          </label>
          <div class="control">
            <input type="text" 
              class="input" 
              v-model="form.name"
              ref="firstInput"/>
          </div>
        </div>
      </section>
      <!-- Pie del modal -->
      <footer class="modal-card-foot">
        <div class="buttons">
          <button @click="save" class="button is-link">
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
    </div>
  </div>
</template>
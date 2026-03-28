<script lang="ts">
import { defineComponent, ref, reactive, watchEffect, PropType, watch, nextTick } from 'vue'

// Describir la forma del objeto para recibir los datos, desde un componente padre
type DescribeTheShapeOfTheDataObject = {
  id: number;
  name: string;
}

export default defineComponent ({
  name: 'ComunidadForm',
  emits: ['close'],
  props: {
    show: Boolean,
    data: {
      type: Object as PropType<DescribeTheShapeOfTheDataObject>,
      required: true
    }
  },
  setup (props, { emit }) {
    let loading = ref(false)

    // Inicializar la variable form, con datos vacios
    const form = reactive<DescribeTheShapeOfTheDataObject>({
      id: 0,
      name: ''
    })

    //  Variable que me sirve para establecer el foco al primer elemento del formulario
    const firstInput = ref<HTMLInputElement | null>(null)
    
    // Realiza una peticion al servidor para guardar los datos
    const save = async () => {
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
  <div :class="{'modal': true, 'is-active': show}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <template v-if="data.id">
            Editar comunidad
          </template>
          <template v-else>
            Nueva comunidad
          </template>
        </p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">
              Comunidad
            </label>
            <div class="control">
              <input type="text" 
                :class="{'input': true }" v-model="form.name" ref="firstInput"/>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button @click="save" :class="{'button is-link': true, 'is-loading': loading}">
              <template v-if="data.id">
                Actualizar
              </template>
              <template v-else>
                Guardar
              </template>
            </button>
            <button type="button" class="button" 
              @click="$emit('close')" v-if="loading == false">
              Cancelar
            </button>
          </div>
        </footer>
    </div>
  </div>
</template>
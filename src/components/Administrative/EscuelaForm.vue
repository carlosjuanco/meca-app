<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, PropType, nextTick } from 'vue'

type DataModel = {
  id: number
  school: string
  code: string
  schoolType: string
  location: string
  progressiveNumber: string
}

export default defineComponent({
  name: 'EscuelaForm',
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

    let loading = ref(false)

    const form = reactive({} as DataModel)

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
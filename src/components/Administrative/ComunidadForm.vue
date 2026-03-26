<script lang="ts">
import { defineComponent, ref, reactive, watchEffect, PropType, watch, nextTick } from 'vue'

type CommunityData = {
  id: number;
  name: string;
}

export default defineComponent ({
  name: 'ComunidadForm',
  emits: ['close'],
  props: {
    show: Boolean,
    data: {
      type: Object as PropType<CommunityData>,
      required: true
    }
  },
  setup (props, { emit }) {
    let loading = ref(false)
    const form = reactive<CommunityData>({
      id: 0,
      name: ''
    })
    const inputName = ref<HTMLInputElement | null>(null)
    
    const save = async () => {
        loading.value = true
        loading.value = false
        emit('close')
    }

    watchEffect(() => {
      if (props.data) {
        Object.assign(form, props.data)
      }
    })

    watch(() => props.show, async (newVal) => {
      if (newVal) {
        await nextTick()
        inputName.value?.focus()
      }
    })

    return { form, save, loading, inputName }
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
                :class="{'input': true }" v-model="form.name" ref="inputName"/>
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
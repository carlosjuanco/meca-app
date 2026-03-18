<script lang="ts">
import { defineComponent, ref } from 'vue'
import helpers from '../../helpers'

export default defineComponent ({
  name: 'ComunidadForm',
  emits: ['close'],
  props: {
      show: Boolean,
      data: Object
  },
  setup (props, { emit }) {
      let loading = ref(false)
      let form = ref({
          errors: {},
          data: {
              name: '',
              boss: '',
              code: '',
              print_label: 0,
              copies: 0
          }
      })
      
      const { handleRequest, handleErrors } = helpers()

      const save = async () => {
          loading.value = true

          try {
              await handleRequest('post', '/banks', form.value.data, props.data.id)

              emit('close')
          }
          catch (error) {
              form.value.errors = handleErrors(error)
          }
          finally {
              loading.value = false
          }
      }

      return { form, save, loading }
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
      <form @submit.prevent="save">
        <section class="modal-card-body">
          <div class="field">
            <label class="label">
              Comunidad
            </label>
            <div class="control">
              <input type="text" :class="{'input': true, 'is-danger': form.errors.name}" v-model="form.data.name">
            </div>

            <strong class="help is-danger" v-text="form.errors.name" v-if="form.errors.name"></strong>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button type="submit" :class="{'button is-link': true, 'is-loading': loading}">
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
      </form>
    </div>
  </div>
</template>
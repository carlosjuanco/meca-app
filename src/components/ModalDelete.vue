<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import helpers from '../helpers'

export default defineComponent ({
  name: 'ModalDelete',
  props: {
    show: Boolean,
    description: String
  },
  setup() {
    const store = useStore()
    const { handleRequest } = helpers()
    let loading = ref(false)

    const closeModalDelete = () => {
      store.getters.dataFromTheEliminationModel.showModalDelete = false

      store.dispatch('modalDelete', store.getters.dataFromTheEliminationModel)
    }

    const acceptDelete = async () => {
      loading.value = true
      try {
        await handleRequest('delete', store.getters.dataFromTheEliminationModel.route)
      }
      catch (error) {
        console.info(error)
      }
      finally {
        loading.value = false
        store.getters.dataFromTheEliminationModel.showModalDelete = false
        store.getters.dataFromTheEliminationModel.wasItRemovedProperly = true
        store.dispatch('modalDelete', store.getters.dataFromTheEliminationModel)
      }
    }

    return { closeModalDelete, acceptDelete, loading }
  }
})
</script>
<template>
  <div :class="{'modal': true, 'is-active': show }">
    <div class="modal-background" @click="closeModalDelete()"></div>
    <div class="modal-content">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure :class="{'image is-64x64': true, 'animate__animated animate__flash animate__infinite': show }">
              <img src="../assets/figuraPregunta.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                ¿Seguro que desea eliminar <strong v-text="`${description} ?`"></strong> 
              </p>
            </div>
            <div class="buttons">
              <button :class="{'button is-link': true, 'is-loading': loading }"
                @click="acceptDelete()"
                :disabled="loading == true"
              >
                  Aceptar
              </button>
              <button type="button" class="button" @click="closeModalDelete()">
                Cancelar
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModalDelete()"></button>
  </div>
</template>
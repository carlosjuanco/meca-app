<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent ({
  name: 'ModalDelete',
  props: {
      show: Boolean,
      description: String
  },
  setup() {
    const store = useStore()

    const closeModalDelete = () => {
      store.getters.dataFromTheEliminationModel.showModalDelete = false

      store.dispatch('modalDelete', store.getters.dataFromTheEliminationModel)
    }

    const acceptDelete = () => {
      store.getters.dataFromTheEliminationModel.acceptDelete = true
      store.getters.dataFromTheEliminationModel.showModalDelete = false

      store.dispatch('modalDelete', store.getters.dataFromTheEliminationModel)
    }

    return { closeModalDelete, acceptDelete }
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
              <button :class="{'button is-link': true}" @click="acceptDelete()">
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
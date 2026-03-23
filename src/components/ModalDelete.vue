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

    const closeModal = () => {
      store.getters.dataFromTheEliminationModel.showModalDelete = false

      store.dispatch('closeModalDelete', store.getters.dataFromTheEliminationModel)
    }

    return { closeModal }
  }
})
</script>
<template>
  <div :class="{'modal': true, 'is-active': show}">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="modal-content">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64 animate__animated animate__flash animate__infinite">
              <img src="../assets/advertencia.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                ¿Seguro que desea eliminar <strong v-text="`${description} ?`"></strong> 
              </p>
            </div>
            <div class="buttons">
              <button @click="save" :class="{'button is-link': true}">
                  Aceptar
              </button>
              <button type="button" class="button" @click="closeModal()">
                Cancelar
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal()"></button>
  </div>
</template>
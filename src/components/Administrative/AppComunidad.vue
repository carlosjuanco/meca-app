<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import ComunidadForm from './ComunidadForm.vue'

export default defineComponent({
  name: 'AppComunidad',
  components: { ComunidadForm },
  setup () {
    const store = useStore()
    type DataFromTheEliminationModel = {
      id: number;
      description: string;
      showModalDelete: boolean;
      acceptDelete: boolean;
    }
    type CommunityData = {
      id: number;
      name: string;
    }

    let showForm = ref(false)
    let formData: CommunityData = reactive({
      id: 0,
      name: ''
    })
    let communities = reactive<CommunityData[]>([
      { id: 1, name: 'Santa María Peñoles'},
      { id: 2, name: 'Corral de piedras'},
    ])

    const viewForm = (community: CommunityData | null) => {
      if(!community) {
        Object.assign(formData, { id: 0, name: ''})
      }
      Object.assign(formData, community)
      console.info('Que tiene formData.name', formData.name)
        
      showForm.value = true
    }

    const openModalDelete = (data: DataFromTheEliminationModel) => {
      store.dispatch('modalDelete', data)
    }

    watch(() => store.getters.dataFromTheEliminationModel.acceptDelete, (show: boolean) => {
      // descriptionModalDelete.value = store.getters.dataFromTheEliminationModel.description
      console.info(show)
    })
    
    return {
      showForm,
      formData,
      viewForm,
      communities,
      openModalDelete,
    }
  }
})
</script>

<template>
  <div class="columns">
    <div class="column">
      <button class="button is-link is-fullwidth"
        @click="viewForm()">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>Agregar nueva comunidad</span>
      </button>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div class="field has-addons">
        <div class="control is-expanded">
          <input class="input" type="text" placeholder="Buscar comunidad">
        </div>
        <div class="control">
          <button class="button is-info">
            Buscar
          </button>
        </div>
        <p class="control">
          <span class="select">
            <select>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>Todos</option>
            </select>
          </span>
        </p>
      </div>
    </div>
  </div>
  <div class="table-container">
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr class="is-primary">
          <th class="has-text-left">
              Nombre de la comunidad
          </th>
          <th>
              Operaciones
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(community, index) in communities" :key="index">
          <tr :class="`fila-${index}`">
            <td class="has-text-left is-vcentered" v-text="community.name"></td>
            <td class="is-vcentered">
              <button type="button" class="button is-link" @click="viewForm(community)">
                <span class="icon">
                  <i class="fas fa-edit"></i>
                </span>
              </button>
              <button type="button" class="button is-danger" 
                @click="openModalDelete({ id: community.id, description: community.name, showModalDelete: true })">
                <span class="icon">
                  <i class="fas fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr class="has-background-white-bis">
          <td colspan="2">
            <nav class="pagination" role="navigation" aria-label="pagination">
              <a href="#" class="pagination-previous">Antes</a>
              <a href="#" class="pagination-next">Siguiente</a>
              <ul class="pagination-list">
                <li>
                  <a href="#" class="pagination-link" aria-label="Goto page 1">1</a>
                </li>
                <li>
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a href="#" class="pagination-link" aria-label="Goto page 45">45</a>
                </li>
                <li>
                  <a
                    class="pagination-link is-current"
                    aria-label="Page 46"
                    aria-current="page"
                    >46</a
                  >
                </li>
                <li>
                  <a href="#" class="pagination-link" aria-label="Goto page 47">47</a>
                </li>
                <li>
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a href="#" class="pagination-link" aria-label="Goto page 86">86</a>
                </li>
              </ul>
            </nav>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  <comunidad-form
    :show="showForm"
    :data="formData"
    @close="showForm = false"
  ></comunidad-form>
</template>
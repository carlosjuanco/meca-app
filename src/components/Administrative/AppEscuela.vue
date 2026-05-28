<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import TablePagination from '../TablePagination.vue'
import EscuelaForm from './EscuelaForm.vue'
import { useEscuela } from '../composables/useEscuela'

export default defineComponent({
  name: 'AppEscuela',
  components: {
    EscuelaForm,
    TablePagination
  },
  setup() {

    const store = useStore()

    const {
      showForm,
      formData,
      data,
      pagination,
      search,
      itemsPerPage,
      openForm,
      confirmDelete,
      handleRowDeletion,
      onAnimationEnd,
      refreshData,
      fetchData
    } = useEscuela(store)

    // Observar cambios en búsqueda y paginación
    watch([() => search.value, () => itemsPerPage.value], () => {
      refreshData()
    })

    /*
      Observar eliminación desde el store

      Observamos store.getters.dataFromTheEliminationModel.acceptDelete, acepto eliminar y ya se 
        eliminó en la base de datos, ahora eliminamos visualmente.

      @acceptDelete de tipo boolean

      return void
    */
    watch(
      () => store.getters.dataFromTheEliminationModel?.wasItRemovedProperly,
      (wasRemovedProperly: boolean) => {
        const removedId = store.getters.dataFromTheEliminationModel?.id
        if (wasRemovedProperly && removedId) {
          handleRowDeletion(wasRemovedProperly, removedId)
        }
      }
    )
    
    onMounted(() => {
      refreshData()
    })

    return {
      showForm,
      formData,
      data,
      pagination,
      search,
      itemsPerPage,
      openForm,
      confirmDelete,
      onAnimationEnd,
      refreshData,
      fetchData
    }
  }
})
</script>

<template>
  <!-- Título del componente -->
  <h1 class="title has-text-centered">Lista de escuelas</h1>
  <div class="columns">
    <div class="column">
      <button class="button is-link is-fullwidth" @click="openForm(null)">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>Agregar nueva escuela</span>
      </button>
    </div>
  </div>

  <!-- Búsqueda y filtros -->
  <div class="field has-addons">
    <div class="control is-expanded">
      <input
        class="input"
        type="text"
        placeholder="Buscar escuela"
        v-model="search"
      >
    </div>

    <div class="control">
      <button class="button is-info" @click="refresh()">
        Buscar
      </button>
    </div>

    <div class="control">
      <span class="select">
        <select v-model="itemsPerPage">
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>Todos</option>
        </select>
      </span>
    </div>
  </div>

  <!-- Tabla -->
  <div class="table-container">
    <table class="table is-fullwidth is-striped is-bordered">
      <thead>
        <tr class="is-primary">
          <th>Nombre de la escuela</th>
          <th>Clave</th>
          <th>Tipo escuela</th>
          <th>Localidad</th>
          <th>N/P</th>
          <th width="5%">Operaciones</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="escuela in data" :key="escuela.id">
          <tr
            v-show="!escuela.hideRow"
            :class="{ 'animate__animated animate__bounceOut': escuela.animateDisappearRow }"
            @animationend="onAnimationEnd(escuela)"
          >
            <td v-text="escuela.name"></td>
            <td v-text="escuela.key"></td>
            <td v-text="escuela.type_of_school"></td>
            <td v-text="escuela.name_community"></td>
            <td v-text="escuela.secondary_number"></td>

            <td>
              <button class="button is-link" @click="openForm(escuela)">
                <span class="icon">
                  <i class="fas fa-edit"></i>
                </span>
              </button>

              <button
                class="button is-danger"
                @click="confirmDelete(escuela)"
              >
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
          <td colspan="6">
            <!-- Paginador -->
            <table-pagination
              :pagination="pagination"
              @getData="fetchData"
            />
          </td>
        </tr>
      </tfoot>

    </table>
  </div>

  <!-- Modal del formulario -->
  <escuela-form
    :show="showForm"
    :data="formData"
    @close="showForm = false, refreshData()"
  />

</template>
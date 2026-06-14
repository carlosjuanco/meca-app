<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue'
import TablePagination from '../TablePagination.vue'
import InternalNotification from '../InternalNotification.vue'
import ComunidadForm from './ComunidadForm.vue'
import { useComunidad } from '../composables/useComunidad'

export default defineComponent({
  name: 'AppComunidad',
  components: {
    ComunidadForm,
    TablePagination,
    InternalNotification,
  },
  setup () {
    const {
      showForm,
      formData,
      data,
      pagination,
      search,
      itemsPerPage,
      openForm,
      confirmDelete,
      dataInternalNotification,
      showModalInternalNotification,
      onAnimationEnd,
      refreshData,
      fetchData
    } = useComunidad()
    
    // Observar cambios en búsqueda y paginación
    watch([() => search.value, () => itemsPerPage.value], () => {
      refreshData()
    })
    
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
      dataInternalNotification,
      showModalInternalNotification,
      onAnimationEnd,
      refreshData,
      fetchData
    }
  }
})
</script>

<template>
  <!-- Título del componente -->
  <h1 class="title has-text-centered">Lista de comunidades</h1>
  <!-- Botón principal -->
  <div class="columns">
    <div class="column">
      <button class="button is-link is-fullwidth" @click="openForm(null)">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>Agregar nueva comunidad</span>
      </button>
    </div>
  </div>

  <!-- Búsqueda y filtros -->
  <div class="field has-addons">
    <div class="control is-expanded">
      <input 
        class="input" 
        type="text" 
        placeholder="Buscar comunidad" 
        v-model="search"
      >
    </div>
    <div class="control">
      <button class="button is-info" @click="refreshData()">
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

  <!-- Tabla de datos -->
  <div class="table-container">
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr class="is-primary">
          <th class="has-text-left" width="80%">Nombre de la comunidad</th>
          <th class="is-vcentered" width="20%">Operaciones</th>
         </tr>
      </thead>
      <tbody>
        <template v-for="comunidad in data" :key="comunidad.id">
          <tr
            v-show="!comunidad.hideRow" 
            :class="{ 'animate__animated animate__bounceOut': comunidad.animateDisappearRow }"
            @animationend="onAnimationEnd(comunidad)"
          >
            <td class="has-text-left is-vcentered" v-text="comunidad.name"></td>
            <td>
              <button type="button" class="button is-link" @click="openForm(comunidad)">
                <span class="icon"><i class="fas fa-edit"></i></span>
              </button>

              <button 
                type="button" 
                class="button is-danger" 
                @click="confirmDelete(comunidad)"
              >
                <span class="icon"><i class="fas fa-trash"></i></span>
              </button>
            </td>
           </tr>
        </template>
      </tbody>
      <tfoot>
        <tr class="has-background-white-bis">
          <td colspan="2">
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
  <comunidad-form
    :show="showForm"
    :data="formData"
    @close="showForm = false, refreshData()"
  />

  <!-- Modal para la notificacion interna -->
  <internal-notification
    :show="showModalInternalNotification"
    :data="dataInternalNotification"
    @close="showModalInternalNotification = false, loading = false"
  />
</template>
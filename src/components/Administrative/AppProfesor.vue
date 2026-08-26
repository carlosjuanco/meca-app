<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue'
import TablePagination from '../TablePagination.vue'
import InternalNotification from '../InternalNotification.vue'
import ProfesorForm from './ProfesorForm.vue'
import { useTeacher } from '../composables/useTeacher'
import ProfesorInformacion from './ProfesorInformacion.vue'

export default defineComponent({
  name: 'AppProfesor',
  components: {
    ProfesorForm,
    ProfesorInformacion,
    TablePagination,
    InternalNotification,
  },
  setup() {
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
    } = useTeacher()

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
  <h1 class="title has-text-centered">Lista de profesores</h1>

  <div class="columns">
    <div class="column">
      <button class="button is-link is-fullwidth" @click="openForm(null)">
        <span class="icon"><i class="fas fa-plus"></i></span>
        <span>Agregar nuevo profesor o profesora</span>
      </button>
    </div>
  </div>

  <!-- Búsqueda y filtros  -->
  <div class="field has-addons">
    <div class="control is-expanded">
      <input
        class="input"
        type="text"
        placeholder="Buscar profesor"
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
          <th>Nombre completo</th>
          <th>R.F.C.</th>
          <th width="5%">Operaciones</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="teacher in data" :key="teacher.id">
          <tr
            v-show="!teacher.hideRow"
            :class="{ 'animate__animated animate__bounceOut': teacher.animateDisappearRow }"
            @animationend="endsAnimationOfDisappearingRow(teacher)"
          >
            <!-- 
              ============================================
              MANEJO DE NULOS EN TEMPLATES CON ?? 
              ============================================
              
              DEFINICIÓN OFICIAL (MDN):
              El operador de coalescencia nula (??) es un operador lógico que 
              retorna el operando del lado derecho cuando el izquierdo es 
              null o undefined, y en caso contrario, retorna el operando 
              del lado izquierdo.

              Esto significa que solo reacciona ante dos valores específicos: null y undefined.
              ============================================
            -->

            <td v-text="teacher.name + ' ' + teacher.paternal_surname + ' ' + (teacher.maternal_surname ?? '')"></td>
            <td v-text="teacher.rfc"></td>

            <td>
              <button class="button is-link" @click="openForm(teacher)">
                <span class="icon"><i class="fas fa-edit"></i></span>
              </button>

              <button class="button is-danger"
                @click="confirmDelete(teacher)
              >
                <span class="icon"><i class="fas fa-trash"></i></span>
              </button>

              <button class="button is-info" @click="viewInformation(teacher)">
                <span class="icon"><i class="fas fa-eye"></i></span>
              </button>
            </td>
          </tr>
        </template>
      </tbody>

      <tfoot>
        <tr class="has-background-white-bis">
          <td colspan="3">
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
  <ProfesorForm
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

  <ProfesorInformacion
    :show="showInformation"
    :data="formData"
    @close="showInformation = false"
  />

</template>
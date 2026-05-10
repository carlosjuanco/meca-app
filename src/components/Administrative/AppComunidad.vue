<script lang="ts">
import { defineComponent, ref, reactive, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import helpers from '../../helpers'
import TablePagination from '../TablePagination.vue'
import ComunidadForm from './ComunidadForm.vue'

export default defineComponent({
  name: 'AppComunidad',
  components: {
    ComunidadForm,
    TablePagination
  },
  setup () {
    // Store
    const store = useStore()
    const { handleRequest, handleErrors } = helpers()

    // Definimos la estructura princpal del modal para eliminar
    type DataFromTheEliminationModel = {
      id: number;
      description: string;
      showModalDelete: boolean;
      route?: string;
    }

    // Describir la forma del objeto para almacenar los datos
    type DataModel = {
      id: number;
      name: string;
      animateDisappearRow?: boolean;
      hideRow?: boolean;
    }

    // Describir la forma del objeto del paginador

    type DataModelLink = {
      url: string;
      label: string;
      active: boolean;
    }

    type PaginationModel = {
      current_page: number;
      data: DataModel[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: DataModelLink[];
      next_page_url: string;
      path: string;
      per_page: number;
      prev_page_url: string;
      to: number;
      total: number;
    }

    // Inicializar la variable showForm en false
    let showForm = ref(false)

    // Inicializar los datos del formulario 
    let formData = reactive<DataModel>({
      id: 0,
      name: ''
    })

    let data = reactive<DataModel[]>([])

    // Inicializar los datos para la paginación
    let pagination = ref({} as PaginationModel)

    // Establecer la ruta del componente
    const path = ref(`/communities/`)
    
    /*
      Muestrar el modal para registrar o editar

      @row de tipo DataModel

      return void
    */
    const viewForm = (row: DataModel | null): void => {
      Object.assign(formData, { id: 0, name: '' })

      if(row) {
        Object.assign(formData, row) 
      }
        
      showForm.value = true
    }

    /*
      Mandamos a llamar al método modalDelete, para abrir la modal
        para eliminar.

      @eliminate de tipo DataFromTheEliminationModel

      return void
    */
    const openModalDelete = (eliminate: DataFromTheEliminationModel): void => {
      eliminate.route = `${path.value}${eliminate.id}`

      store.dispatch('modalDelete', eliminate)
    }

    /*
      Identificar en que momento se termina la animación
        cuando termina la animacion ocultamos realmente la fila

      @row de tipo DataModel

      return void
    */
    const endsAnimationOfDisappearingRow = async (row: DataModel) => {
      row.hideRow = true
    }

    /*
      Observamos store.getters.dataFromTheEliminationModel.acceptDelete, para determinar si acepto
        eliminar, si fue el caso, entonces, comenzamos a eliminar para que se muestre que esta 
        siendo eliminado.

      @acceptDelete de tipo boolean

      return void
    */
    watch(() => store.getters.dataFromTheEliminationModel.wasItRemovedProperly, (wasItRemovedProperly: boolean) => {
      if(wasItRemovedProperly) {
        let row = data.find(stranger => stranger.id === store.getters.dataFromTheEliminationModel.id)

        if(row) {
          row.animateDisappearRow = true
        }
      }
    })

    const buildRoute = (): void => {
      formData.id == 0 ? getData(path.value) : getData(`${pagination.value.path}?page=${pagination.value.current_page}`)
    }

    const getData = async (url:string) => {
      try {
          const responses = await handleRequest('get', url)

          data.length = 0 // Limpias el array
          /* 
            Los tres puntos son el operador de propagación (spread operator). Su función es "expandir" o "desempaquetar" los elementos de un array
          */
          data.push(...responses.data) // Añades todos los nuevos elementos

           pagination.value = responses
        } catch (error) {
            handleErrors(error)
        }
    }

    onMounted(() => {
      buildRoute()
    })

    return {
      showForm,
      formData,
      data,
      viewForm,
      openModalDelete,
      endsAnimationOfDisappearingRow,
      buildRoute,
      getData,
      pagination,
    }
  }
})
</script>

<template>
  <!-- Botón principal -->
  <div class="columns">
    <div class="column">
      <button class="button is-link is-fullwidth"
        @click="viewForm(null)">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>Agregar nueva comunidad</span>
      </button>
    </div>
  </div>
  <!-- Búsqueda -->
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" type="text" placeholder="Buscar comunidad">
    </div>
    <div class="control">
      <button class="button is-info">
        Buscar
      </button>
    </div>
    <div class="control">
      <span class="select">
        <select>
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
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr class="is-primary">
          <th class="has-text-left">
              Nombre de la comunidad
          </th>
          <th class="is-vcentered">
              Operaciones
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(stranger) in data" :key="stranger.id">
          <tr
            v-show="!stranger.hideRow" 
            :class="{ 'animate__animated animate__bounceOut': stranger.animateDisappearRow }"
            @animationend="endsAnimationOfDisappearingRow(stranger)"
          >
            <td class="has-text-left is-vcentered" v-text="stranger.name"></td>
            <td>
              <button type="button" class="button is-link" @click="viewForm(stranger)">
                <span class="icon">
                  <i class="fas fa-edit"></i>
                </span>
              </button>

              <button type="button" class="button is-danger" 
                @click="openModalDelete({ 
                  id: stranger.id, 
                  description: stranger.name, 
                  showModalDelete: true 
                })"
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
          <td colspan="2">
            <!-- Paginador -->
            <table-pagination
              :pagination="pagination"
              @getData="getData"
            ></table-pagination>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>

  <!-- Modal del formulario -->
  <comunidad-form
    :show="showForm"
    :data="formData"
    @close="showForm = false, buildRoute()"
  ></comunidad-form>
</template>
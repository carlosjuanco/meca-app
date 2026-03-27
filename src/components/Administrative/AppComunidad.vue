<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import ComunidadForm from './ComunidadForm.vue'

export default defineComponent({
  name: 'AppComunidad',
  components: { ComunidadForm },
  setup () {
    // Store
    const store = useStore()

    // Describir la forma del objeto del modal eliminación
    type DataFromTheEliminationModel = {
      id: number;
      description: string;
      showModalDelete: boolean;
      acceptDelete: boolean;
    }

    // Describir la forma del objeto para almacenar los datos
    type DescribeTheShapeOfTheDataObject = {
      id: number;
      name: string;
      animateDisappearRow: boolean;
      hideRow: boolean;
    }

    // Inicializar la variable showForm en false
    let showForm = ref(false)
    
    // Inicializar los datos del formulario 
    let formData: DescribeTheShapeOfTheDataObject = reactive({
      id: 0,
      name: '',
      animateDisappearRow: false,
      hideRow: false
    })
    /*
        Inicializar communities con dos registros de ejemplos
    */
    let communities = reactive<DescribeTheShapeOfTheDataObject[]>([
      { id: 1, name: 'Santa María Peñoles', animateDisappearRow: false, hideRow: false },
      { id: 2, name: 'Corral de piedras', animateDisappearRow: false, hideRow: false },
    ])
    
    // Muestrar el modal para registrar o editar
    const viewForm = (community: DescribeTheShapeOfTheDataObject | null) => {
      if(!community) {
        Object.assign(formData, { id: 0, name: '', animateDisappearRow: false, hideRow: false })
      }
      Object.assign(formData, community)
        
      showForm.value = true
    }

    /*
      Mandamos a llamar al método modalDelete, para abrir la modal
        para eliminar.
    */
    const openModalDelete = (data: DataFromTheEliminationModel) => {
      store.dispatch('modalDelete', data)
    }

    /*
      Identificar en que momento se termina la animación
        cuando termina la animacion ocultamos realmente la fila
    */
    const endsAnimationOfDisappearingRow = async (community: DescribeTheShapeOfTheDataObject) => {
      community.hideRow = true
    }

    /*
      Observamos store.getters.dataFromTheEliminationModel.acceptDelete, para determinar si acepto
        eliminar, si fue el caso, entonces, comenzamos a eliminar para que se muestra que esta 
        siendo eliminado.
    */
    watch(() => store.getters.dataFromTheEliminationModel.acceptDelete, (acceptDelete: boolean) => {
      if(acceptDelete) {
        let row = communities.find(community => community.id === store.getters.dataFromTheEliminationModel.id)
        if(row) {
          row.animateDisappearRow = true
        }
      }
    })
    
    return {
      showForm,
      formData,
      viewForm,
      communities,
      openModalDelete,
      endsAnimationOfDisappearingRow,
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
          <tr :class="{ 'animate__bounceOut': community.animateDisappearRow,
            'is-hidden': community.hideRow }"
            @animationend="endsAnimationOfDisappearingRow(community)">
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
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import EscuelaForm from './EscuelaForm.vue'

export default defineComponent({
  name: 'AppEscuela',
  components: {
    EscuelaForm
  },
  setup() {

    const store = useStore()

    type DataModel = {
      id: number
      school: string
      code: string
      schoolType: string
      location: string
      progressiveNumber: string
      animateDisappearRow: boolean
      hideRow: boolean
    }

    type DataFromTheEliminationModel = {
      id: number
      description: string
      showModalDelete: boolean
      acceptDelete: boolean
    }

    const showForm = ref(false)

    const formData = reactive<DataModel>({
      id: 0,
      school: '',
      code: '',
      schoolType: '',
      location: '',
      progressiveNumber: '',
      animateDisappearRow: false,
      hideRow: false
    })

    const data = reactive<DataModel[]>([
      {
        id: 1,
        school: "Redencion",
        code: "20DPB0239T",
        schoolType: "Primaria",
        location: "San Juan Monteflor",
        progressiveNumber: "1",
        animateDisappearRow: false,
        hideRow: false
      },
      {
        id: 2,
        school: "Jose Maria Morelos y Pavon",
        code: "20DCC2082S",
        schoolType: "Preescolar",
        location: "Cañada de Hielo",
        progressiveNumber: "3",
        animateDisappearRow: false,
        hideRow: false
      }
    ])

    const viewForm = (row: DataModel | null): void => {
      Object.assign(formData, {
        id: 0,
        school: '',
        code: '',
        schoolType: '',
        location: '',
        progressiveNumber: '',
        animateDisappearRow: false,
        hideRow: false
      })

      if (row) {
        Object.assign(formData, row)
      }

      showForm.value = true
    }

    const openModalDelete = (eliminate: DataFromTheEliminationModel): void => {
      store.dispatch('modalDelete', eliminate)
    }

    const endsAnimationOfDisappearingRow = async (row: DataModel) => {
      row.hideRow = true
    }

    watch(
      () => store.getters.dataFromTheEliminationModel.acceptDelete,
      (acceptDelete: boolean) => {
        if (acceptDelete) {
          let row = data.find(
            stranger => stranger.id === store.getters.dataFromTheEliminationModel.id
          )

          if (row) {
            row.animateDisappearRow = true
          }
        }
      }
    )

    return {
      showForm,
      formData,
      data,
      viewForm,
      openModalDelete,
      endsAnimationOfDisappearingRow
    }
  }
})
</script>

<template>

  <div class="columns">
    <div class="column">
      <button class="button is-link is-fullwidth" @click="viewForm(null)">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>Agregar nueva escuela</span>
      </button>
    </div>
  </div>

  <!-- Búsqueda -->
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" type="text" placeholder="Buscar escuela">
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
    <table class="table is-fullwidth is-striped is-bordered">
      <thead>
        <tr class="is-primary">
          <th>Nombre de la escuela</th>
          <th>Clave</th>
          <th>Tipo escuela</th>
          <th>Localidad</th>
          <th>N/P</th>
          <th>Operaciones</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="stranger in data" :key="stranger.id">
          <tr
            v-show="!stranger.hideRow"
            :class="{ 'animate__animated animate__bounceOut': stranger.animateDisappearRow }"
            @animationend="endsAnimationOfDisappearingRow(stranger)"
          >
            <td v-text="stranger.school"></td>
            <td v-text="stranger.code"></td>
            <td v-text="stranger.schoolType"></td>
            <td v-text="stranger.location"></td>
            <td v-text="stranger.progressiveNumber"></td>

            <td>
              <button class="button is-link" @click="viewForm(stranger)">
                <span class="icon">
                  <i class="fas fa-edit"></i>
                </span>
              </button>

              <button
                class="button is-danger"
                @click="openModalDelete({
                  id: stranger.id,
                  description: stranger.school,
                  showModalDelete: true,
                  acceptDelete: false
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
          <td colspan="6">
            <nav class="pagination" role="navigation">
              <a href="#" class="pagination-previous">Antes</a>
              <a href="#" class="pagination-next">Siguiente</a>
              <ul class="pagination-list">
                <li><a href="#" class="pagination-link">1</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a href="#" class="pagination-link">45</a></li>
                <li><a class="pagination-link is-current">46</a></li>
                <li><a href="#" class="pagination-link">47</a></li>
              </ul>
            </nav>
          </td>
        </tr>
      </tfoot>

    </table>
  </div>

  <!-- Modal -->
  <EscuelaForm
    :show="showForm"
    :data="formData"
    @close="showForm = false"
  />

</template>
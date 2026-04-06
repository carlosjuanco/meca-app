<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import ProfesorForm from './ProfesorForm.vue'

export default defineComponent({
  name: 'AppProfesor',
  components: {
    ProfesorForm
  },
  setup() {

    const store = useStore()

    type DataModel = {
      id: number
      name: string
      lastNameFather: string
      lastNameMother: string
      curp: string
      rfc: string
      sex: string
      budgetKey: string
      function: string
      school: string
      phone: number
      reason: number
      admissionDate: string
      studyProfile: string
      language: string
      languageVariant: string
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
      name: '',
      lastNameFather: '',
      lastNameMother: '',
      curp: '',
      rfc: '',
      sex: '',
      budgetKey: '',
      function: '',
      school: '',
      phone: 0,
      reason: 0,
      admissionDate: '',
      studyProfile: '',
      language: '',
      languageVariant: '',
      animateDisappearRow: false,
      hideRow: false
    })

    const data = reactive<DataModel[]>([
      {
        id: 1,
        name: "Gloria",
        lastNameFather: "Garcia",
        lastNameMother: "Ramirez",
        curp: "GARG6604092aa6",
        rfc: "GARG6604092a6",
        sex: "Femenino",
        budgetKey: "11072005F04808000200006",
        function: "Administrativo",
        school: "Jose Maria Morelos y Pavon",
        phone: 9511028751,
        reason: 89,
        admissionDate: "10/04/2000",
        studyProfile: "Titulado de U.P.N.",
        language: "Mixteca",
        languageVariant: "Baja",
        animateDisappearRow: false,
        hideRow: false
      },
      {
        id: 2,
        name: "Eloy",
        lastNameFather: "Rojas",
        lastNameMother: "Perez",
        curp: "LUMS720504HOCSRL00",
        rfc: "LUMS720504LWA",
        sex: "Masculino",
        budgetKey: "8729E1485000201291",
        function: "Administrativo",
        school: "Redencion",
        phone: 9511204965,
        reason: 90,
        admissionDate: "30/01/2010",
        studyProfile: "Titulado de U.P.N.",
        language: "Mixteca",
        languageVariant: "Baja",
        animateDisappearRow: false,
        hideRow: false
      }
    ])

    const viewForm = (row: DataModel | null): void => {
      Object.assign(formData, {
        id: 0,
        name: '',
        lastNameFather: '',
        lastNameMother: '',
        curp: '',
        rfc: '',
        sex: '',
        budgetKey: '',
        function: '',
        school: '',
        phone: 0,
        reason: 0,
        admissionDate: '',
        studyProfile: '',
        language: '',
        languageVariant: '',
        animateDisappearRow: false,
        hideRow: false
      })

      if (row) Object.assign(formData, row)

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
          if (row) row.animateDisappearRow = true
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
        <span class="icon"><i class="fas fa-plus"></i></span>
        <span>Agregar nuevo profesor o profesora</span>
      </button>
    </div>
  </div>

  <!-- Búsqueda -->
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" type="text" placeholder="Buscar profesor">
    </div>

    <div class="control">
      <button class="button is-info">Buscar</button>
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
          <th>Nombre completo</th>
          <th>R.F.C.</th>
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
            <td v-text="stranger.name + ' ' + stranger.lastNameFather + ' ' + stranger.lastNameMother"></td>
            <td v-text="stranger.rfc"></td>

            <td>
              <button class="button is-link" @click="viewForm(stranger)">
                <span class="icon"><i class="fas fa-edit"></i></span>
              </button>

              <button class="button is-danger"
                @click="openModalDelete({
                  id: stranger.id,
                  description: stranger.name,
                  showModalDelete: true,
                  acceptDelete: false
                })">
                <span class="icon"><i class="fas fa-trash"></i></span>
              </button>

              <button class="button is-info">
                <span class="icon"><i class="fas fa-eye"></i></span>
              </button>
            </td>
          </tr>
        </template>
      </tbody>

      <tfoot>
        <tr class="has-background-white-bis">
          <td colspan="3">
            <!-- mismo paginador -->
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

  <ProfesorForm
    :show="showForm"
    :data="formData"
    @close="showForm = false"
  />

</template>
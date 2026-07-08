<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ModalDetail from './ModalDetail.vue'
import ProfesorInformacion from './ProfesorInformacion.vue'

export default defineComponent({
  name: 'ReportePorComunidad',
  components: {
    ModalDetail,
    ProfesorInformacion
  },
  setup() {

    type TeacherDataModel = {
      id: number
      name: string
      lastNameFather: string
      lastNameMother: string
      curp?: string
      rfc?: string
      sex?: string
      budgetKey?: string
      function?: string
      school?: string
      phone?: number
      reason?: number
      admissionDate?: string
      studyProfile?: string
      language?: string
      languageVariant?: string
    }

    type DataModel = {
      id: number
      nameCommunity: string
      // Primarias
      primarySchools: string
      primaryKey: string
      elementarySchoolTeachers: string
      progressivePrimarySchoolNumbers: number
      primaryStaff: TeacherDataModel[]
      // preescolares
      preschools: string
      preschoolKey: string
      preschoolTeachers: string
      preschoolNumberProgression: number
      preschoolStaff: TeacherDataModel[]
      // Educación inicial
      earlyChildhoodEducation: string
      initialKey: string
      earlyChildhoodEducationTeachers: string
      initialStaff: TeacherDataModel[]
      // Albergues
      schoolDormitories: string
      keyHostels: string
      schoolDormitoryDirectors: string
      shelterStaff: TeacherDataModel[]
    }

    const showModal = ref(false)
    const showInformation = ref(false)

    const formData = reactive({} as DataModel)
    const teacherFormData = reactive({} as TeacherDataModel)

    const data = reactive<DataModel[]>([
      {
        id: 1,
        nameCommunity: 'San Juan Monteflor',
        primarySchools: 'Redencion',
        primaryKey: '0239T',
        elementarySchoolTeachers: 'Pedro Mejia Caballero',
        progressivePrimarySchoolNumbers: 1,
        primaryStaff: [{
          id: 1,
          name: 'Gloria',
          lastNameFather: 'Garcia',
          lastNameMother: 'Ramirez'
        }],
        preschools: 'Miguel Hidalgo',
        preschoolKey: '0460P',
        preschoolTeachers: 'Julia A. Hernandez Santiago',
        preschoolNumberProgression: 0,
        preschoolStaff: [{
          id: 2,
          name: 'Gloria',
          lastNameFather: 'Garcia',
          lastNameMother: 'Ramirez'
        }],
        earlyChildhoodEducation: '',
        initialKey: '20DIN',
        earlyChildhoodEducationTeachers: '',
        initialStaff: [{
          id: 3,
          name: 'Gloria',
          lastNameFather: 'Jimenez',
          lastNameMother: 'Jimenez'
        }],
        schoolDormitories: 'Redencion',
        keyHostels: '20TA10124A',
        schoolDormitoryDirectors: 'Casto Ines Sanchez',
        shelterStaff: [{
          id: 4,
          name: 'Iris',
          lastNameFather: 'Garcia',
          lastNameMother: 'Garcia'
        }]
      },
      {
        id: 2,
        nameCommunity: 'Santa Maria Peñoles',
        primarySchools: 'Redencion',
        primaryKey: '0450N',
        elementarySchoolTeachers: 'Eloy Rojas Perez',
        progressivePrimarySchoolNumbers: 2,
        primaryStaff: [{
          id: 5,
          name: 'Vilma',
          lastNameFather: 'Ramirez',
          lastNameMother: 'Ramirez'
        }],
        preschools: 'Juan Amos Comenio',
        preschoolKey: '04610',
        preschoolTeachers: 'Nashielly Martinez Vel',
        preschoolNumberProgression: 0,
        preschoolStaff: [{
          id: 6,
          name: 'Ramon',
          lastNameFather: 'Garcia',
          lastNameMother: 'Ramirez'
        }],
        earlyChildhoodEducation: '',
        initialKey: '',
        earlyChildhoodEducationTeachers: '',
        initialStaff: [{
          id: 7,
          name: 'Lenin',
          lastNameFather: 'Jimenez',
          lastNameMother: 'Jimenez'
        }],
        schoolDormitories: 'Redencion',
        keyHostels: 'TA10293W',
        schoolDormitoryDirectors: 'Gustavo E. Rojas',
        shelterStaff: [{
          id: 8,
          name: 'Denis',
          lastNameFather: 'Garcia',
          lastNameMother: 'Garcia'
        }]
      }
    ])

    const detail = (row: DataModel ): void => {
      if (row) Object.assign(formData, row)

      console.info('Ver la informacion de formData', formData)

      showModal.value = true
    }

    const viewInformation = (row: TeacherDataModel ): void => {
      console.info('3 meses sin garantia')
      if (row) Object.assign(teacherFormData, row)

      showInformation.value = true
    }

    return { 
      data,
      formData,
      showModal,
      detail,
      showInformation,
      viewInformation,
      teacherFormData
    }
  }
})
</script>

<template>
  <!-- Tabla -->
  <div class="table-container">
    <table class="table is-fullwidth is-striped is-bordered">
      <thead>
        <tr class="is-primary">
          <th>Comunidades</th>
          <th>Primaria 20DPB</th>
          <th>Directivos</th>
          <th>N/P</th>
          <th>Preescolar 20DCC</th>
          <th>Directivos</th>
          <th>N/P</th>
          <th>Educación inicial</th>
          <th>Directivos</th>
          <th>Albergues escolares</th>
          <th>Jefes</th>
          <th>Detalles</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="stranger in data" :key="stranger.id">
          <tr>
            <td v-text="stranger.nameCommunity"></td>
            <td>
              <p v-text="stranger.primarySchools"></p>
              <p v-text="stranger.primaryKey"></p>
            </td>
            <td v-text="stranger.elementarySchoolTeachers"></td>
            <td v-text="stranger.progressivePrimarySchoolNumbers"></td>
            <td>
              <p v-text="stranger.preschools"></p>
              <p v-text="stranger.preschoolKey"></p>
            </td>
            <td v-text="stranger.preschoolTeachers"></td>
            <td v-text="stranger.preschoolNumberProgression"></td>
            <td>
              <p v-text="stranger.earlyChildhoodEducation"></p>
              <p v-text="stranger.initialKey"></p>
            </td>
            <td v-text="stranger.earlyChildhoodEducationTeachers"></td>
            <td>
              <p v-text="stranger.schoolDormitories"></p>
              <p v-text="stranger.keyHostels"></p>
            </td>
            <td v-text="stranger.schoolDormitoryDirectors"></td>

            <td>
              <button class="button is-info" @click="detail(stranger)">
                <span class="icon"><i class="fas fa-eye"></i></span>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <!-- Modal de detalles -->
  <ModalDetail
    :show="showModal"
    :data="formData"
    @close="showModal = false"
    @openTeacherInformationModal="viewInformation"
  />

  <!-- Modal de información de un profesor -->
  <ProfesorInformacion
    :show="showInformation"
    :data="teacherFormData"
    @close="showInformation = false"
  />
</template>

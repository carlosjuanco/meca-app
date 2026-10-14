<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import helpers from '../../helpers'
// import CommunityDetails from './CommunityDetails.vue'
// import ProfesorInformacion from './ProfesorInformacion.vue'

export default defineComponent({
  name: 'ReportePorComunidad',
  // components: {
  //   CommunityDetails,
  // },
  setup() {
    const { 
      handleRequest,
      handleErrors,
      phoneTransform,
    } = helpers()

    type DataModel = {
      nombreComunidad: string
      // Primarias
      primaria: string
      claveEscuelaPrimaria: string
      directivoPrimaria: string
      telefonoDelProfesorDeLaPrimaria: string
      numeroProgresivoPrimaria: number
      // preescolares
      preescolar: string
      claveEscuelaPreescolar: string
      directivoPreescolar: string
      telefonoDelProfesorDePreescolar: string
      numeroProgresivoPreescolar: string
      // Educación inicial
      inicial: string
      claveEscuelaInicial: string
      directivoInicial: string
      telefonoDelProfesorDeInicial: string
      // Albergues
      albergueEscolar: string
      claveEscuelaAlbergueEscolar: string
      directivoAlbergueEscolar: string
      telefonoDelProfesorDelAlbergueEscolar: string
    }

    // const showCommunityDetails = ref(false)
    // const showInformation = ref(false)

    const data = reactive<DataModel[]>([])

    // Obtener reporte por comunidad
    const getReportByCommunity = async () => {
      try {
        const response = await handleRequest('get', `teachers`)

        // Transformar el teléfono en el formato xxx xxx xxxx
        response.forEach((row: DataModel) => {
          if (row.telefonoDelProfesorDeLaPrimaria) {
            row.telefonoDelProfesorDeLaPrimaria = phoneTransform(row.telefonoDelProfesorDeLaPrimaria.toString()).toString();
          }
          if (row.telefonoDelProfesorDePreescolar) {
            row.telefonoDelProfesorDePreescolar = phoneTransform(row.telefonoDelProfesorDePreescolar.toString()).toString();
          }

          if (row.telefonoDelProfesorDeInicial) {
            row.telefonoDelProfesorDeInicial = phoneTransform(row.telefonoDelProfesorDeInicial.toString()).toString();
          }

          if (row.telefonoDelProfesorDelAlbergueEscolar) {
            row.telefonoDelProfesorDelAlbergueEscolar = phoneTransform(row.telefonoDelProfesorDelAlbergueEscolar.toString()).toString();
          }
        });
        
        /*
          Reiniciar el array manteniendo la reactividad
          Los tres puntos son el operador de propagación (spread operator).
            Su función es "expandir" o "desempaquetar" los elementos de un array
        */
        data.splice(0, data.length, ...response)
      } catch (error) {
        console.info(handleErrors(error))
      }
    }

    // const detail = (row: DataModel ): void => {
    //   if (row) Object.assign(formData, row)

    //   console.info('Ver la informacion de formData', formData)

    //   showCommunityDetails.value = true
    // }

    // const viewInformation = (row: TeacherDataModel ): void => {
    //   console.info('3 meses sin garantia')
    //   if (row) Object.assign(teacherFormData, row)

    //   showInformation.value = true
    // }

    onMounted(() => {
      getReportByCommunity()
    })

    return { 
      data
    }
  }
})
</script>

<template>
  <!-- Título del componente -->
  <h1 class="title has-text-centered">Reporte por comunidad</h1>
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
        <template v-for="reporte in data" :key="reporte.id">
          <tr>
            <td v-text="reporte.nombreComunidad"></td>
            <td>
              <p v-text="reporte.primaria"></p>
              <p v-text="reporte.claveEscuelaPrimaria"></p>
            </td>
            <td>
              <p v-text="reporte.directivoPrimaria"></p>
              <p v-text="reporte.telefonoDelProfesorDeLaPrimaria"></p>
            </td>
            <td v-text="reporte.numeroProgresivoPrimaria"></td>
            <td>
              <p v-text="reporte.preescolar"></p>
              <p v-text="reporte.claveEscuelaPreescolar"></p>
            </td>
            <td>
              <p v-text="reporte.directivoPreescolar"></p>
              <p v-text="reporte.telefonoDelProfesorDePreescolar"></p>
            </td>
            <td v-text="reporte.numeroProgresivoPreescolar"></td>
            <td>
              <p v-text="reporte.inicial"></p>
              <p v-text="reporte.claveEscuelaInicial"></p>
            </td>
            <td>
              <p v-text="reporte.directivoInicial"></p>
              <p v-text="reporte.telefonoDelProfesorDeInicial"></p>
            </td>
            <td>
              <p v-text="reporte.albergueEscolar"></p>
              <p v-text="reporte.claveEscuelaAlbergueEscolar"></p>
            </td>
            <td>
              <p v-text="reporte.directivoAlbergueEscolar"></p>
              <p v-text="reporte.telefonoDelProfesorDelAlbergueEscolar"></p>
            </td>

            <td>
              <button class="button is-info">
                <span class="icon"><i class="fas fa-eye"></i></span>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <!-- Modal de detalles -->
  <!-- <CommunityDetails
    :show="showCommunityDetails"
    :data="formData"
    @close="showCommunityDetails = false"
    @openTeacherInformationModal="viewInformation"
  /> -->
</template>

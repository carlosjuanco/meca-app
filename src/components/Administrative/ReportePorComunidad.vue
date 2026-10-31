<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import helpers from '../../helpers'
import type { DataModel } from '../types/reportePorComunidad'
import CommunityDetails from './CommunityDetails.vue'

export default defineComponent({
  name: 'ReportePorComunidad',
  components: { CommunityDetails },
  setup() {
    const { 
      handleRequest,
      handleErrors,
      phoneTransform,
    } = helpers()

    const showCommunityDetails = ref(false)
    // const showInformation = ref(false)

    const data = reactive<DataModel[]>([])
    const dataCommunityDetails = reactive({} as DataModel)

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
        })
        
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

    /**
     * [Descripción breve de qué hace Object.assign()]
     * 
     * [Descripción detallada: realiza una copia superficial (shallow copy)]
     *
     * @param {Object} target - El objeto destino que recibirá las propiedades y será modificado.
     * @param {...Object} sources - Uno o más objetos origen que contienen las propiedades a copiar.
     * @returns {Object} El objeto destino (target) ya modificado.
     * 
     * @see {@link https://mozilla.org|MDN Web Docs - Object.assign()}
     * 
     * @example
     * // [Ejemplo breve de uso]
     * const destino = {};
     * const origen = { a: 1 };
     * Object.assign(destino, origen);
     */

    const showModalCommunityDetails = (row: DataModel ): void => {
      Object.assign(dataCommunityDetails, row)

      showCommunityDetails.value = true
    }

    onMounted(() => {
      getReportByCommunity()
    })

    return { 
      data,
      showCommunityDetails,
      showModalCommunityDetails,
      dataCommunityDetails
    }
  }
})
</script>

<template>
  <!-- Título del componente -->
  <h1 class="title has-text-centered">Reporte por comunidad</h1>
  <!-- Tabla -->
  <div class="table-container">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth data-reporte-por-comunidad-table">
      <thead>
        <tr class="is-info">
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
              <button class="button is-info" @click="showModalCommunityDetails(reporte)">
                <span class="icon"><i class="fas fa-eye"></i></span>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <!-- Modal de detalles -->
  <community-details
    :show="showCommunityDetails"
    :data="dataCommunityDetails"
    @close="showCommunityDetails = false"
  />
</template>

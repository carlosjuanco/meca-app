<script lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import helpers from '../../helpers'

export default {
  name: "InformeMesSeleccionado",
  setup() {
    const route = useRoute()
    const { handleErrors, handleRequest, handleMultipleRequests } = helpers()
    let monthId = ref(route.params.month_id)
    let nameMonth = ref('')

    interface Month {
      id: number,
      month: string,
      status: string, 
      anio: number, 
      month_id: number,
      human_id: number, 
      created_at: string,
      updated_at: string,
      deleted_at: string | null
    }

    interface Concept {
      id: number,
      concept: string,
      totalWeek?: number,
      totalByConcept?: number,
    }

    interface Churche {
      id: number,
      name: string,
      concept: Concept
    }

    let concepts: Concept[] = reactive<Concept[]>([])

    let churches: Churche[] = reactive<Churche[]>([])
    let previousMonth: Churche[] = reactive<Churche[]>([])
    let districtTotal: Churche[] = reactive<Churche[]>([])

    /*
      Obtener por cada iglesia la sumatoria de todas las semanas del mes seleccionado

      -Asignamos todos los registros obtenidos de la ruta "getForEachChurchTheSumOfAllTheWeeksOfTheMonthSelected" 
        a la variable "churches".
        -Si el nombre de la iglesia es igual a "Total distrital", entonces agregamos esos datos 
          a la variable "districtTotal"
        -Si el nombre de la iglesia es igual a "Anterior", entonces agregamos esos datos
          a la variable "previousMonth".
        -De lo contrario asignamos los datos a la variable "churches"

      return void
    */
    const getForEachChurchTheSumOfAllTheWeeksOfTheMonthSelected = async () => {
      try {
        const response = await handleRequest('put', `/getForEachChurchTheSumOfAllTheWeeksOfTheMonthSelected/`, {}, Number(monthId.value))

        response.churches.map(function (churche: Churche) {
          if(churche.name == 'Total distrital') {
            districtTotal.splice(districtTotal.length, 0, churche);
          } else if(churche.name == 'Anterior') {
            previousMonth.splice(previousMonth.length, 0, churche);
          } else {
            churches.splice(churches.length, 0, churche);
          }
        })
      } catch (error) {
          handleErrors(error)
      }
    }

    /*
        Realizar dos peticiones en una sola petición
        La primera para obtener todos los conceptos.
        La segunda para obtener todos los meses

        -Asignamos todos los conceptos obtenidos, a la variable "concepts", para que sea reactivo.
        -Cuando termine la petición "getMonths", buscamos el ID de la variable "monthId", el valor resultante, le asignamos el nombre del mes a la variable "nameMonth".

        return void
      */
    const getData = async () => {
      try {
        const responses = await handleMultipleRequests([`/getConcepts/`, `/getMonths/`])

        concepts.push({
          id: 0,
          concept: 'IGLESIAS'
        });

        responses[0].concepts.map(function (concept: Concept) {
          concepts.splice(concepts.length, 0, concept);
        })

        nameMonth.value = (responses[1].months.find((month: Month) => month.id == Number(monthId.value))).month
      }
      catch (error) {
          handleErrors(error)
      }
    }

    onMounted(() => {
      getData()
      getForEachChurchTheSumOfAllTheWeeksOfTheMonthSelected()
    })

    return {
      concepts,
      churches,
      previousMonth,
      districtTotal,
      nameMonth,
    }
  }
}
</script>

<template>
  <div class="table-container">
    <p class="title is-1 has-text-centered mt-1">Informe de las iglesias del distrito de las flores </p>
    <p class="subtitle is-2 has-text-centered mt-1" v-text="`Mes de ${nameMonth}`"></p>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr class="is-light">
          <th v-for="(concept, index) in concepts" :key="index" v-text="concept.concept"></th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(church, index) in churches" :key="index">
        <td v-text="church.name"></td>
        <td v-for="(concept, indexConcept) in church.concept" :key="indexConcept" v-text="concept.totalWeek"></td>
      </tr>
      <tr v-for="(church, index) in previousMonth" :key="index" class="is-light">
        <td v-text="church.name"></td>
        <td v-for="(concept, indexConcept) in church.concept" :key="indexConcept" v-text="concept.totalByConcept"></td>
      </tr>
      <tr v-for="(church, index) in districtTotal" :key="index" class="is-light">
        <td v-text="church.name"></td>
        <td v-for="(concept, indexConcept) in church.concept" :key="indexConcept" v-text="concept.totalByConcept"></td>
      </tr>
    </tbody>
    </table>
  </div>
</template>
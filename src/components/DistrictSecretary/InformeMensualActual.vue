<script lang="ts">
import { onMounted, reactive } from 'vue'
import helpers from '../../helpers'

export default {
  name: 'InformeMensualActual',
  setup() {
    const { handleErrors, handleMultipleRequests } = helpers()

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

    let concepts: Concept[] = reactive<Concept[]>([]);

    let churches: Churche[] = reactive<Churche[]>([]);
    let previousMonth: Churche[] = reactive<Churche[]>([]);
    let districtTotal: Churche[] = reactive<Churche[]>([]);

    /*
      Realizar dos peticiones en una sola petición
      La primera para obtener todos los conceptos.
      La segunda es para obtener por cada iglesia la sumatoria de todas las semanas del mes aperturado

      -Asignamos todos los conceptos obtenidos, a la variable "concepts", para que sea reactivo.
      -Asignamos todos los registros obtenidos de la ruta "getForEachChurchTheSumOfAllTheWeeksOfTheMonthOpened" 
        a la variable "churches".
        -Si el nombre de la iglesia es igual a "Total distrital", entonces agregamos esos datos 
          a la variable "districtTotal"
        -Si el nombre de la iglesia es igual a "Anterior", entonces agregamos esos datos
          a la variable "previousMonth".
        -De lo contrario asignamos los datos a la variable "churches"

      return void
    */
    const getData = async () => {
      try {
        const responses = await handleMultipleRequests([`/getConcepts/`,
         `/getForEachChurchTheSumOfAllTheWeeksOfTheMonthOpened/`])

        concepts.push({
          id: 0,
          concept: 'IGLESIAS'
        });

        responses[0].concepts.map(function (concept: Concept) {
          concepts.splice(concepts.length, 0, concept);
        })

        responses[1].churches.map(function (churche: Churche) {
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

    onMounted(() => {
      getData()
    })

    return {
      concepts,
      churches,
      previousMonth,
      districtTotal
    }
  }
}
</script>

<template>
<div class="table-container">
  <p class="title is-1 has-text-centered mt-1">INFORME DE LAS IGLESIAS DEL DISTRITO DE LAS FLORES</p>
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

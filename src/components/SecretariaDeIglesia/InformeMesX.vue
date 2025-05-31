<script lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import helpers from '../../helpers'

export default {
  name: 'InformeMesX',
  setup() {
    const route = useRoute();
    const store = useStore()
    const { handleErrors, handleRequest } = helpers()
    const nameIglesia: string = store.getters.user.churchToWhichItBelongs
    let month_id = ref(route.params.month_id)

    interface Concept {
      id: number,
      concept: string,
    }

    interface Weeks {
      id: number
      value: number,
      concept_id: number,
      churche_id: number,
      month_id: number,
      human_id: number,
      week: number,
      status: 'Cerrado' | 'Abierto',
    }

    interface Nameweek {
      name: string,
      terminate_or_enable: string,
    }

    const totalWeeks = [
      "Primera semana",
      "Segunda semana",
      "Tercera semana",
      "Cuarta semana"
    ]

    let concepts = reactive<Concept[]>([{
      id: 0,
      concept: '',
    }])
    let name_weeks = reactive<Nameweek[]>([
      { name: "primeraSemana", terminate_or_enable: 'Terminar semana' },
      { name: "segundaSemana", terminate_or_enable: 'Terminar semana' },
      { name: "terceraSemana", terminate_or_enable: 'Terminar semana' },
      { name: "cuartaSemana", terminate_or_enable: 'Terminar semana' },
    ])
    type SemanaClave = 'primeraSemana' | 'segundaSemana' | 'terceraSemana' | 'cuartaSemana';
    type Mes = Partial<Record<SemanaClave, Weeks[]>>
    let churche_concepts = reactive<Mes>({})
    const weeksAdded = ref(Object.keys(churche_concepts).length)

    /*
      Exportar en PDF los datos de las semanas capturas.

      return void
    */

    const monthlyReportOfTheChurchSecretary = async () => {
      try {
        const responses = await handleRequest('put', `/monthlyReportOfTheChurchSecretary/`, {}, Number(month_id.value))
        window.open(`http://localhost:8082/storage/${responses.file}`, '_blank')
      } catch (error) {
        handleErrors(error)
      }
    }

    /*
      Deshabilitar o habilitar los campos, si deshabilitamos significa que terminamos la semana.
      Si habilitamos, nos hizo falta algo.

      @semana: SemanaClave Solo recibe los posibles valores "'primeraSemana' | 'segundaSemana' | 'terceraSemana' | 'cuartaSemana'"
        también puede recibir un valor undefined.
      @terminate_or_enable: string Recibe dos posibles valores "'Habilitar semana' | 'Terminar semana'".

      return void
    */

    const endOfTheWeek = (semana: SemanaClave | undefined, terminate_or_enable: string) => {
      if(typeof semana == "string"){
        name_weeks.forEach((week: Nameweek) => {
          if(week.name == semana) {
            week.terminate_or_enable = terminate_or_enable == 'Terminar semana' ? 'Habilitar semana' : 'Terminar semana'
          }
        })
        churche_concepts[semana]!.forEach((week: Weeks) => {
          if(terminate_or_enable == 'Terminar semana'){
            week.status = 'Cerrado'
          } else {
            week.status = 'Abierto'
          }
        })
      } 
    }

    /*
      Obtener todos los conceptos      

      -Asignamos todos los conceptos obtenidos, a la variable "concepts", para que sea reactivo.

      return void
    */
    const getConcepts = async () => {
      try {
        const responses = await handleRequest('get', `/getConcepts/`)
        responses.concepts.map(function (concept: Concept) {
          concepts.splice(concepts.length, 0, concept);
        })
      } catch (error) {
        handleErrors(error)
      }
    }

    /*
      Obtener todos los conceptos que le pertenecen a una iglesia en específico, de un mes en especifico

      -Asignamos todo los registros obtenidos de la tabla "churche_concept_month_human" a la 
        variable "churche_concepts".
        -Deshabilitar todas las semanas
        -Obtenemos la longitud del arreglo "churche_concepts" y se lo establecemos a la variable 
          "weeksAdded"

      return void
    */
    const getChurcheWithConceptsWithMonth = async () => {
      try {
        const responses = await handleRequest('put',`/getChurcheWithConceptsWithMonth`, {}, Number(month_id.value))

        if(responses.churcheConceptMonthHuman.length > 0) {
          let semana: SemanaClave = 'primeraSemana'
          responses.churcheConceptMonthHuman.map(function (churcheConceptMonthHuman: Weeks) {
            semana = name_weeks[churcheConceptMonthHuman.week - 1].name as SemanaClave
            if (!churche_concepts[semana]) {
              churche_concepts[semana] = [];
            }

            churche_concepts[semana]!.splice(churche_concepts[semana]!.length, 0, churcheConceptMonthHuman);
            endOfTheWeek(semana, 'Terminar semana')
          })      
          weeksAdded.value = Object.keys(churche_concepts).length      
        }
      } catch (error) {
          handleErrors(error)
      }
    }

    onMounted(() => {
      getConcepts()
      getChurcheWithConceptsWithMonth()
    })

    return {
        nameIglesia,
        concepts,
        totalWeeks,
        weeksAdded,
        churche_concepts,
        name_weeks,
        monthlyReportOfTheChurchSecretary,
    }
  }
}
</script>
<template>
    <div class="columns">
        <div class="column is-four-fifths">
          <p class="title is-1 has-text-centered mt-1" v-text="`Iglesia ${nameIglesia}`"> </p>
        </div>
        <div class="column">
            <button class="button is-info is-large pt-3 pb-3 is-fullwidth"
              @click="monthlyReportOfTheChurchSecretary()"
            >
                <span class="icon is-small">
                  <i class="fa-solid fa-file-pdf"></i>
                </span>
                <span>Exportar en PDF</span>
            </button>
        </div>
    </div>
    <div class="table-container mt-6">
      <Form @submit="save" :validation-schema="schema" :initial-values="initialData">
          <table class="table is-link">
            <thead>
              <tr>
                <th v-for="(concept, index) in concepts" :key="index" v-text="concept.concept"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(totalWeek, index) in weeksAdded" :key="index">
                <tr>
                  <th>
                    <span v-text="totalWeeks[index]"></span>
                  </th>
                  <td v-for="(concept, index_concept) in churche_concepts[name_weeks[index].name]" :key="index_concept">
                    <input type="number" v-model="concept.value"
                      min="0" max="1000"
                      disabled
                      class="input is-family-monospace has-text-centered"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
      </Form>
    </div>
</template>

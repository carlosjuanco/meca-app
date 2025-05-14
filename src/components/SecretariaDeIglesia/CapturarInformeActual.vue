<script lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { useStore } from 'vuex'
  import helpers from '../../helpers'

	export default {
    name: 'CapturarInformeActual',
    setup() {
      const store = useStore()
      const { handleRequest, handleErrors, handleMultipleRequests } = helpers()
      const name_iglesia: string = store.getters.user.church_to_which_it_belongs
      const total_weeks: string[] = [
        "Primera semana",
        "Segunda semana",
        "Tercera semana",
        "Cuarta semana"
      ]

      interface Nameweek {
        name: string,
        terminate_or_enable: string,
      }

      let name_weeks = reactive<Nameweek[]>([
        { name: "primeraSemana", terminate_or_enable: 'Terminar semana' },
        { name: "segundaSemana", terminate_or_enable: 'Terminar semana' },
        { name: "terceraSemana", terminate_or_enable: 'Terminar semana' },
        { name: "cuartaSemana", terminate_or_enable: 'Terminar semana' },
      ])

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

      type SemanaClave = 'primeraSemana' | 'segundaSemana' | 'terceraSemana' | 'cuartaSemana';
      type Mes = Partial<Record<SemanaClave, Weeks[]>>

      let concepts = reactive<Concept[]>([{
        id: 0,
        concept: '',
      }]);

      let churche_concepts = reactive<Mes>({});
      const weeksAdded = ref(Object.keys(churche_concepts).length)

      // const getConcepts = async () => {
      //   try {
      //     const responses = await handleRequest('get', `/getConcepts`)
      //     responses.concepts.map(function (concept: Concept) {
      //       concepts.splice(concepts.length, 0, concept);
      //     })
      //     addConceptsToTheWeek('primeraSemana')
      //   }
      //   catch (error) {
      //     handleErrors(error)
      //   }
      // }

      const save = async () => {
        console.info('No soy', churche_concepts)
        console.info('TigerBlind', JSON.stringify({ datos: churche_concepts }, null, 2));
        try {
            await handleRequest('post', '/storeChurcheWithConcepts', churche_concepts)

            // emit('close')
            
        }
        catch (error) {
            // handleErrors(error)
        }
        finally {
            // loading.value = false
        }
      }

      const addConceptsToTheWeek = (semana: SemanaClave | undefined) => {
        if(typeof semana == "string"){
          concepts.forEach(function (concept: Concept) {
            if(concept.id > 0 ){
              if (!churche_concepts[semana]) {
                churche_concepts[semana] = [];
              }
              churche_concepts[semana]!.splice(churche_concepts[semana]!.length, 0, {
                id: 0,
                value: 0, 
                concept_id: concept.id,
                churche_id: store.getters.user.churche_id,
                month_id: store.getters.user.month_id,
                human_id: 0,
                week: (name_weeks.findIndex(weekk => weekk.name == semana)) + 1,
                status: 'Abierto'
              });
            }
          })
          weeksAdded.value = Object.keys(churche_concepts).length
        }
      }

      const endOfTheWeek = (semana: SemanaClave | undefined, terminate_or_enable: string) => {
        console.info('Que trae semana, ', semana)
        console.info('Que tiene churche_concepts, ', churche_concepts)
        if(typeof semana == "string"){
          name_weeks.forEach((week: Nameweek) => {
            if(week.name == semana) {
              week.terminate_or_enable = terminate_or_enable == 'Terminar semana' ? 'Habilitar semana' : 'Terminar semana'
            }
          })
          console.info('Que tiene name_weeks, ', name_weeks)
          console.info('Que tiene terminate_or_enable, ', terminate_or_enable)
          churche_concepts[semana]!.forEach((week: Weeks) => {
            if(terminate_or_enable == 'Terminar semana'){
              week.status = 'Cerrado'
            } else {
              week.status = 'Abierto'
            }
            
          })
        } 
      }

      // const addChurcheConceptMonthHuman = (semana: SemanaClave, churcheConceptMonthHuman: Weeks) => {
      //   if (!churche_concepts[semana]) {
      //     churche_concepts[semana] = [];
      //   }
      //   churche_concepts[semana]!.splice(churche_concepts[semana]!.length, 0, churcheConceptMonthHuman);
      // }

      const getData = async () => {
        try {
          const responses = await handleMultipleRequests([`/getConcepts/`, `/getChurcheWithConcepts/`])
          console.info('Magin',responses[1].churcheConceptMonthHuman)
          responses[0].concepts.map(function (concept: Concept) {
            concepts.splice(concepts.length, 0, concept);
          })

          if(responses[1].churcheConceptMonthHuman.length > 0) {
            console.info('cabañas')
            let semana: SemanaClave = 'primeraSemana'
            responses[1].churcheConceptMonthHuman.map(function (churcheConceptMonthHuman: Weeks) {
              semana = name_weeks[churcheConceptMonthHuman.week - 1].name as SemanaClave
              console.log('valor que trae semana', semana)
              console.log('valor que trae churcheConceptMonthHuman', churcheConceptMonthHuman)
              // addChurcheConceptMonthHuman(semana, churcheConceptMonthHuman)
              if (!churche_concepts[semana]) {
                churche_concepts[semana] = [];
              }
              churche_concepts[semana]!.splice(churche_concepts[semana]!.length, 0, churcheConceptMonthHuman);
            })      
            weeksAdded.value = Object.keys(churche_concepts).length      
          } else {
            addConceptsToTheWeek('primeraSemana')
          }

        } catch (error) {
            handleErrors(error)
        }
      }

      onMounted(() => {
        getData()
      })

      return {
        name_iglesia,
        concepts,
        total_weeks,
        churche_concepts,
        name_weeks,
        weeksAdded,
        addConceptsToTheWeek,
        endOfTheWeek,
        save
      }
    }
	}
</script>

<template>
    <div class="table-container">
      <p class="title is-1 has-text-centered mt-1" v-text="`Iglesia ${name_iglesia}`"> </p>
        <table class="table is-link">
          <thead>
            <tr>
              <th v-for="(concept, index) in concepts" :key="index" v-text="concept.concept"></th>
            </tr>
          </thead>
          <tbody>
              <template v-for="(total_week, index) in weeksAdded" :key="index">
                <tr>
                  <th>
                    <span v-text="total_weeks[index]"></span>
                    <span>
                      <button class="button" 
                        @click="endOfTheWeek(name_weeks[index].name, name_weeks[index].terminate_or_enable)" 
                        v-text="name_weeks[index].terminate_or_enable">
                      </button>
                    </span>
                  </th>
                  <td v-for="(concept, index_concept) in churche_concepts[name_weeks[index].name]" :key="index_concept">
                    <input type="number" v-model="concept.value" :disabled="concept.status == 'Cerrado' "
                      class="input is-family-monospace has-text-centered"/>
                  </td>
                </tr>
              </template>
                <tr>
                  <td>
                    <button class="button" @click="weeksAdded < 4 &&  addConceptsToTheWeek(name_weeks[weeksAdded].name)">Nueva semana</button>
                  </td>
                </tr>
          </tbody>
        </table>
        <button class="button is-success is-family-monospace is-fullwidth" @click="save">Guardar</button>
    </div>
</template>
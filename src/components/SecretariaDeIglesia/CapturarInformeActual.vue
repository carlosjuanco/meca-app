<script lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { useStore } from 'vuex'
  import helpers from '../../helpers'
  import InternalNotification from '../InternalNotification.vue'

	export default {
    name: 'CapturarInformeActual',
    components: { InternalNotification },
    setup() {
      const store = useStore()
      const { handleRequest, handleErrors, handleMultipleRequests } = helpers()
      const name_iglesia: string = store.getters.user.church_to_which_it_belongs

      type Datamodal = {
        title: string
        message: { [key: string]: any }
        url: string
      }

      interface Nameweek {
        name: string,
        terminate_or_enable: string,
      }

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

      let show_internal_notification = ref(false)
      let show_spiner = ref(false)
      let data_internal_notification: Datamodal = reactive({
        title: '',
        message: {},
        url: ''
      })

      const total_weeks: string[] = [
        "Primera semana",
        "Segunda semana",
        "Tercera semana",
        "Cuarta semana"
      ]

      let name_weeks = reactive<Nameweek[]>([
        { name: "primeraSemana", terminate_or_enable: 'Terminar semana' },
        { name: "segundaSemana", terminate_or_enable: 'Terminar semana' },
        { name: "terceraSemana", terminate_or_enable: 'Terminar semana' },
        { name: "cuartaSemana", terminate_or_enable: 'Terminar semana' },
      ])

      type SemanaClave = 'primeraSemana' | 'segundaSemana' | 'terceraSemana' | 'cuartaSemana';
      type Mes = Partial<Record<SemanaClave, Weeks[]>>

      let concepts = reactive<Concept[]>([{
        id: 0,
        concept: '',
      }]);

      let churche_concepts = reactive<Mes>({});
      const weeksAdded = ref(Object.keys(churche_concepts).length)

      const validateFiel = (concept: Weeks): void => {
        if (concept.value < 0) concept.value = 0;
        if (concept.value > 1000) concept.value = 1000;
        console.info('Me esta llegando el valor: ', concept.value)
      }

      const whenTheFieldLosesFocus = (concept: Weeks): void => {
        let typeData = typeof concept.value
        if(typeData == 'string') {
          concept.value = 0
        }
      }

      const save = async () => {
        try {
          show_spiner.value = true

          const response = await handleRequest('post', '/storeChurcheWithConcepts', churche_concepts)

          data_internal_notification.title = 'Advertencia'
          data_internal_notification.message = { message: response.message }
          data_internal_notification.url = `/`

          show_internal_notification.value = true
        }
        catch (error) {
          data_internal_notification.title = 'Advertencia'
          data_internal_notification.message = handleErrors(error)
          data_internal_notification.url = `/`

          show_internal_notification.value = true
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
          if(terminate_or_enable == 'Terminar semana'){
            save()
          }
        } 
      }

      const getData = async () => {
        try {
          const responses = await handleMultipleRequests([`/getConcepts/`, `/getChurcheWithConcepts/`])
          responses[0].concepts.map(function (concept: Concept) {
            concepts.splice(concepts.length, 0, concept);
          })

          if(responses[1].churcheConceptMonthHuman.length > 0) {
            let semana: SemanaClave = 'primeraSemana'
            responses[1].churcheConceptMonthHuman.map(function (churcheConceptMonthHuman: Weeks) {
              semana = name_weeks[churcheConceptMonthHuman.week - 1].name as SemanaClave
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
        data_internal_notification,
        show_internal_notification,
        show_spiner,
        validateFiel,
        whenTheFieldLosesFocus,
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
                  <input type="number" v-model="concept.value"
                    min="0" max="1000" 
                    :disabled="concept.status == 'Cerrado' "
                    @input="validateFiel(concept)"
                    @blur="whenTheFieldLosesFocus(concept)"
                    class="input is-family-monospace has-text-centered"/>
                  <span class="icon-text has-text-warning">
                    <span class="icon">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                    <span>Warning</span>
                  </span>
                  <!--strong class="help is-danger">Me diran</strong-->
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
      <button :class="{'button is-success is-family-monospace is-fullwidth': true, 
        'is-loading': show_spiner } " 
        @click="save"
        :disabled="show_spiner"
      >
        Guardar
      </button>
      <internal-notification
        :show="show_internal_notification"
        :data="data_internal_notification"
        @close="show_internal_notification = false, show_spiner = false"
      ></internal-notification>
    </div>
</template>
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
        error?: string
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

      /*
        Validar valor.

        Si el valor es menor a 0, establecerlo en 0
        Si el valor es mayor a 1000, establecerlo en 1000

        return void
      */
      const validateFiel = (concept: Weeks): void => {
        if (concept.value < 0) concept.value = 0;
        if (concept.value > 1000) concept.value = 1000;
      }

      /*
        Cuando pierda el foco un campo, si no introducimos nada, entonces establecerlo en 0

        return void
      */
      const whenTheFieldLosesFocus = (concept: Weeks): void => {
        let typeData = typeof concept.value
        if(typeData == 'string') {
          concept.value = 0
        }
      }

      /*
        Guardar los datos capturados

        -Habiliar el spiner
        -Realizar la peticion para guardar los datos.
        -Establecer los datos al componente "InternalNotification"
        -Llamar al método "getChurcheWithConcepts"

        return show internal_notification
      */
      const save = async () => {
        try {
          show_spiner.value = true

          const response = await handleRequest('post', '/storeChurcheWithConcepts', churche_concepts)

          data_internal_notification.title = 'Advertencia'
          data_internal_notification.message = { message: response.message }
          data_internal_notification.url = `/`

          show_internal_notification.value = true
          getChurcheWithConcepts()
        }
        catch (error) {
          let semanas: string[] = Object.keys(churche_concepts)
          semanas.forEach((semana) => {
            let seman = semana as SemanaClave
            churche_concepts[seman]!.forEach((concept: Weeks) => {
              concept.error = ''
            })
          })
          let errores = Object.entries(handleErrors(error))
          let separateFirstPosition: string[] = []
          let semana: SemanaClave = 'primeraSemana'
          let position: number = 0
          errores.forEach((error) => {
            separateFirstPosition = error[0].split('.')
            semana = separateFirstPosition[0] as SemanaClave
            position = Number(separateFirstPosition[1])

            churche_concepts[semana]![position].error = error[1].replace(`de ${error[0]}`, ""); 
          })

          show_spiner.value = false
        }
      }

      /*
        Agregar una fila(primeraSemana, segundaSemana, terceraSemana y cuartaSemana) a nuestro 
        arreglo "churche_concepts", por una fila, agregar cada uno de los conceptos que existen
        en la tabla "concepts".

        @semana de tipo SemanaClave o undefined, ya que habra un caso donde no traiga nada.
          entonces, validamos que sea de tipo "texto", si no es, no hacemos nada.

        return void
      */
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

      /*
        Deshabilitar o habilitar los campos, si deshabilitamos significa que terminamos la semana.
        Si habilitamos, nos hizo falta algo.

        @semana: SemanaClave Solo recibe los posibles valores "'primeraSemana' | 'segundaSemana' | 'terceraSemana' | 'cuartaSemana'"
          también puede recibir un valor undefined.
        @terminate_or_enable: string Recibe dos posibles valores "'Habilitar semana' | 'Terminar semana'".
        @guardar: boolean Si es true, mandaremos a llamar al metodo "save", para guardar los datos. Lo que 
          significa que el usuario posiblemente modifico un datos de la fila y posteriormente hizo clic
          en el botón "Terminar semana".
          Si es falso, entonces estamos llamando a este método desde la función "getChurcheWithConcepts".
          Lo que significa que no necesitamos guardar, solo necesitamos refrescar la tabla por completo. 

        return void
      */

      const endOfTheWeek = (semana: SemanaClave | undefined, terminate_or_enable: string, guardar: boolean) => {
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
          if(terminate_or_enable == 'Terminar semana' && guardar ){
            save()
          }
        } 
      }

      /*
        Realizar la petición, para obtener los datos que le pertenecen a un usuario, que esta vinculado
        a una iglesia, esta iglesia, tiene muchos conceptos.

        -Realiza la petición.
        -Verificamos si trae mas de una posición el arreglo.
        -Recorremos el resultado.
        -Comprobamos si existe la propiedad "primeraSemana" en "churche_concepts" si no la creamos.
        -Si el concept_id de la peticion y concept_id, del arreglo "churche_concepts", coinciden,
          entonces, establecemos el ID de la base de datos, de paso establecemos en vacio la
          propiedad "error".

        return void
      */
      const getChurcheWithConcepts = async () => {
        try {
          const responses = await handleRequest('get',`/getChurcheWithConcepts/`)

          if(responses.churcheConceptMonthHuman.length > 0) {
            let semana: SemanaClave = 'primeraSemana'
            responses.churcheConceptMonthHuman.map(function (churcheConceptMonthHuman: Weeks) {
              semana = name_weeks[churcheConceptMonthHuman.week - 1].name as SemanaClave
              if (!churche_concepts[semana]) {
                churche_concepts[semana] = [];
              }
              churche_concepts[semana]!.forEach((concept: Weeks) => {
                if(concept.concept_id == churcheConceptMonthHuman.concept_id){
                  concept.id = churcheConceptMonthHuman.id
                }
                concept.error = ''
              })
            })      
            weeksAdded.value = Object.keys(churche_concepts).length      
          } else {
            addConceptsToTheWeek('primeraSemana')
          }

        } catch (error) {
            handleErrors(error)
        }
      }

      /*
        Realizar dos peticiones en una sola petición
        La primera para obtener todos los conceptos.
        La segunda para obtener todos los conceptos que le pertenecen a una iglesia x, que a su vez
          esta vinculada con una persona (humano).

        -Asignamos todos los conceptos obtenidos, a la variable "concepts", para que sea reactivo.
        -Asignamos todo los registros obtenidos de la tabla "churche_concept_month_human" a la 
          variable "churche_concepts".
          -Establecemos la propiedad "error" en vacio.
          -Identificamos si un registro de una semana, trae el valor "Cerrado", en la propiedad
            "status", si es así, llamamos al método "endOfTheWeek", para deshabilitar la semana
            y que aparezca el texto "Habilitar semana".
          -Obtenemos la longitud del arreglo "churche_concepts" y se lo establecemos a la variable 
            "weeksAdded"
        -En caso que venga vacio la respuesta de "getChurcheWithConcepts", llamamos al método 
          "addConceptsToTheWeek", lo que significa que apenas comenzará a capturar.

        return void
      */
      const getData = async () => {
        try {
          const responses = await handleMultipleRequests([`/getConcepts/`, `/getChurcheWithConcepts/`])
          responses[0].concepts.map(function (concept: Concept) {
            concepts.splice(concepts.length, 0, concept);
          })

          if(responses[1].churcheConceptMonthHuman.length > 0) {
            let semana: SemanaClave = 'primeraSemana'
            let conts: object | undefined = {}
            responses[1].churcheConceptMonthHuman.map(function (churcheConceptMonthHuman: Weeks) {
              semana = name_weeks[churcheConceptMonthHuman.week - 1].name as SemanaClave
              if (!churche_concepts[semana]) {
                churche_concepts[semana] = [];
              }
              churcheConceptMonthHuman.error = ''

              churche_concepts[semana]!.splice(churche_concepts[semana]!.length, 0, churcheConceptMonthHuman);
              conts = churche_concepts[semana]!.find((concep: Weeks) => concep.status == 'Cerrado')
              if(conts !== undefined) {
                endOfTheWeek(semana, 'Terminar semana', false)
              }
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
                      @click="endOfTheWeek(name_weeks[index].name, name_weeks[index].terminate_or_enable, true)" 
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
                    class="input is-family-monospace has-text-centered"
                  />
                  <span v-if="concept.error" class="icon-text has-text-warning" >
                    <span class="icon">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                    <span v-text="concept.error"></span>
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

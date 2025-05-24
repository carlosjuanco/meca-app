<script lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import helpers from '../../helpers'
import InternalNotification from '../InternalNotification.vue'
  
export default {
  name: 'InformePorMes',
  components: { InternalNotification },
  setup() {
    const router = useRouter()
    const { handleRequest, handleErrors } = helpers()

    interface Month {
      id: number,
      month: string,
      anio: number, 
      haveInformation: boolean,
      row?: number,
      column?: number
    }

    type Datamodal = {
      title: string
      message: { [key: string]: any }
      url: string
    }

    let show_internal_notification = ref(false)
    let data_internal_notification: Datamodal = reactive({
      title: '',
      message: {},
      url: ''
    })
    let years = ref<number[]>([]);
    let months = reactive<Month[]>([]);
    const grid: { rows: number, columns: number } = {
      rows: 3,
      columns: 4
    }

    /*
      Obtener los años

      return void
    */
    const getYears = async () => {
      try {
        const responses = await handleRequest('get', `/getYears`)
        years.value = responses.years

        if(years.value.length == 1) {
          getAllTheMonthsThatHaveInformation(years.value[0])
        }
      }
      catch (error) {
        handleErrors(error)
      }
    }

    /*
      Obtener todos los meses que tienen informacion, en base al usuario que inicio sesión. 

      -Los meses obtenidos, establecerlos a la variable "months"

      @year = año
      
      return void
    */
    const getAllTheMonthsThatHaveInformation = async (year: number) => {
      try {
        const responses = await handleRequest('put', `/getAllTheMonthsThatHaveInformation`, {}, year)
        responses.months.map(function (month: Month) {
          if(month.month == 'Enero') {
            month.row = 1
            month.column = 1
          } else if(month.month == 'Febrero'){
            month.row = 1
            month.column = 2
          } else if(month.month == 'Marzo'){
            month.row = 1
            month.column = 3
          } else if(month.month == 'Abril'){
            month.row = 1
            month.column = 4
          } else if(month.month == 'Mayo'){
            month.row = 2
            month.column = 1
          } else if(month.month == 'Junio'){
            month.row = 2
            month.column = 2
          } else if(month.month == 'Julio'){
            month.row = 2
            month.column = 3
          } else if(month.month == 'Agosto'){
            month.row = 2
            month.column = 4
          } else if(month.month == 'Septiembre'){
            month.row = 3
            month.column = 1
          } else if(month.month == 'Octubre'){
            month.row = 3
            month.column = 2
          } else if(month.month == 'Noviembre'){
            month.row = 3
            month.column = 3
          } else if(month.month == 'Diciembre'){
            month.row = 3
            month.column = 4
          }
          months.splice(months.length, 0, month);
        })
      }
      catch (error) {
        handleErrors(error)
      }
    }

    const open_informeMesX = (mes: Month) => {
      if(mes.haveInformation) {
        console.log('raquela', mes)
        router.replace({ name: 'Informe mes x' }) 
      } else {
        data_internal_notification.title = 'Advertencia'
        data_internal_notification.message = { message: 'Todavía no hay información para este mes' }
        data_internal_notification.url = `/`

        show_internal_notification.value = true
      }
      
    }

    onMounted(() => {
      getYears()
    })

    return {
      open_informeMesX,
      years,
      grid,
      months,
      data_internal_notification,
      show_internal_notification,
    }
  }
}
</script>
<template>
  <div class="columns">
    <div class="column">
      <div class="select is-rounded is-large is-fullwidth">
        <select v-for="year in years" :key="year">
          <option v-text="year"></option>
        </select>
      </div>
    </div>
  </div>
  <div class="columns" v-for="row in grid.rows" :key="row">
    <template v-for="month in months" :key="month.id">
      <template v-if="row == month.row">
        <template v-for="column in grid.columns" :key="column">
          <div class="column" v-if="column == month.column">
            <button class="bd-notification button is-large pt-6 pb-6 is-fullwidth" 
              v-text="month.month"
              @click="open_informeMesX(month)"
            >
            </button>
          </div>
        </template>
      </template>
    </template>
  </div>
  <internal-notification
    :show="show_internal_notification"
    :data="data_internal_notification"
    @close="show_internal_notification = false"
  ></internal-notification>
</template>
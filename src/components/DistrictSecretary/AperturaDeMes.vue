<script lang="ts">
import { ref, onMounted, reactive } from 'vue'
import helpers from '../../helpers'

export default {
  name: "AperturaDeMes",
  setup() {
    const { handleRequest, handleErrors, handleMultipleRequests } = helpers()

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
      is_open?: boolean, 
      disabled?: boolean, 
      checked?: boolean,
      row?: number,
      column?: number
    }

    let years = ref<number[]>([]);
    const grid: { rows: number, columns: number } = {
      rows: 3,
      columns: 4
    }
    let months = reactive<Month[]>([]);
    let monthOpen = ref<Month>({
        id: 0,
        month: '',
        status: '',
        anio: 0,
        month_id: 0,
        human_id: 0,
        created_at: '',
        updated_at: '',
        deleted_at: null
      });


    const closeMonth = async (monthOpen: Month) => {
      try {
        await handleRequest('put', `/closeMonth`, monthOpen, monthOpen.id)
        months.forEach(function (month: Month) {
          if(month.month == monthOpen.month){
            month.is_open = false
            month.disabled = false
            month.checked = false
            month.id = monthOpen.id
          } else {
            month.is_open = false
            month.disabled = false
            month.checked = false
            month.id = monthOpen.id
          }
        })
      }
      catch (error) {
        handleErrors(error)
      }
    }

    const getData = async () => {
      try {
        const responses = await handleMultipleRequests([`/getMonths/`, `/getYears/`, `/getMonthOpen/`])

        responses[0].months.map(function (month: Month) {
          month.is_open = false
          month.disabled = true
          month.checked = false
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

        years.value = responses[1].years

        if(typeof responses[2].month == 'object'){
          monthOpen.value = responses[2].month
          months.forEach(function (month: Month) {
            if(month.month == monthOpen.value.month){
              month.is_open = true
              month.disabled = false
              month.checked = true
              month.id = monthOpen.value.id
            }
          })
        } else if(typeof responses[2].month == 'string') {
          months.forEach(function (month: Month) {
            month.is_open = false
            month.disabled = false
            month.checked = false
          })
        }
      }
      catch (error) {
          handleErrors(error)
      }
    }

    onMounted(() => {
      getData()
    })
    return { years, grid, months, closeMonth }
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
              <button :class="{ 'bd-notification button is-large pt-6 pb-6 is-fullwidth': true,
                'is-link': month.is_open } " 
                v-text="month.month" :disabled="month.disabled"></button>
              <div class="columns is-mobile">
                <div class="column">
                  <label class="radio" :disabled="month.disabled ? 'disabled' : null">
                    <input type="radio" :name="`open_or_close_${month.month}`" 
                      :disabled="month.disabled" :checked="month.checked" value="Abierto"/>
                    Abierto
                  </label>
                </div>
                <div class="column">
                  <label class="radio" :disabled="month.disabled ? 'disabled' : null">
                    <input type="radio" :name="`open_or_close_${month.month}`" 
                      :disabled="month.disabled" value="Cerrado"
                      @click="closeMonth(month)"/>
                    Cerrado
                  </label>
                </div>
              </div>
            </div>
          </template>
        </template>
      </template>
  </div>
</template>
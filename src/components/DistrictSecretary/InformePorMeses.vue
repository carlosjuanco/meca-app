<script lang="ts">
import {useRouter} from "vue-router"

export default {
  name: 'InformePorMeses',
  setup() {
    const router = useRouter()
      const open_informeMesX = (mes: string) => {
        console.log('raquela', mes)
        router.replace({ name: 'Informe mes seleccionado' })
      }

      return {
        open_informeMesX
      }
  }
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="select is-rounded is-large is-fullwidth">
        <select>
          <option>2024</option>
          <option>2025</option>
          <option>2026</option>
        </select>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" @click="open_informeMesX('Enero')">Enero</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Febrero</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Marzo</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Abril</button>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Mayo</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Junio</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Julio</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Agosto</button>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Septiembre</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Octubre</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Noviembre</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth">Diciembre</button>
    </div>
  </div>
</template>
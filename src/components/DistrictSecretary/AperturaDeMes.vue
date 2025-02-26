<script lang="ts">

export default {
  name: "AperturaDeMes"
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="select is-rounded is-large is-fullwidth">
        <select>
          <option>2025</option>
        </select>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="bd-notification button is-large pt-6 pb-6 is-fullwidth is-link">Enero</button>
      <div class="columns is-mobile">
        <div class="column">
          <label class="radio">
            <input type="radio" name="open_or_close" checked/>
            Abierto
          </label>
        </div>
        <div class="column">
          <label class="radio">
            <input type="radio" name="open_or_close" />
            Cerrado
          </label>
        </div>
      </div>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Febrero</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Marzo</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Abril</button>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Mayo</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Junio</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Julio</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Agosto</button>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Septiembre</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Octubre</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Noviembre</button>
    </div>
    <div class="column">
      <button class="button is-large pt-6 pb-6 is-fullwidth" disabled>Diciembre</button>
    </div>
  </div>
</template>
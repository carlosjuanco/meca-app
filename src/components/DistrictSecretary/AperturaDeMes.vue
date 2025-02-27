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
  <div class="columns">
    <div class="column is-full">
        <article class="panel is-link">
            <p class="panel-heading">Reglas de negocio</p>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              En la lista desplegable, se mostrará únicamente el año actual.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              Al iniciar el año estará abierto el mes de Enero y el sistema lo cerrará al iniciar el mes siguiente.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              Al iniciar un nuevo mes, el mes anterior quedará cerrado por el sistema y deshabilitado.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              Solo el mes actual estará habilitado y abierto, con la posibilidad de cerrar el mes.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              Por lo tanto solo en un mes, estará la opción de abierto o cerrado.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              Si necesita abrir un mes anterior, tine que llamar a los "Creadores del sistema".
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              El mes actual o el mes que está aperturado se visualizará en color azul.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              Por predeterminado estará seleccionado abierto el elemento tipo radio.
            </a>
          </article>
    </div>
  </div>
</template>
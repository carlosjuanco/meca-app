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
    <div class="column">
        <article class="panel is-link">
            <p class="panel-heading">Reglas de negocio</p>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              El rol <span class="tag is-black">Secretaria de distrito</span> es la única responsable de abrir o cerrar un mes/periodo.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              En la lista desplegable, por predeterminado seleccionamos el año actual.
            </a>
          </article>
    </div>
    <div class="column">
        <article class="panel is-link">
            <p class="panel-heading">Funcionalidad</p>
            <a class="panel-block">
              <div class="content">
                <ol>
                  <li>
                    Buscamos todos los años en la tabla meses , del campo anio y agrupamos, para obtener todos los años.
                  </li>
                  <li>
                    Dibujamos la lista desplegable con los datos obtenidos.
                  </li>
                  <li>
                    En la lista desplegable, por predeterminado seleccionamos el año actual.
                  </li>
                </ol>
              </div>
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              El mes que ésta aperturado se visualizará en color azul.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              Cuando haga clic sobre una etiqueta de "Abierto" de un mes que no este abierto, mandamos un mensaje al usuario que primero debe de cerrar el mes aperturado.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              Cuando haga clic sobre la opción de "Cerrado", del mes aperturado, se volverá opaco, el cuadro que representa el mes y las opciones "Abierto" y "Cerrado" quedaran disponibles para seleccionarlas.
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              En caso que se diriga a otro módulo y no haya ningún mes abierto, se mostrará el mensaje, "Aperture un mes".
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
          </article>
    </div>
  </div>
</template>
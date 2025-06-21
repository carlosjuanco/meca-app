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
  <div class="columns">
      <div class="column">
          <article class="panel is-link">
              <p class="panel-heading">Reglas de negocio</p>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Que pueda seleccionar un mes para ver el informe mensual.
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Verificar que solo los usuarios con el rol "Secretaría de distrito", tengan acceso a este componente.
              </a>
          </article>
      </div>
      <div class="column">
          <article class="panel is-link">
              <p class="panel-heading">Funcionalidad</p>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                La lista desplegable, que seleccione el año actual siempre.
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Buscamos todos los años en la tabla meses , del campo anio y agrupamos, para obtener todos los años.
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Cuando haga un clic sobre un mes, en caso que no tenga información, que muestre una ventana con la informacion "Todavía no hay información para este mes".
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Cuando tenga informacion el mes, abrirá el componente "informe mes seleccionado".
              </a>
          </article>
      </div>
  </div>
</template>
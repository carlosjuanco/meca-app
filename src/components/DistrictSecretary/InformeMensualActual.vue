<script lang="ts">

export default {
  name: 'InformeMensualActual',
  setup() {
    const concepts: string[] = [
        "IGLESIAS",
        "Grupos pequeños",
        "Contactos misioneros",
        "Estudios acumulados",
        "Nuevos estudios",
        "Bautismos",
        "Total de personas estudiando",
        "Total de estudios mensuales",
        "Total de bautismos alcanzados",
        "Invitados en la campaña de GP",
        "Invitados en la campaña de iglesia",
    ]
    const churches: string[] = [
        "Centenario",
        "Familias en Crecimiento",
        "Las Flores",
        "Volcanes",
        "Donaji",
        "Jardín",
        "7 Regiones",
        "San Luis Beltran",
        "Zogocho",
        "Huayapam",
        "Yatareni",
        "Tres Cruces",
    ]

    return {
      concepts,
      churches,
    }
  }
}
</script>

<template>
<div class="table-container">
  <p class="title is-1 has-text-centered mt-1">INFORME DE LAS IGLESIAS DEL DISTRITO DE LAS FLORES</p>
  <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
      <tr class="is-light">
        <th v-for="(concept, index) in concepts" :key="index" v-text="concept"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(church, index) in churches" :key="index">
        <td v-text="church"></td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
      </tr>
      <tr class="is-light">
        <td>Anterior</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
      </tr>
      <tr class="is-light">
        <td>Total distrital</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
      </tr>
    </tbody>
  </table>
</div>
  <div class="columns">
      <div class="column">
          <article class="panel is-link">
              <p class="panel-heading">Reglas de negocio</p>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                La interseccion de iglesia y conceptos, es lo que capturo cada <span class="tag is-light">secretaria de iglesia</span>.
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                La fila con el etiqueta <span class="tag is-light">anterior</span> es el total por cada columna del mes anterior.
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                La fila con el etiqueta <span class="tag is-light">Total distrital</span> es el total del mes actual.
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
                Los conceptos se traeran de la tabla <span class="tag is-light">conceptos</span>.
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Los nombres de iglesias se traeran de la tabla <span class="tag is-light">iglesias</span>.
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Obtener la información de la interseccion de iglesias y conceptos.
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                El primero mes, cuando comience a usarse el sistema, todo estará en ceros.
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Cuando se cierre el primer mes, todo estará en ceros, menos la fila de <span class="tag is-light">Anterior</span>
              </a>
          </article>
      </div>
    </div>
</template>
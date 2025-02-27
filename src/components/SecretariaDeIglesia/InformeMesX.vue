<script lang="ts">

	export default {
        name: 'InformeMesX',
        setup() {
            const concepts = [
            "",
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
            ""
          ]
            const total_weeks = [
            "Primera semana",
            "Segunda semana",
            "Tercera semana",
            "Cuarta semana"
          ]

          return {
                concepts,
                total_weeks,
          }
        }
    }
</script>
<template>
    <div class="columns">
        <div class="column is-four-fifths">
          
        </div>
        <div class="column">
            <button class="button is-info is-large pt-3 pb-3 is-fullwidth">
                <span class="icon is-small">
                  <i class="fa-solid fa-file-pdf"></i>
                </span>
                <span>Exportar en PDF</span>
              </button>
        </div>
    </div>
    <div class="table-container mt-6">
      <Form @submit="save" :validation-schema="schema" :initial-values="initialData">
          <table class="table is-link">
            <thead>
              <tr>
                <th v-for="(concept, index) in concepts" :key="index" v-text="concept"></th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <th><strong>Primera semana</strong></th>
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
                    <td>1</td>
                </tr>
            </tbody>
          </table>
      </Form>
    </div>
    <div class="columns">
      <div class="column">
          <article class="panel is-link">
              <p class="panel-heading">Reglas de negocio</p>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Visualizar lo capturado del mes correspondiente.
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
                Obtener la información de la interseccion de iglesias y conceptos.
              </a>
          </article>
      </div>
    </div>
</template>

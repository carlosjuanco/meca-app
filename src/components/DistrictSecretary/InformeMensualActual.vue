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
      <tr>
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
      <tr>
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
</template>
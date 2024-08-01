<script lang="ts">
  import { Field, Form, ErrorMessage, FieldArray } from 'vee-validate'
  import * as yup from 'yup'

	export default {
    name: 'CapturarInformeActual',
    components: {
        Form,
        Field,
        ErrorMessage,
        FieldArray
    },
    setup() {
      const name_iglesia = 'Familias en crecimiento'
      const concepts = [
        "",
        "GRUPOS PEQUEÑOS",
        "CONTACTOS MISIONEROS",
        "ESTUDIOS ACUMULADOS",
        "NUEVOS ESTUDIOS",
        "BAUTISMOS",
        "TOTAL DE PERSONAS ESTUDIANDO",
        "TOTAL DE ESTUDIOS MENSUALES",
        "TOTAL DE BAUTISMOS ALCANZADOS",
        "INVITADOS EN LA CAMPAÑA DE GP",
        "INVITADOS EN LA CAMPAÑA DE IGLESIA",
        ""
      ]
      const total_weeks = [
        "Primera semana",
        "Segunda semana",
        "Tercera semana",
        "Cuarta semana"
      ]
      
      const initialData = {
        weeks: [{
          concept1: 0,
          concept2: 0,
          concept3: 0,
          concept4: 0,
          concept5: 0,
          concept6: 0,
          concept7: 0,
          concept8: 0,
          concept9: 0,
          concept10: 0
        }]
      }

      const schema = yup.object().shape({
        weeks: yup.array().of(
          yup.object().shape({
            concept1:yup.number(),
            concept2:yup.number(),
            concept3:yup.number(),
            concept4:yup.number(),
            concept5:yup.number(),
            concept6:yup.number(),
            concept7:yup.number(),
            concept8:yup.number(),
            concept9:yup.number(),
            concept10:yup.number()
          })
        ).strict(),
      })

      const save = (values) => {
        console.log('No soy', values)
      }

      return {
        name_iglesia,
        concepts,
        total_weeks,
        initialData,
        schema,
        save
      }
    }
	}
</script>

<template>
    <div class="table-container">
      <p class="title is-1 has-text-centered mt-1" v-text="`Iglesia ${name_iglesia}`"> </p>
      <Form @submit="save" :validation-schema="schema" :initial-values="initialData">
          <table class="table is-link">
            <thead>
              <tr>
                <th v-for="(concept, index) in concepts" :key="index" v-text="concept"></th>
              </tr>
            </thead>
            <tbody>
              <FieldArray name="weeks" v-slot="{ fields, push }">
                <tr v-for="(field, index) in fields" :key="field.key">
                    <th v-text="total_weeks[index]"></th>
                    <td>
                      <Field :name="`weeks[${index}].concept1`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept1`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td>
                      <Field :name="`weeks[${index}].concept2`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept2`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td>
                      <Field :name="`weeks[${index}].concept3`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept3`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td>
                      <Field :name="`weeks[${index}].concept4`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept4`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td>
                      <Field :name="`weeks[${index}].concept5`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept5`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td>
                      <Field :name="`weeks[${index}].concept6`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept6`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td>
                      <Field :name="`weeks[${index}].concept7`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept7`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td>
                      <Field :name="`weeks[${index}].concept8`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept8`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td>
                      <Field :name="`weeks[${index}].concept9`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept9`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td>
                      <Field :name="`weeks[${index}].concept10`" type="number" class="input is-family-monospace has-text-centered"/>
                      <ErrorMessage :name="`weeks[${index}].concept10`" :class="{'tag is-warning': true }"/>
                    </td>
                    <td v-if="index == 0">
                      <button class="button" 
                        @click="push({ concept1: 0, concept2: 0, concept3: 0, concept4: 0, concept5: 0,
                        concept6: 0, concept7: 0, concept8: 0, concept9: 0, concept10: 0 })"
                        >Nueva semana</button>
                    </td>
                    <td v-else>
                    </td>
                </tr>
              </FieldArray>
            </tbody>
          </table>
          <button type="submit" class="button is-success is-family-monospace is-fullwidth">Guardar</button>
      </Form>
    </div>
    <div class="columns">
      <div class="column is-full">
          <article class="panel is-link">
              <p class="panel-heading">Reglas de negocio</p>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                El texto "Familias en crecimiento" cambiará de acuerdo a la iglesia que este adjunto la persona
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Cuando pierda el foco un imput se guardará automáticamente
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Si presiona más de 4 veces el botón de "Nueva semana" ya no deberá agregar mas filas
              </a>
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                Cuando creé la segunda semana, se deshabilitara todos los input de la primera semana, así sucesivamente.
              </a>
            </article>
      </div>
    </div>
</template>
<script lang="ts">
    import { Field, Form, ErrorMessage, FieldArray } from 'vee-validate'
    import * as yup from 'yup'

	export default {
        name: 'InformeMesX',
        components: {
            Form,
            Field,
            ErrorMessage,
            FieldArray
        },
        setup() {
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
            return {
                concepts,
                total_weeks,
                initialData,
                schema
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
              <FieldArray name="weeks" v-slot="{ fields }">
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
                    <td>
                    </td>
                </tr>
              </FieldArray>
            </tbody>
          </table>
      </Form>
    </div>
</template>

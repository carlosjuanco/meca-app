<script lang="ts">
  import { onMounted, reactive } from 'vue'
  import { Field, Form, ErrorMessage, FieldArray } from 'vee-validate'
  import * as yup from 'yup'
  import { useStore } from 'vuex'
  import helpers from '../../helpers'

	export default {
    name: 'CapturarInformeActual',
    components: {
        Form,
        Field,
        ErrorMessage,
        FieldArray
    },
    setup() {
      const store = useStore()
      const { handleRequest, handleErrors } = helpers()
      const name_iglesia: string = store.getters.user.church_to_which_it_belongs
      let concepts = reactive<string[]>([""]);
      const total_weeks: string[] = [
        "Primera semana",
        "Segunda semana",
        "Tercera semana",
        "Cuarta semana"
      ]

      // interface Concept {
      //   id: number,
      //   concept: string,
      //   human_id: number, 
      //   created_at: string,
      //   updated_at: string,
      //   deleted_at: string | null
      // }

      const getConcepts = async () => {
        try {
          const responses = await handleRequest('get', `/getConcepts`)
          responses.concepts.map(function (concept: string) {
            concepts.splice(concepts.length, 0, concept);
          })
        }
        catch (error) {
          handleErrors(error)
        }
      }
      // https://vee-validate.logaretm.com/v4/examples/array-fields/
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
            concept1:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100'),
            concept2:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100'),
            concept3:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100'),
            concept4:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100'),
            concept5:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100'),
            concept6:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100'),
            concept7:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100'),
            concept8:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100'),
            concept9:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100'),
            concept10:yup.number().min(0, 'Debe ser mayor o igual a 0').max(100, 'Debe ser menor o igual a 100')
          })
        ).strict(),
      })

      const save = (values:{ [key: string]: any }) => {
        console.info('No soy', values)
        console.info('TigerBlind',JSON.stringify(values, null, 2));
      }

      onMounted(() => {
        getConcepts()
      })

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
</template>
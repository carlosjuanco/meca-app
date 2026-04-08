<script lang="ts">
import { defineComponent, reactive, ref, watchEffect, PropType } from 'vue'

type DataModel = {
  id: number
  nameCommunity: string
  // Primarias
  primarySchools: string
  primaryKey: string
  elementarySchoolTeachers: string
  progressivePrimarySchoolNumbers: number
  // preescolares
  preschools: string
  preschoolKey: string
  preschoolTeachers: string
  preschoolNumberProgression: number
  // Educación inicial
  earlyChildhoodEducation: string
  initialKey: string
  earlyChildhoodEducationTeachers: string
  earlyChildhoodEducationNumbersProgressive: number
  // Albergues
  schoolDormitories: string
  keyHostels: string
  schoolDormitoryDirectors: string
}

export default defineComponent({
  name: 'ModalDetail',
  props: {
    show: Boolean,
    data: Object as PropType<DataModel>
  },
  emits: ['close'],
  setup(props, { emit }) {

    let loading = ref(false)
    const form = reactive({} as DataModel)

    watchEffect(() => {
      if (props.data) Object.assign(form, props.data)
    })

    return { form, save, emit, loading }
  }
})
</script>

<template>

<div :class="{'modal': true, 'is-active': show}">
  <div class="modal-background" @click="$emit('close')"></div>

  <div class="modal-card ver-reporte-por-comunidad">

    <header class="modal-card-head">
      <p class="modal-card-title">
        <strong>Comunidad: </strong>
        <span v-text="data.nameCommunity"></span>
      </p>
      <button class="delete" @click="$emit('close')"></button>
    </header>

    <section class="modal-card-body">

      <div class="table-container">
        <table class="table is-fullwidth is-striped is-bordered">

          <tbody>
            <tr>
              <td>
                <div class="field">
                  <label class="label">Primaria</label>
                  <label class="input has-background-light">
                    Nombre: <span v-text="data.primarySchools"></span>
                  </label>
                  <label class="input has-background-light">
                    Clave: <span v-text="data.primarySchools"></span>
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Preescolar</label>
                  <label class="input has-background-light">
                    Nombre: <span v-text="data.preschools"></span>
                  </label>
                  <label class="input has-background-light">
                    Clave: <span v-text="data.preschoolKey"></span>
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Educación inicial</label>
                  <label class="input has-background-light">
                    Nombre: <span v-text="data.earlyChildhoodEducation"></span>
                  </label>
                  <label class="input has-background-light">
                    Clave: <span v-text="data.initialKey"></span>
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Albergues escolares</label>
                  <label class="input has-background-light">
                    Nombre: <span v-text="data.schoolDormitories"></span>
                  </label>
                  <label class="input has-background-light">
                    Clave: <span v-text="data.keyHostels"></span>
                  </label>
                </div>
              </td>

            </tr>

            <tr>
              <td>
                <div class="field">
                  <label class="label">Directivo</label>
                  <label class="input has-background-light"
                    v-text="data.elementarySchoolTeachers">
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Directivos</label>
                  <label class="input has-background-light"
                    v-text="data.preschoolTeachers">
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Directivos</label>
                  <label class="input has-background-light"
                    v-text="data.earlyChildhoodEducationTeachers">
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Jefes</label>
                  <label class="input has-background-light"
                    v-text="data.schoolDormitoryDirectors">
                  </label>
                </div>
              </td>

            </tr>

            <tr>
              <td>
                <div class="field">
                  <label class="label">Personal/label>
                  <label class="input has-background-light"
                    v-text="data.elementarySchoolTeachers">
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                  <label class="input has-background-light"
                    v-text="data.preschoolTeachers">
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                  <label class="input has-background-light"
                    v-text="data.earlyChildhoodEducationTeachers">
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                  <label class="input has-background-light"
                    v-text="data.schoolDormitoryDirectors">
                  </label>
                </div>
              </td>

            </tr>

          </tbody>
        </table>
      </div>

    </section>

  </div>
</div>

</template>

<style scoped>
.ver-reporte-por-comunidad {
  width: 80rem;
}
</style>
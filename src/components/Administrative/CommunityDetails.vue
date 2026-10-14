<script lang="ts">
import { defineComponent, reactive, watchEffect, PropType } from 'vue'

type TeacherDataModel = {
  id: number
  name: string
  lastNameFather: string
  lastNameMother: string
  curp?: string
  rfc?: string
  sex?: string
  budgetKey?: string
  function?: string
  school?: string
  phone?: number
  reason?: number
  admissionDate?: string
  studyProfile?: string
  language?: string
  languageVariant?: string
}

type DataModel = {
  id: number
  nameCommunity: string
  // Primarias
  primarySchools: string
  primaryKey: string
  elementarySchoolTeachers: string
  progressivePrimarySchoolNumbers: number
  primaryStaff: TeacherDataModel[]
  // preescolares
  preschools: string
  preschoolKey: string
  preschoolTeachers: string
  preschoolNumberProgression: number
  preschoolStaff: TeacherDataModel[]
  // Educación inicial
  earlyChildhoodEducation: string
  initialKey: string
  earlyChildhoodEducationTeachers: string
  initialStaff: TeacherDataModel[]
  // Albergues
  schoolDormitories: string
  keyHostels: string
  schoolDormitoryDirectors: string
  shelterStaff: TeacherDataModel[]
}

export default defineComponent({
  name: 'ModalDetail',
  props: {
    show: Boolean,
    data: Object as PropType<DataModel>
  },
  emits: ['close', 'openTeacherInformationModal'],
  setup(props, { emit }) {

    const form = reactive({} as DataModel)

    watchEffect(() => {
      if (props.data) Object.assign(form, props.data)
        console.info('Ver la informacion de form', form)
    })

    return { form, emit }
  }
})
</script>

<template>

<div :class="{'modal': true, 'is-active': show}">
  <div class="modal-background" @click="$emit('close')"></div>

  <div class="modal-card ver-reporte-por-comunidad">

    <header class="modal-card-head">
      <p class="modal-card-title has-text-centered">
        <strong>Comunidad: </strong>
        <span v-text="form.nameCommunity"></span>
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
                    Nombre: <span v-text="form.primarySchools"></span>
                  </label>
                  <label class="input has-background-light">
                    Clave: <span v-text="form.primaryKey"></span>
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Preescolar</label>
                  <label class="input has-background-light">
                    Nombre: <span v-text="form.preschools"></span>
                  </label>
                  <label class="input has-background-light">
                    Clave: <span v-text="form.preschoolKey"></span>
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Educación inicial</label>
                  <label class="input has-background-light">
                    Nombre: <span v-text="form.earlyChildhoodEducation"></span>
                  </label>
                  <label class="input has-background-light">
                    Clave: <span v-text="form.initialKey"></span>
                  </label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Albergues escolares</label>
                  <label class="input has-background-light">
                    Nombre: <span v-text="form.schoolDormitories"></span>
                  </label>
                  <label class="input has-background-light">
                    Clave: <span v-text="form.keyHostels"></span>
                  </label>
                </div>
              </td>

            </tr>

            <tr>
              <td>
                <div class="field">
                  <label class="label">Directivos</label>
                  
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <label class="input has-background-light"
                        v-text="form.elementarySchoolTeachers">
                      </label>
                    </div>
                    <div class="control">
                      <button class="button is-info"
                        @click="$emit('openTeacherInformationModal', stranger)">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Directivos</label>
                  
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <label class="input has-background-light"
                        v-text="form.preschoolTeachers">
                      </label>
                    </div>
                    <div class="control">
                      <button class="button is-info"
                        @click="$emit('openTeacherInformationModal', stranger)">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Directivos</label>
                  
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <label class="input has-background-light"
                        v-text="form.earlyChildhoodEducationTeachers">
                      </label>
                    </div>
                    <div class="control">
                      <button class="button is-info"
                        @click="$emit('openTeacherInformationModal', stranger)">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Jefes</label>
                  
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <label class="input has-background-light" 
                        v-text="form.schoolDormitoryDirectors">
                      </label>
                    </div>
                    <div class="control">
                      <button class="button is-info"
                        @click="$emit('openTeacherInformationModal', stranger)">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                      </button>
                    </div>
                  </div>
                </div>
              </td>

            </tr>

            <tr>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                  <template v-for="stranger in form.primaryStaff" :key="stranger.id">
                    
                    <div class="field has-addons">
                      <div class="control is-expanded">
                        <label class="input has-background-light" v-text="stranger.name">
                        </label>
                      </div>
                      <div class="control">
                        <button class="button is-info"
                          @click="$emit('openTeacherInformationModal', stranger)">
                          <span class="icon"><i class="fas fa-eye"></i></span>
                        </button>
                      </div>
                    </div>
                  </template>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                  <template v-for="stranger in form.preschoolStaff" :key="stranger.id">
                    
                    <div class="field has-addons">
                      <div class="control is-expanded">
                        <label class="input has-background-light" v-text="stranger.name">
                        </label>
                      </div>
                      <div class="control">
                        <button class="button is-info"
                          @click="$emit('openTeacherInformationModal', stranger)">
                          <span class="icon"><i class="fas fa-eye"></i></span>
                        </button>
                      </div>
                    </div>
                  </template>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                  <template v-for="stranger in form.initialStaff" :key="stranger.id">
                    
                    <div class="field has-addons">
                      <div class="control is-expanded">
                        <label class="input has-background-light" v-text="stranger.name">
                        </label>
                      </div>
                      <div class="control">
                        <button class="button is-info" 
                          @click="$emit('openTeacherInformationModal', stranger)">
                          <span class="icon"><i class="fas fa-eye"></i></span>
                        </button>
                      </div>
                    </div>
                  </template>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                  <template v-for="stranger in form.shelterStaff" :key="stranger.id">
                    
                    <div class="field has-addons">
                      <div class="control is-expanded">
                        <label class="input has-background-light" v-text="stranger.name">
                        </label>
                      </div>
                      <div class="control">
                        <button class="button is-info" 
                          @click="$emit('openTeacherInformationModal', stranger)">
                          <span class="icon"><i class="fas fa-eye"></i></span>
                        </button>
                      </div>
                    </div>
                  </template>
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
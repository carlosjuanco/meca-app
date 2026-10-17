<script lang="ts">
import { defineComponent, reactive, ref, watchEffect, PropType, watch } from 'vue'
import helpers from '../../helpers'
import type { DataModel } from '../types/reportePorComunidad'
import type { DataModel as DataModelTeacher} from '../types/teacher'
import ProfesorInformacion from './ProfesorInformacion.vue'

export default defineComponent({
  name: 'CommunityDetails',
  components: { ProfesorInformacion },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object as PropType<DataModel>,
      required: true
    }
  },
  emits: ['close'],
  setup(props) {
    type DataModelStaff = {
      id: number,
      telephone: string,
      type_of_school: string
    }

    const { 
      handleRequest,
      handleErrors,
      phoneTransform,
      convertDate,
    } = helpers()
    // Crear un contador para la key
    const modalKey = ref(0)

    const dataCommunity = reactive({} as DataModel)

    // Inicializar la variable showModalProfesorInformacion en false
    const showModalProfesorInformacion = ref(false)
    // Para que aparezca el loading en cada botón del profesor
    const loadingBottonTeacher = ref(0)
    // Inicializar los datos del formulario 
    const formData = reactive({} as DataModelTeacher)

    /*
      Mostrar el modal para ver la información del profesor

      @row de tipo DataModel

      return void
    */
    const viewInformation = async (id: number) => {
      loadingBottonTeacher.value = id

      try {
        const response = await handleRequest('get', `teacher/${id}`)
        // Transformar el teléfono en el formato xxx xxx xxxx
        // Transformar la fecha de ingreso a la sep de 2026-09-04 a 04/09/2026
        if (response.telephone) {
          response.telephone = phoneTransform(response.telephone.toString()).toString();
        }
        if (response.date_of_entry_into_the_sep) {
          response.date_of_entry_into_the_sep = convertDate(response.date_of_entry_into_the_sep.toString()).toString();
        }

        Object.assign(formData, response)

        loadingBottonTeacher.value = 0

        showModalProfesorInformacion.value = true
      } catch (error) {
        handleErrors(error)
      }
    }

    // Para almacenar los datos del personal de primaria
    const primarySchoolStaffData = reactive<DataModelStaff[]>([])
    // Para almacenar los datos del personal de preescolar
    const preschoolStaffData = reactive<DataModelStaff[]>([])
    // Para almacenar los datos del personal de inicial
    const earlyChildhoodStaffData = reactive<DataModelStaff[]>([])
    // Para almacenar los datos del personal de albergues escolares
    const schoolDormitoryStaffData = reactive<DataModelStaff[]>([])

    /*
      Obtener el personal de una comunidad, menos el director

      @row de tipo DataModel

      return void
    */
    const getTheStaffForACommunity = async (communityId: number) => {
      try {
        const response = await handleRequest('get', `thestaffforacommunity/${communityId}`)

        const elementarySchool = response.filter((row: DataModelStaff) => row.type_of_school == 'Primaria')
        const preschool = response.filter((row: DataModelStaff) => row.type_of_school == 'Preescolar')
        const earlyChildhoodEducation = response.filter((row: DataModelStaff) => row.type_of_school == 'Inicial')
        const schoolHostels = response.filter((row: DataModelStaff) => row.type_of_school == 'Albergues escolares')

        response.map((row: DataModelStaff) => {
          row.telephone = phoneTransform(row.telephone.toString()).toString();
        })

        /*
          Reiniciar el array manteniendo la reactividad
          Los tres puntos son el operador de propagación (spread operator).
            Su función es "expandir" o "desempaquetar" los elementos de un array
        */

        if(elementarySchool) {
          primarySchoolStaffData.splice(0, primarySchoolStaffData.length, ...elementarySchool)
        }
        console.info('Preescolar', preschoolStaffData)
        if(preschool) {
          preschoolStaffData.splice(0, preschoolStaffData.length, ...preschool)
        }
        console.info('Inicial', earlyChildhoodStaffData)
        if(earlyChildhoodEducation) {
          earlyChildhoodStaffData.splice(0, earlyChildhoodStaffData.length, ...earlyChildhoodEducation)
        }
        console.info('Albergues escolares', schoolDormitoryStaffData)
        if(schoolHostels) {
          schoolDormitoryStaffData.splice(0, schoolDormitoryStaffData.length, ...schoolHostels)
        }
        
      } catch (error) {
        handleErrors(error)
      }
    }

    watchEffect(() => {
      if (props.data) Object.assign(dataCommunity, props.data)

      getTheStaffForACommunity(props.data.idComunidad)
    })

    /*
      Miro a props.show, si cambia de valor y es verdadero, entonces ponemos el foco
        al primer elemento del formulario
    */
    watch(() => props.show, async (value: boolean) => {
      if (value) {
        // Incrementar la key cada vez que se abre el modal
        modalKey.value++
      }
    })

    return { 
      dataCommunity,
      showModalProfesorInformacion,
      loadingBottonTeacher,
      formData,
      viewInformation,
      primarySchoolStaffData,
      preschoolStaffData,
      earlyChildhoodStaffData,
      schoolDormitoryStaffData
    }
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
        <span v-text="dataCommunity.nombreComunidad"></span>
      </p>
      <button class="delete" @click="$emit('close')"></button>
    </header>

    <section class="modal-card-body">

      <div class="table-container">
        <table class="table is-fullwidth is-striped is-bordered">

          <tbody>
            <tr>
              <td v-if="dataCommunity.claveEscuelaPrimaria">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Primaria</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Nombre:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.primaria"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Clave:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.claveEscuelaPrimariaCompleta"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td v-if="dataCommunity.claveEscuelaPreescolar">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Preescolar</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Nombre:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.preescolar"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Clave:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.claveEscuelaPreescolarCompleta"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td v-if="dataCommunity.claveEscuelaInicial">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Educación inicial</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Nombre:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.inicial"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Clave:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.claveEscuelaInicialCompleta"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td v-if="dataCommunity.claveEscuelaAlbergueEscolar">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Albergues escolares</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Nombre:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.albergueEscolar"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Clave:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.claveEscuelaAlbergueEscolar"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

            </tr>

            <tr>
              <td v-if="dataCommunity.directivoPrimaria">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Directivos</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Nombre:</label>
                  </div>
                  <div class="field-body">
                    <div class="field has-addons">
                      <div class="control is-expanded">
                      <label class="input has-background-light"
                        v-text="dataCommunity.directivoPrimaria">
                      </label>
                    </div>
                    <div class="control">
                      <button 
                        :class="{'button is-info': true, 'is-loading': loadingBottonTeacher == dataCommunity.idDirectivoPrimaria }"
                        :disabled="loadingBottonTeacher == dataCommunity.idDirectivoPrimaria"
                        @click="viewInformation(dataCommunity.idDirectivoPrimaria)">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Teléfono:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.telefonoDelProfesorDeLaPrimaria"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td v-if="dataCommunity.directivoPreescolar">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Directivos</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Nombre:</label>
                  </div>
                  <div class="field-body">
                    <div class="field has-addons">
                      <div class="control is-expanded">
                      <label class="input has-background-light"
                        v-text="dataCommunity.directivoPreescolar">
                      </label>
                    </div>
                    <div class="control">
                      <button
                        :class="{'button is-info': true, 'is-loading': loadingBottonTeacher == dataCommunity.idDirectivoPreescolar }"
                        :disabled="loadingBottonTeacher == dataCommunity.idDirectivoPreescolar"
                        @click="viewInformation(dataCommunity.idDirectivoPreescolar)">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Teléfono:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.telefonoDelProfesorDePreescolar"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td v-if="dataCommunity.directivoInicial">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Directivos</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Nombre:</label>
                  </div>
                  <div class="field-body">
                    <div class="field has-addons">
                      <div class="control is-expanded">
                      <label class="input has-background-light"
                        v-text="dataCommunity.directivoInicial">
                      </label>
                    </div>
                    <div class="control">
                      <button
                        :class="{'button is-info': true, 'is-loading': loadingBottonTeacher == dataCommunity.idDirectivoInicial }"
                        :disabled="loadingBottonTeacher == dataCommunity.idDirectivoInicial"
                        @click="viewInformation(dataCommunity.idDirectivoInicial)">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Teléfono:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.telefonoDelProfesorDeInicial"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td v-if="dataCommunity.directivoAlbergueEscolar">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Directivos</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Nombre:</label>
                  </div>
                  <div class="field-body">
                    <div class="field has-addons">
                      <div class="control is-expanded">
                      <label class="input has-background-light"
                        v-text="dataCommunity.directivoAlbergueEscolar">
                      </label>
                    </div>
                    <div class="control">
                      <button
                        :class="{'button is-info': true, 'is-loading': loadingBottonTeacher == dataCommunity.idDirectivoAlbergueEscolar }"
                        :disabled="loadingBottonTeacher == dataCommunity.idDirectivoAlbergueEscolar"
                        @click="viewInformation(dataCommunity.idDirectivoAlbergueEscolar)">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Teléfono:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="input has-background-light">
                          <span v-text="dataCommunity.telefonoDelProfesorDelAlbergueEscolar"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

            </tr>

            <tr>
              <td v-if="primarySchoolStaffData.length > 0">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Personal</label>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-for="teacher in primarySchoolStaffData" :key="teacher.id">
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">Nombre:</label>
                    </div>
                    <div class="field-body">
                      <div class="field has-addons">
                        <div class="control is-expanded">
                        <label class="input has-background-light"
                          v-text="teacher.full_name">
                        </label>
                      </div>
                      <div class="control">
                        <button 
                          :class="{'button is-info': true, 'is-loading': loadingBottonTeacher == teacher.id }"
                          :disabled="loadingBottonTeacher == teacher.id"
                          @click="viewInformation(teacher.id, 'Primaria')">
                          <span class="icon"><i class="fas fa-eye"></i></span>
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">Teléfono:</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control">
                          <label class="input has-background-light">
                            <span v-text="teacher.telephone"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </td>
              <td v-if="preschoolStaffData.length > 0">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Personal</label>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-for="teacher in preschoolStaffData" :key="teacher.id">
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">Nombre:</label>
                    </div>
                    <div class="field-body">
                      <div class="field has-addons">
                        <div class="control is-expanded">
                        <label class="input has-background-light"
                          v-text="teacher.full_name">
                        </label>
                      </div>
                      <div class="control">
                        <button 
                          :class="{'button is-info': true, 'is-loading': loadingBottonTeacher == teacher.id }"
                          :disabled="loadingBottonTeacher == teacher.id"
                          @click="viewInformation(teacher.id, 'Primaria')">
                          <span class="icon"><i class="fas fa-eye"></i></span>
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">Teléfono:</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control">
                          <label class="input has-background-light">
                            <span v-text="teacher.telephone"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </td>
              <td v-if="earlyChildhoodStaffData.length > 0">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Personal</label>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-for="teacher in earlyChildhoodStaffData" :key="teacher.id">
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">Nombre:</label>
                    </div>
                    <div class="field-body">
                      <div class="field has-addons">
                        <div class="control is-expanded">
                        <label class="input has-background-light"
                          v-text="teacher.full_name">
                        </label>
                      </div>
                      <div class="control">
                        <button 
                          :class="{'button is-info': true, 'is-loading': loadingBottonTeacher == teacher.id }"
                          :disabled="loadingBottonTeacher == teacher.id"
                          @click="viewInformation(teacher.id, 'Primaria')">
                          <span class="icon"><i class="fas fa-eye"></i></span>
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">Teléfono:</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control">
                          <label class="input has-background-light">
                            <span v-text="teacher.telephone"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </td>
              <td v-if="schoolDormitoryStaffData.length > 0">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <!-- Left empty for spacing -->
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">Personal</label>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-for="teacher in schoolDormitoryStaffData" :key="teacher.id">
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">Nombre:</label>
                    </div>
                    <div class="field-body">
                      <div class="field has-addons">
                        <div class="control is-expanded">
                        <label class="input has-background-light"
                          v-text="teacher.full_name">
                        </label>
                      </div>
                      <div class="control">
                        <button 
                          :class="{'button is-info': true, 'is-loading': loadingBottonTeacher == teacher.id }"
                          :disabled="loadingBottonTeacher == teacher.id"
                          @click="viewInformation(teacher.id, 'Primaria')">
                          <span class="icon"><i class="fas fa-eye"></i></span>
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">Teléfono:</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control">
                          <label class="input has-background-light">
                            <span v-text="teacher.telephone"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </td>

            </tr>

          </tbody>
        </table>
      </div>

    </section>

  </div>

  <!-- Modal para mostrar la información del profesor -->
  <profesor-informacion
    :show="showModalProfesorInformacion"
    :data="formData"
    @close="showModalProfesorInformacion = false"
  />
</div>

</template>

<style scoped>
.ver-reporte-por-comunidad {
  /* Ancho deseado en desktop */
  width: 80rem;
  /* Nunca exceder el viewport (Bulma ya usa 20px de margen en modal-background) */
  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
}

/* El body debe poder hacer scroll en pantallas cortas */
.ver-reporte-por-comunidad .modal-card-body {
  overflow-y: auto;
  flex: 1 1 auto;
}

/* Permitir que valores largos (ej. CURP, RFC) hagan wrap 
  Efectivamente si funciona si hago muy corta chica la pantalla, todo el texto se adapda con el campo
*/
.ver-reporte-por-comunidad .input {
  height: auto;
  white-space: normal;
  word-break: break-word;
  padding: 0.5rem 0.75rem;
  display: block;
  line-height: 1.4;
}

/* ===== Ajustes para móvil / tablet ===== */
@media screen and (max-width: 768px) {
  .ver-reporte-por-comunidad {
    width: calc(100vw - 20px);
    max-width: calc(100vw - 20px);
    margin: 0 10px;
  }

  .ver-reporte-por-comunidad .modal-card-head,
  .ver-reporte-por-comunidad .modal-card-body {
    padding: 1rem;
  }

  .ver-reporte-por-comunidad .modal-card-title {
    font-size: 1.15rem;
  }
}

/* Opcional: modal a pantalla completa en móviles muy chicos */
@media screen and (max-width: 480px) {
  .ver-reporte-por-comunidad {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100vh;
    margin: 0;
    border-radius: 0;
  }
}
</style>
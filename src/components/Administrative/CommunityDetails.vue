<script lang="ts">
import { defineComponent, reactive, ref, watchEffect, PropType, watch } from 'vue'
import type { DataModel } from '../types/reportePorComunidad'

export default defineComponent({
  name: 'CommunityDetails',
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
    // Crear un contador para la key
    const modalKey = ref(0)

    const dataCommunity = reactive({} as DataModel)

    watchEffect(() => {
      if (props.data) Object.assign(dataCommunity, props.data)
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

    return { dataCommunity }
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
                      <button class="button is-info">
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
                      <button class="button is-info">
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
                      <button class="button is-info">
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
                      <button class="button is-info">
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
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
                </div>
              </td>
              <td>
                <div class="field">
                  <label class="label">Personal</label>
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
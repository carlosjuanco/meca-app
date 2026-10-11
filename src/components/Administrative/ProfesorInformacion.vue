<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, PropType } from 'vue'
import helpers from '../../helpers'
import type { DataModel } from '../types/teacher'

export default defineComponent({
  name: 'ProfesorInformacion',
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
    const { 
      convertReverseDate
    } = helpers()
    // Crear un contador para la key
    const modalKey = ref(0)
    // Inicializar la variable form, con datos vacios
    const initialValues = reactive({} as DataModel)

    // Observa a props.data, pero como reemplamos lo de adentro, por eso uso watchEffect
    watchEffect(() => {
      if (props.data) {
        // Lo que me ayuda undefined con la libreria vee-validate, es a crear campos totalmente vacios
        // en caso que no exista un valor en la base de datos.
        let date: string | undefined = undefined
        if(props.data.date_of_entry_into_the_sep) {
          date = convertReverseDate(props.data.date_of_entry_into_the_sep)
        }
        
        Object.assign(initialValues, {
          ...props.data,
          date_of_entry_into_the_sep: date
        })
      }
    })

    /*
      Miro a props.show, si cambia de valor y es verdadero, entonces ponemos el foco
        al primer elemento del formulario
    */
    watch(() => props.show, async (value: boolean) => {
      if (value) {
        // Incrementar la key cada vez que se abre el modal
        modalKey.value++

        // await nextTick()
      }
    })

    return {
      initialValues,
      modalKey
    }
  }
})
</script>

<template>

<div :class="{'modal': true, 'is-active': show}">
  <div class="modal-background" @click="$emit('close')"></div>

  <div class="modal-card ver-informacion-profesor">
    
    <header class="modal-card-head has-background-link">
      <p class="modal-card-title has-text-white">
        <span >Información del profesor</span>
      </p>
      <button class="delete" @click="$emit('close')"></button>
    </header>

    <section class="modal-card-body">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Nombre completo</label>
            <label class="input has-background-light" v-text="data.full_name"></label>
          </div>

          <div class="field">
            <label class="label">CURP</label>
            <label class="input has-background-light" v-text="data.curp"></label>
          </div>

          <div class="field">
            <label class="label">R.F.C.</label>
            <label class="input has-background-light" v-text="data.rfc"></label>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Sexo</label>
            <label class="input has-background-light" v-text="data.gender"></label>
          </div>

          <div class="field">
            <label class="label">Clave presupuestal</label>
            <label class="input has-background-light" v-text="data.budget_code"></label>
          </div>

          <div class="field">
            <label class="label">Función</label>
            <label class="input has-background-light" v-text="data.funcion"></label>
          </div>

          <div class="field">
            <label class="label">Escuela</label>
            <label class="input has-background-light" v-text="data.school ? data.school.name : ''"></label>
          </div>

          <div class="field">
            <label class="label">Teléfono</label>
            <label class="input has-background-light" v-text="data.telephone"></label>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Motivo</label>
            <label class="input has-background-light" v-text="data.motivo"></label>
          </div>

          <div class="field">
            <label class="label">Fecha de ingreso a la SEP</label>
            <label class="input has-background-light" v-text="data.date_of_entry_into_the_sep"></label>
          </div>

          <div class="field">
            <label class="label">Perfil de estudios</label>
            <label class="input has-background-light" v-text="data.study_profile"></label>
          </div>

          <div class="field">
            <label class="label">Lengua</label>
            <label class="input has-background-light" v-text="data.language"></label>
          </div>

          <div class="field">
            <label class="label">Variante de lengua</label>
            <label class="input has-background-light" v-text="data.language_variant"></label>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

</template>
<style scoped>
.ver-informacion-profesor {
  /* Ancho deseado en desktop */
  width: 80rem;
  /* Nunca exceder el viewport (Bulma ya usa 20px de margen en modal-background) */
  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
}

/* El body debe poder hacer scroll en pantallas cortas */
.ver-informacion-profesor .modal-card-body {
  overflow-y: auto;
  flex: 1 1 auto;
}

/* Permitir que valores largos (ej. CURP, RFC) hagan wrap 
  Efectivamente si funciona si hago muy corta chica la pantalla, todo el texto se adapda con el campo
*/
.ver-informacion-profesor .input {
  height: auto;
  white-space: normal;
  word-break: break-word;
  padding: 0.5rem 0.75rem;
  display: block;
  line-height: 1.4;
}

/* ===== Ajustes para móvil / tablet ===== */
@media screen and (max-width: 768px) {
  .ver-informacion-profesor {
    width: calc(100vw - 20px);
    max-width: calc(100vw - 20px);
    margin: 0 10px;
  }

  .ver-informacion-profesor .modal-card-head,
  .ver-informacion-profesor .modal-card-body {
    padding: 1rem;
  }

  .ver-informacion-profesor .modal-card-title {
    font-size: 1.15rem;
  }
}

/* Opcional: modal a pantalla completa en móviles muy chicos */
@media screen and (max-width: 480px) {
  .ver-informacion-profesor {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100vh;
    margin: 0;
    border-radius: 0;
  }
}
</style>
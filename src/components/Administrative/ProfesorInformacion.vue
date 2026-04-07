<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, PropType, nextTick } from 'vue'

type DataModel = {
  id: number
  name: string
  lastNameFather: string
  lastNameMother: string
  curp: string
  rfc: string
  sex: string
  budgetKey: string
  function: string
  school: string
  phone: number
  reason: number
  admissionDate: string
  studyProfile: string
  language: string
  languageVariant: string
}

export default defineComponent({
  name: 'ProfesorInformacion',
  props: {
    show: Boolean,
    data: Object as PropType<DataModel>
  },
  emits: ['close'],
  setup(props, { emit }) {

    let loading = ref(false)
    const form = reactive({} as DataModel)
    const firstInput = ref<HTMLInputElement | null>(null)

    const save = () => {}

    watchEffect(() => {
      if (props.data) Object.assign(form, props.data)
    })

    watch(() => props.show, async (value: boolean) => {
      if (value) {
        await nextTick()
        firstInput.value?.focus()
      }
    })

    return { form, firstInput, save, emit, loading }
  }
})
</script>

<template>

<div :class="{'modal': true, 'is-active': show}">
  <div class="modal-background" @click="$emit('close')"></div>

  <div class="modal-card ver-informacion-profesor">
    
    <header class="modal-card-head">
      <p class="modal-card-title">
        <span >Información del profesor</span>
      </p>
      <button class="delete" @click="$emit('close')"></button>
    </header>

    <section class="modal-card-body">
      <div class="columns">
        <div class="column">

          <div class="field">
            <label class="label">Nombre</label>
            <label class="input has-background-light" v-text="form.name"></label>
          </div>

          <div class="field">
            <label class="label">Apellido paterno</label>
            <label class="input has-background-light" v-text="form.lastNameFather"></label>
          </div>

          <div class="field">
            <label class="label">Apellido materno</label>
            <label class="input has-background-light" v-text="form.lastNameMother"></label>
          </div>

          <div class="field">
            <label class="label">CURP</label>
            <label class="input has-background-light" v-text="form.curp"></label>
          </div>

          <div class="field">
            <label class="label">R.F.C.</label>
            <label class="input has-background-light" v-text="form.rfc"></label>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Sexo</label>
            <label class="input has-background-light" v-text="form.sex"></label>
          </div>

          <div class="field">
            <label class="label">Clave presupuestal</label>
            <label class="input has-background-light" v-text="form.budgetKey"></label>
          </div>

          <div class="field">
            <label class="label">Función</label>
            <label class="input has-background-light" v-text="form.function"></label>
          </div>

          <div class="field">
            <label class="label">Escuela</label>
            <label class="input has-background-light" v-text="form.school"></label>
          </div>

          <div class="field">
            <label class="label">Teléfono</label>
            <label class="input has-background-light" v-text="form.phone"></label>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Motivo</label>
            <label class="input has-background-light" v-text="form.reason"></label>
          </div>

          <div class="field">
            <label class="label">Fecha de ingreso a la SEP</label>
            <label class="input has-background-light" v-text="form.admissionDate"></label>
          </div>

          <div class="field">
            <label class="label">Perfil de estudios</label>
            <label class="input has-background-light" v-text="form.studyProfile"></label>
          </div>

          <div class="field">
            <label class="label">Lengua</label>
            <label class="input has-background-light" v-text="form.language"></label>
          </div>

          <div class="field">
            <label class="label">Variante de lengua</label>
            <label class="input has-background-light" v-text="form.languageVariant"></label>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

</template>
<style scoped>
.ver-informacion-profesor {
  width: 80rem;
}
</style>
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
  name: 'ProfesorForm',
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

  <div class="modal-card">

    <header class="modal-card-head">
      <p class="modal-card-title">
        <span v-if="form.id">Editar profesor</span>
        <span v-else>Nuevo profesor</span>
      </p>
      <button class="delete" @click="$emit('close')"></button>
    </header>

    <section class="modal-card-body">
    
      <div class="field">
        <label class="label">Nombre</label>
        <input ref="firstInput" v-model="form.name" class="input">
      </div>

      <div class="field">
        <label class="label">Apellido paterno</label>
        <input v-model="form.lastNameFather" class="input">
      </div>

      <div class="field">
        <label class="label">Apellido materno</label>
        <input v-model="form.lastNameMother" class="input">
      </div>

      <div class="field">
        <label class="label">CURP</label>
        <input v-model="form.curp" class="input">
      </div>

      <div class="field">
        <label class="label">R.F.C.</label>
        <input v-model="form.rfc" class="input">
      </div>

      <div class="field">
        <label class="label">Sexo</label>
        <div class="select is-fullwidth">
          <select v-model="form.sex">
            <option>Femenino</option>
            <option>Masculino</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Clave presupuestal</label>
        <input v-model="form.budgetKey" class="input">
      </div>

      <div class="field">
        <label class="label">Función</label>
        <div class="select is-fullwidth">
          <select v-model="form.function">
            <option>Docente</option>
            <option>Administrativo</option>
            <option>Docente con grupo</option>
            <option>Director</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Escuela</label>
        <div class="select is-fullwidth">
          <select v-model="form.school">
            <option>Redencion</option>
            <option>Jose Maria Morelos y Pavon</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Teléfono</label>
        <input v-model="form.phone" class="input">
      </div>

      <div class="field">
        <label class="label">Motivo</label>
        <input v-model="form.reason" class="input">
      </div>

      <div class="field">
        <label class="label">Fecha de ingreso a la SEP</label>
        <input v-model="form.admissionDate" class="input">
      </div>

      <div class="field">
        <label class="label">Perfil de estudios</label>
        <div class="select is-fullwidth">
          <select v-model="form.studyProfile">
            <option>Titulado de U.P.N.</option>
            <option>Pasante de normal superior</option>
            <option>Pasante de maestría</option>
            <option>Pasante de U.P.N.</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Lengua</label>
        <div class="select is-fullwidth">
          <select v-model="form.language">
            <option>Mixteca</option>
            <option>Cañada</option>
            <option>Costa</option>
            <option>Istmo</option>
            <option>Papaloapan</option>
            <option>Sierra sur</option>
            <option>Sierra norte</option>
            <option>Valles centrales</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Variante de lengua</label>
        <div class="select is-fullwidth">
          <select v-model="form.languageVariant">
            <option>Alta</option>
            <option>Baja</option>
          </select>
        </div>
      </div>

    </section>

    <footer class="modal-card-foot">
      <div class="buttons">
        <button class="button is-link" v-if="!loading" @click="save">
          <span v-if="data.id">Actualizar</span>
          <span v-else>Guardar</span>
        </button>
        <button class="button" @click="$emit('close')">Cancelar</button>
      </div>
    </footer>

  </div>
</div>

</template>
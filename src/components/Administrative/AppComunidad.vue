<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import ComunidadForm from './ComunidadForm.vue'

export default defineComponent({
  name: 'AppComunidad',
  components: { ComunidadForm },
  setup () {
    interface Form {
      id: number
    }
    let showForm = ref(false)
    let formData = reactive<Form>({
      id: 0
    });
    const viewForm = () => {
      showForm.value = true
    }
    return {
      showForm,
      formData,
      viewForm
    }
  }
})
</script>

<template>
  <div class="columns">
    <div class="column">
      <button class="button is-link is-fullwidth"
        @click="viewForm()">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>Agregar nueva comunidad</span>
      </button>
    </div>
  </div>
  <comunidad-form
    :show="showForm"
    :data="formData"
    @close="showForm = false"
  ></comunidad-form>
</template>
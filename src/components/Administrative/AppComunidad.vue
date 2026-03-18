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
  <div class="columns">
    <div class="column">
      <div class="field has-addons">
        <div class="control is-expanded">
          <input class="input" type="text" placeholder="Buscar comunidad">
        </div>
        <div class="control">
          <button class="button is-info">
            Buscar
          </button>
        </div>
        <p class="control">
          <span class="select">
            <select>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>Todos</option>
            </select>
          </span>
        </p>
      </div>
    </div>
  </div>
  <div class="table-container">
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr class="is-primary">
          <th class="has-text-left">
              Nombre de la comunidad
          </th>
          <th>
              Operaciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="has-text-left is-vcentered">Santa María Peñoles</td>
          <td class="is-vcentered">
            <button type="button" class="button is-link">
              <span class="icon">
                <i class="fas fa-edit"></i>
              </span>
            </button>
            <button type="button" class="button is-danger">
              <span class="icon">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <comunidad-form
    :show="showForm"
    :data="formData"
    @close="showForm = false"
  ></comunidad-form>
</template>
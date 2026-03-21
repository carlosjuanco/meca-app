<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import ComunidadForm from './ComunidadForm.vue'

export default defineComponent({
  name: 'AppComunidad',
  components: { ComunidadForm },
  emits: ['destroy'],
  props: {},
  setup (props, { emit }) {
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

    const deleteCommunity = () => {
      console.info('Sin estoy dando clic')
      emit('destroy')
    }
    return {
      showForm,
      formData,
      viewForm,
      deleteCommunity
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
            <button type="button" class="button is-link" @click="viewForm()">
              <span class="icon">
                <i class="fas fa-edit"></i>
              </span>
            </button>
            <button type="button" class="button is-danger" @click="deleteCommunity()">
              <span class="icon">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="has-background-white-bis">
          <td colspan="2">
            <nav class="pagination" role="navigation" aria-label="pagination">
              <a href="#" class="pagination-previous">Antes</a>
              <a href="#" class="pagination-next">Siguiente</a>
              <ul class="pagination-list">
                <li>
                  <a href="#" class="pagination-link" aria-label="Goto page 1">1</a>
                </li>
                <li>
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a href="#" class="pagination-link" aria-label="Goto page 45">45</a>
                </li>
                <li>
                  <a
                    class="pagination-link is-current"
                    aria-label="Page 46"
                    aria-current="page"
                    >46</a
                  >
                </li>
                <li>
                  <a href="#" class="pagination-link" aria-label="Goto page 47">47</a>
                </li>
                <li>
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a href="#" class="pagination-link" aria-label="Goto page 86">86</a>
                </li>
              </ul>
            </nav>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  <comunidad-form
    :show="showForm"
    :data="formData"
    @close="showForm = false"
  ></comunidad-form>
</template>
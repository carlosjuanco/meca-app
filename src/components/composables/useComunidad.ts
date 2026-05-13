import { ref, reactive } from 'vue'
import type { Store } from 'vuex'
import helpers from '../../helpers'
import type { DataModel, PaginationModel, DeleteModalData } from '../types/comunidad'

export const useComunidad = (store: Store<any>) => {
  const { handleRequest, handleErrors } = helpers()

  // Inicializar la variable showForm en false
  const showForm = ref(false)

  // Variable para realizar búsquedas
  const search = ref('')
  const itemsPerPage = ref('10')

  // Establecer la ruta del componente
  const basePath = '/communities/'

  // Inicializar los datos del formulario 
  const formData = reactive<DataModel>({
    id: 0,
    name: ''
  })
  
  const data = reactive<DataModel[]>([])

  // Inicializar los datos para la paginación
  const pagination = ref({} as PaginationModel)
  
  const buildApiUrl = (): string => {
    let effectiveItemsPerPage = itemsPerPage.value
    
    /*
      Caso
      -Si el usuario elegi mostrar 'Todos' los registros entonces
        debo establecer el valor de paginate.value = a el total de
        todos los registros que existen en la base de datos, este
        valor lo trae pagination.total.
        No debe de haber problemas porque siempre que se seleccione
        'Total' ya se hizo por primera vez una petición
    */
    if (effectiveItemsPerPage === 'Todos' && pagination.value.total) {
      effectiveItemsPerPage = pagination.value.total.toString()
    }
    
    if (pagination.value.data) {
      /*
        Contexto: Siempre que realicemos un nuevo registro o una busqueda, ya
          existen datos en pagination.value.data.
        Casos
        -Si comienza a realizar una búsqueda y estamos en la página 2, si busca bien,
          pero como estabamos en la página 2, establece esa búsqueda, entonces,
          solo entonces, debemos comenzar en la página 1, ya que al navegar por los
          resultados funciona correctamente.
        -Solo si es un registro nuevo, volver a la primera página.
      */
      if(search.value != '' || formData.id == 0) {
        pagination.value.current_page = 1
      }

      return `${basePath}${effectiveItemsPerPage}/${search.value}?page=${pagination.value.current_page}`
    }
    
    return `${basePath}${effectiveItemsPerPage}/${search.value}`
  }
  
  const fetchData = async (url?: string) => {
    try {
      const finalUrl = url || buildApiUrl()
      const response = await handleRequest('get', finalUrl)
      
      /*
        Reiniciar el array manteniendo la reactividad
        Los tres puntos son el operador de propagación (spread operator). Su función es "expandir" o "desempaquetar" los elementos de un array
      */
      data.splice(0, data.length, ...response.data)
      
      pagination.value = response

      /*
        Cada vez que guarde un registro por primera vez o edite un
          reestablecer el id de la variable formData, para mostrar un 
          nuevo formulario reconstruido, esto por reglas de vue js.
      */
      formData.id = 0
    } catch (error) {
      handleErrors(error)
    }
  }
  
  const refreshData = () => {
    fetchData()
  }
  
  /*
    Muestrar el modal para registrar o editar

    @row de tipo DataModel

    return void
  */
  const openForm = (row: DataModel | null) => {
    // Si row viene vacio entonces mandamos un objeto vacio de tipo DataModel
    Object.assign(formData, row || { id: 0, name: '' })
    showForm.value = true
  }
  
  /*
    Mandamos a llamar al método modalDelete, para abrir la modal
      para eliminar.

    @eliminate de tipo DataFromTheEliminationModel

    return void
  */
  const confirmDelete = (item: DataModel): void => {
    const deleteData: DeleteModalData = {
      id: item.id,
      description: item.name,
      showModalDelete: true,
      route: `${basePath}${item.id}`
    }
    
    store.dispatch('modalDelete', deleteData)
  }
  
  /*
    Observamos store.getters.dataFromTheEliminationModel.acceptDelete, para determinar si acepto
      eliminar, si fue el caso, entonces, comenzamos a eliminar para que se muestre que esta 
      siendo eliminado.

    @acceptDelete de tipo boolean

    return void
  */
  const handleRowDeletion = (wasRemovedProperly: boolean, removedId: number) => {
    if (!wasRemovedProperly) return
    
    const targetRow = data.find(row => row.id === removedId)
    if (targetRow) {
      targetRow.animateDisappearRow = true
    }
  }
  
  /*
    Identificar en que momento se termina la animación
      cuando termina la animacion ocultamos realmente la fila

    @row de tipo DataModel

    return void
  */
  const onAnimationEnd = (row: DataModel) => {
    row.hideRow = true
  }
  
  return {
    // Estado
    showForm,
    formData,
    data,
    pagination,
    search,
    itemsPerPage,
    
    // Métodos
    openForm,
    confirmDelete,
    handleRowDeletion,
    onAnimationEnd,
    refreshData,
    fetchData
  }
}
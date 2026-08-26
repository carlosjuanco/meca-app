import { ref, reactive } from 'vue'
import helpers from '../../helpers'
import type { DataModel, PaginationModel } from '../types/teacher'

export const useTeacher = () => {
  const { handleRequest, handleErrors } = helpers()

  // Inicializar la variable showForm en false
  const showForm = ref(false)

  // Variable para realizar búsquedas
  const search = ref('')

  // Variable donde indicamos que comenzamos la paginación en 10 registros
  const itemsPerPage = ref('10')

  // Establecer la ruta del componente
  const basePath = '/teachers/'

  // Inicializar los datos del formulario 
  const formData = reactive<DataModel>({
    id: 0,
    name: '',
    paternal_surname: '',
    curp: '',
    rfc: '',
    gender: '',
    budget_code: '',
    telephone: 0,
    school_id: 0
  })
  
  const data = reactive<DataModel[]>([])

  // Inicializar los datos para la paginación
  const pagination = ref({} as PaginationModel)

  // Inicializar la variable dataInternalNotification con datos vacios
  const dataInternalNotification = ref({})

  // Inicializar la variable para mostrar u ocultar el dialogo notificaciones internas
  const showModalInternalNotification = ref(false)
  
  const buildApiUrl = (): string => {
    let effectiveItemsPerPage = itemsPerPage.value
    
    /*
      Caso
      -Si el usuario elige mostrar 'Todos', entonces debo establecer
        el valor de paginate.value = a el total de
        todos los registros que existen en la base de datos, este
        valor lo puedo extraer de pagination.total
        
        No debe de haber problemas porque siempre que se seleccione
        'Total' ya se hizo por primera vez una petición
    */
    if (effectiveItemsPerPage === 'Todos' && pagination.value.total) {
      effectiveItemsPerPage = pagination.value.total.toString()
    }
    
    if (pagination.value.data) {
      /*
        Contexto: Siempre que realicemos un nuevo registro o una búsqueda, ya
          existen datos en pagination.value.data.
        Casos
        -Si comienza a realizar una búsqueda y estamos en la página 2, si busca bien,
          pero como estábamos en la página 2, establece esa búsqueda, entonces,
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
        Los tres puntos son el operador de propagación (spread operator).
          Su función es "expandir" o "desempaquetar" los elementos de un array
      */
      data.splice(0, data.length, ...response.data)
      
      pagination.value = response

      /*
        Cada vez que guarde un registro por primera vez o edite uno
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
    Object.assign(formData, row || { 
      id: 0,
      name: '',
      paternal_surname: '',
      maternal_surname: undefined,
      curp: '',
      rfc: '',
      gender: '',
      budget_code: '',
      funcion: undefined,
      telephone: 0,
      reason: undefined,
      date_of_entry_into_the_sep: undefined,
      study_profile: undefined,
      language: undefined,
      language_variant: undefined,
      school_id: 0,
    })
    showForm.value = true
  }
  
  /*
    Mandamos a llamar al método modalDelete, para abrir la modal
      para eliminar.

    @item de tipo DataModel

    return void
  */
  const confirmDelete = (item: DataModel): void => {
    /**
     * ================================================
     * OPERADOR DE COALESCENCIA NULA (??)
     * ================================================
     * 
     * DEFINICIÓN OFICIAL (MDN):
     * El operador de coalescencia nula (??) es un operador lógico que 
     * retorna el operando del lado derecho cuando el izquierdo es 
     * null o undefined, y en caso contrario, retorna el operando 
     * del lado izquierdo.
     * 
     * Esto significa que solo reacciona ante dos valores específicos: null y undefined.
     */
    dataInternalNotification.value = {
      type: 'Ayuda',
      message: `¿Seguro que desea eliminar ${item.name} ${item.paternal_surname} ${item.paternal_surname ?? ''}?`,
      onConfirm: async () => {
        try {
          await handleRequest('delete', `${basePath}${item.id}`)

          showModalInternalNotification.value = false

          const targetRow = data.find(row => row.id === item.id)
          if (targetRow) {
            targetRow.animateDisappearRow = true
          }
        }
        catch (error) {
          console.info(handleErrors(error))
        }
      },
      onReject: () => console.log('Cancelado')
    }

    showModalInternalNotification.value = true
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
    dataInternalNotification,
    showModalInternalNotification,
    onAnimationEnd,
    refreshData,
    fetchData
  }
}
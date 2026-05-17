import { ref, reactive, computed, watch, type Ref } from 'vue'
import type { Store } from 'vuex'
import helpers from '../../helpers'
import type {
  CrudItem,
  PaginationLink,
  PaginationResponse,
  CrudConfig,
  UseCrudOptions
} from '../types/crud'

export const useCrud = <T extends CrudItem>(
  store: Store<any>,
  config: CrudConfig,
  options: UseCrudOptions = {}
) => {
  const { handleRequest, handleErrors } = helpers()
  
  /*
    Opciones por defecto

    La línea 26 al 30 extrae propiedades del objeto options y si alguna propiedad no existe,
      le asigna un valor por defecto.
    En typescript o javascript se llama destructuración con valores por defecto
  */
  const {
    defaultItemsPerPage = 10,
    enableSearch = true,
    enablePagination = true
  } = options
  
  // ============ Estado reactivo ============
  // Inicializar la variable showForm en false
  const showForm = ref(false)
   // Variable para realizar búsquedas
  const search = ref('')
  // Variable que sirve para establecer el total de resultados a visualizar
  const itemsPerPage = ref<string | number>(defaultItemsPerPage)
  /*
    ¿Qué es isLoading?

    Es un estado reactivo que indica si hay una operación asíncrona en curso 
    (peticiones al servidor, guardado, eliminación, etc.).
  */
  const isLoading = ref(false) // Inicialmente: no hay operaciones cargando
  /*
    Indica que el objeto reactivo será del tipo T (el mismo que se pasó al composable)
    Crea un objeto con propiedades mínimas que existen en CrudItem

    ¿Qué maneja selectedItem?

    selectedItem maneja el ítem actualmente seleccionado en el formulario para
      crear o editar registros.
      
    Son los datos del formulario 
  */
  const selectedItem = reactive<T>({ id: 0 } as T)
  /*
    ¿Qué maneja items?

    items maneja la lista completa de registros obtenidos del servidor, que se 
      muestran típicamente en una tabla o lista en la interfaz de usuario.
  */
  const items = reactive<T[]>([])
  const pagination = ref({} as PaginationResponse<T>)
  
  // ============ Propiedades computadas ============
  /*
    ¿Qué son las propiedades computadas?

    Las propiedades computadas (computed properties) son valores que se calculan
      automáticamente basándose en otras propiedades reactivas. Se actualizan
      solas cuando sus dependencias cambian.
  */
  const isEditing = computed(() => selectedItem.id > 0)
  const hasItems = computed(() => items.length > 0)
  const totalItems = computed(() => pagination.value.total || 0)
  
  // ============ Métodos privados ============
  const buildApiUrl = (): string => {
    let effectiveItemsPerPage = itemsPerPage.value
    
    /*
      Manejar caso especial "Todos"

      Caso
      -Si el usuario elige mostrar 'Todos', entonces debo establecer
        el valor de paginate.value = a el total de
        todos los registros que existen en la base de datos, este
        valor lo puedo extraer de pagination.total

        No debe de haber problemas porque siempre que se seleccione
        'Total' ya se hizo por primera vez una petición

        paginate.value = effectiveItemsPerPage
    */
    if (effectiveItemsPerPage === 'Todos' && pagination.value.total) {
      effectiveItemsPerPage = pagination.value.total.toString()
    }
    
    // Siempre debemos de habilitar la búsqueda
    const searchParam = enableSearch ? `/${search.value}` : ''

    // Siempre debemos de habilitar la paginación
    if (enablePagination && pagination.value.current_page) {
      /*
        Contexto: Siempre que realicemos un nuevo registro o una búsqueda, ya
          existen datos en pagination.value.data.
        Casos
        -Si comienza a realizar una búsqueda y estamos en la página 2, si busca bien,
          pero como estabamos en la página 2, establece esa búsqueda, entonces,
          solo entonces, debemos comenzar en la página 1, ya que al navegar por los
          resultados funciona correctamente.
        -Solo si es un registro nuevo, volver a la primera página.
      */
      if(searchParam != '' || selectedItem.id == 0) {
        pagination.value.current_page = 1
      }
      return `${config.basePath}${effectiveItemsPerPage}${searchParam}?page=${pagination.value.current_page}`
    }
    
    return `${config.basePath}${effectiveItemsPerPage}${searchParam}`
  }
  
  // ============ Métodos públicos ============
  
  /**
   * Obtiene datos del servidor
   */
  const fetchItems = async (customUrl?: string): Promise<void> => {
    isLoading.value = true
    
    try {
      const url = customUrl || buildApiUrl()
      const response = await handleRequest('get', url) as PaginationResponse<T>
      
      // Limpiar y actualizar items
      items.splice(0, items.length, ...response.data)
      
      if (enablePagination) {
        pagination.value = response
      }
      
      // Resetear selección
      selectedItem.id = 0
    } catch (error) {
      handleErrors(error)
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Refresca los datos (manteniendo filtros actuales)
   */
  const refresh = (): void => {
    fetchItems()
  }
  
  /**
   * Abre el formulario para crear o editar
   */
  const openForm = (item: T | null = null): void => {
    // Resetear o copiar item
    if (item) {
      Object.assign(selectedItem, { ...item })
    } else {
      Object.assign(selectedItem, { id: 0, name: '' } as T)
    }
    
    showForm.value = true
  }
  
  /**
   * Cierra el formulario
   */
  const closeForm = (): void => {
    showForm.value = false
  }
  
  /**
   * Guarda (crea o actualiza) un item
   */
  const saveItem = async (formData: T): Promise<{ success: boolean; message?: string }> => {
    isLoading.value = true
    
    try {
      const isEdit = !!formData.id
      const route = isEdit ? config.basePath : `${config.basePath}store`
      const response = await handleRequest('post', route, formData, formData.id)
      
      closeForm()
      await refresh()
      
      return {
        success: true,
        message: response.message || `${config.entityName} guardado correctamente`
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || `Error al guardar ${config.entityName}`
      }
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Confirma eliminación (usando modal del store si está configurado)
   */
  const confirmDelete = (item: T): void => {
    if (config.storeDeleteAction) {
      store.dispatch(config.storeDeleteAction, {
        id: item.id,
        description: item.name,
        showModalDelete: true,
        route: `${config.basePath}${item.id}`
      })
    } else {
      // Si no hay acción configurada, eliminación directa
      deleteItem(item.id)
    }
  }
  
  /**
   * Elimina un item directamente (sin modal)
   */
  const deleteItem = async (id: number): Promise<boolean> => {
    isLoading.value = true
    
    try {
      await handleRequest('delete', `${config.basePath}${id}`)
      await refresh()
      return true
    } catch (error) {
      handleErrors(error)
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Maneja la animación de eliminación y oculta la fila
   */
  const handleDeleteAnimation = (item: T): void => {
    const targetItem = items.find(i => i.id === item.id)
    if (targetItem) {
      targetItem.animateDisappearRow = true
    }
  }
  
  /**
   * Marca un item como oculto después de la animación
   */
  const onAnimationEnd = (item: T): void => {
    item.hideRow = true
  }
  
  /**
   * Limpia los filtros de búsqueda
   */
  const clearFilters = (): void => {
    search.value = ''
    itemsPerPage.value = defaultItemsPerPage
    refresh()
  }
  
  // ============ Watchers ============
  if (enableSearch) {
    watch(() => search.value, () => {
      refresh()
    })
  }
  
  watch(() => itemsPerPage.value, () => {
    refresh()
  })
  
  // ============ Retorno ============
  return {
    // Estado
    showForm,
    search,
    itemsPerPage,
    isLoading,
    selectedItem,
    items,
    pagination,
    
    // Computadas
    isEditing,
    hasItems,
    totalItems,
    
    // Métodos
    fetchItems,
    refresh,
    openForm,
    closeForm,
    saveItem,
    confirmDelete,
    deleteItem,
    handleDeleteAnimation,
    onAnimationEnd,
    clearFilters
  }
}
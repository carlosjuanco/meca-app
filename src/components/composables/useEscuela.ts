import { useCrud, type CrudItem } from './useCrud'
import type { Store } from 'vuex'

// Definir el tipo específico para Escuela
export type Escuela = CrudItem & {
  // Puedes agregar más propiedades específicas de comunidad aquí
  school: string
  code: string
  schoolType: string
  location: string
  progressiveNumber: string
  animateDisappearRow?: boolean
  hideRow?: boolean
}

export const useEscuela = (store: Store<any>) => {
  return useCrud<Escuela>(store, {
    basePath: '/schools/',
    entityName: 'escuela',
    storeDeleteAction: 'modalDelete'  // Usar el modal del store
  }, {
    defaultItemsPerPage: 10,
    enableSearch: true,
    enablePagination: true
  })
}
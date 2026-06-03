// Definimos la estructura principal para los enlaces de paginación
export type PaginationLink = {
  url: string;
  label: string;
  active: boolean;
}

// Definimos la estructura principal del modal para eliminar
export type DeleteModalData = {
  id: number;
  description: string | undefined;
  showModalDelete: boolean;
  route?: string;
}

// Describir la forma del objeto para el modal interno
export type DataModelInternal = {
  type: 'Exito' | 'Error' | 'Ayuda' | 'Advertencia'
  message?: string
  errors?: { [key: string]: any }
  onConfirm?: () => void
  onReject?: () => void
}
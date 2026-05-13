// Describir la forma del objeto para almacenar los datos
export type DataModel = {
  id: number;
  name: string;
  animateDisappearRow?: boolean;
  hideRow?: boolean;
}

// Describir la forma del objeto del paginador
export type DataModelLink = {
  url: string;
  label: string;
  active: boolean;
}

export type PaginationModel = {
  current_page: number;
  data: DataModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: DataModelLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

// Definimos la estructura princpal del modal para eliminar
export type DeleteModalData = {
  id: number;
  description: string;
  showModalDelete: boolean;
  route?: string;
}

// Describir la forma del objeto para el modal interno
export type DataModelInternal = {
  message: string;
  errors?: { [key: string]: any };
  type: string;
}
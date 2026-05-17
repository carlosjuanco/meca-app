// Tipos genéricos
export type CrudItem = {
  id: number;
  [key: string]: any; // Permite propiedades adicionales
}

export type PaginationLink = {
  url: string;
  label: string;
  active: boolean;
}
/*
  ¿Qué es <T extends CrudItem>?

  Es una declaración de tipo genérico (Generic Type) en TypeScript.
  La T es como una "variable de tipo" que se definirá cuando se use la función.

  <T extends CrudItem> significa:

  <T> : Declara un tipo genérico llamado T
  extends CrudItem : Restringe que T debe cumplir con la estructura de CrudItem

  Fuente: https://chat.deepseek.com/share/fcb787226ii9wy8vl6
*/
export type PaginationResponse<T extends CrudItem> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export type CrudConfig = {
  basePath: string;           // Ejemplo: '/communities/'
  entityName: string;         // Ejemplo: 'comunidad' (para mensajes)
  storeDeleteAction?: string; // Ejemplo: 'modalDelete' (opcional)
}

export type UseCrudOptions = {
  defaultItemsPerPage?: number | 'Todos';
  enableSearch?: boolean;
  enablePagination?: boolean;
}
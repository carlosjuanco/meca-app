import type { PaginationLink } from './tiposGenericos'
/**
 * Describir la forma del objeto para almacenar los datos
 * 
 * Para los nombre de propiedades no respetaremos el estilo de escritura
 *  CamelCase, porque son los nombre de los campos en la base de datos.
 * 
 * Los campos animateDisappearRow y hideRow, seguiré respetando es estilo
 *  de escritura CamelCase.
*/

export type DataModel = {
  id: number;
  /**
   * Me sirve poner undefined, cuando el campo no es obligatorio
   * Por ejemplo en el método openForm, al reestablecer el valor
   * a un string vacio y el campo name en el esquema de validaciones
   * no es obligatorio, valida forzosamente que se ingrese al menos un
   * caracter, pero repito el campo no es obligatorio.
   * 
   * En cambio al reestablecer el valor de name como undefined
   * valida que el campo name no sea obligatorio.
   */

  name?: string | undefined;
  key?: string | undefined;
  type_of_school: string;
  community_id: number;
  secondary_number?: number | undefined | null;
  animateDisappearRow?: boolean;
  hideRow?: boolean;
}

/**
 * Describir la forma del objeto para la paginación
 * 
 * Para los nombre de propiedades no respetaremos el estilo de escritura
 *  CamelCase, porque son campos que da por defecto laravel.
*/
export type PaginationModel = {
  current_page: number;
  data: DataModel[];
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
import axios, { AxiosResponse } from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const helpers = () => {
    const store = useStore()
    const router = useRouter()

    /**
     * Maneja y normaliza los errores provenientes de peticiones HTTP, especialmente
     * aquellos enviados por Laravel en respuestas con código de estado 422.
     *
     * @param {any} error - Objeto de error capturado en el bloque catch de axios/fetch.
     * @returns {Object} Objeto de errores normalizado donde cada clave es el campo
     *                   y el valor es el primer mensaje de error asociado.
     *
     * @description
     * Esta función procesa errores de validación y otros errores HTTP, priorizando
     * el formato que Laravel retorna en sus validaciones.
     *
     * ### Casos de uso:
     *
     * 1. **Errores de validación de Laravel** (status 422):
     *    - Formato esperado: `response.data.errors`
     *    - Ejemplo de Laravel con múltiples errores:
     *      ```data
     *      {
     *        "errors": {
     *          "email": ["El email es requerido", "El email debe ser válido"],
     *          "password": ["La contraseña debe tener mínimo 8 caracteres"]
     *        }
     *      }
     *      ```
     *    - Resultado: `[{ email: "El email es requerido", password: "La contraseña..." }]`
     *
     * 2. **Error personalizado de contraseña** (desde AuthController):
     *    - Formato manual retornado desde el backend:
     *      ```data
     *      {
     *        "errors": {
     *          "password": ["Contraseña incorrecta"]
     *        }
     *      }
     *      ```
     *    - Resultado: `[{ password: "Contraseña incorrecta" }]`
     *
     * 3. **Otros errores HTTP con mensaje simple**:
     *    - Formato: `response.data.message`
     *    - Resultado: `{ message: "Mensaje del error" }`
     *
     * 4. **Errores de red o conexión**:
     *    - Resultado: `{ message: error.message }`
     *
     * ### Comportamiento específico:
     * - Cuando hay múltiples errores de validación en un mismo campo, solo se toma
     *   el primer mensaje.
     * - En validaciones con múltiples campos incorrectos (ej: email y password),
     *   la función extrae el primer error de cada campo.
     * - Si el backend retorna un error de autenticación personalizado, este se
     *   procesa igual que los errores de validación tradicionales.
     *
     * ### Integración con AppLogin.vue:
     * La función permite que el componente de login maneje uniformemente:
     * - Errores de validación automáticos de Laravel
     * - Errores de contraseña incorrecta (manejados manualmente en el backend)
     * - Ambos tipos de error se presentan al usuario de forma consistente
     *
     * @example
     * // Uso típico en un componente Vue
     * try {
     *   await axios.post('/login', formData)
     * } catch (error) {
     *   const errors = handleErrors(error)
     *   // errors = { email: "El email es requerido", password: "Contraseña incorrecta" }
     *   mostrarErroresAlUsuario(errors)
     * }
     */
    const handleErrors = (error: any) => {
        const errors: { [key: string]: any } = {}
        
        if (error.response) {
            if (error.response.data.errors) {
                // Procesa errores de validación de Laravel
                Object.entries(error.response.data.errors).forEach(([key, value]) => {
                    const valor = value as string[]
                    errors[key] = valor[0] // Solo toma el primer mensaje del campo
                })
            } else {
                // Otros errores HTTP con mensaje simple
                errors['message'] = error.response.data.message
            }
        } else {
            // Errores de red, timeout, etc.
            errors['message'] = error.message
        }

        return errors
    }

    const logout = async () => {
        try {
            await store.dispatch('logout')

            router.replace({ name: 'login' })
        }
        catch (error) {
            // handleErrors(error)
        }
    }

    const getInformationUser = () => {
        return store.getters.user
    }

    interface Fields {
        [key: string]: any // o un tipo más específico si sabes qué tipo de datos esperar
    }

    interface Data {
        [key: string]: any // o un tipo más específico si sabes qué tipo de datos esperar
    }

    interface Form {
        errors: { [key: string]: string }
        data: { [key: string]: any }
    }

    const setForm = (fields: Fields, data: Data) => {
        const form: Form = {
            errors: {},
            data: {}
        }

        Object.keys(fields).map(k => {
            if (k != '_method') {
                form.data[k] = data[k] ? data[k] : ''
            }
        })

        return form
    }

    /*
        response puede tener la siguiente estructura.

        config:
        data:
        headers:
        request:
        status:
        statusText:

        return response
    */

    const handleRequest = async (method: string, url: string, data?: Data, id?: number) => {
        if (url.endsWith('/')) {
            url = url.slice(0, -1)
        }

        if (id) {
            url += `/${id}`
            data = data ?? {} as Data; // Asigna un objeto vacío si `data` es undefined
            data['_method'] = 'put'
        }

        const response = await axios({ method, url, data })

        return response.data
    }

    type APIResponse = 
      | Record<string, any>                          // Un objeto simple
      | { [key: string]: Record<string, any>[] };    // Un objeto con una propiedad que es un arreglo de objetos

    const handleMultipleRequests = async (requests: string[]): Promise<APIResponse> => {
      const functions: (() => Promise<AxiosResponse<any>>)[] = requests.map(r => {
        return () => axios.get(r);
      });

      const responses = await Promise.all(functions.map(f => f()));

      return responses.map(r => r.data);
    }

    /*
    *
    * Fuente: https://chat.deepseek.com/share/pxzqhbrk5xgduk6m0j
    */
    const phoneTransform = (value: string) => {
      if (!value) return value;
      
      // Eliminar todos los caracteres que no sean números
      const numbers = value.replace(/\D/g, '')
      
      /* 
        ===============================================================
        📌 SLICE() - MÉTODO PARA ARRAYS Y STRINGS
        ===============================================================
        
        ¿QUÉ ES?
        ---------
        slice() es un método que extrae una parte de un array o string
        y devuelve una NUEVA copia sin modificar el original.
        
        SINTAXIS BÁSICA:
        ----------------
        array.slice(inicio, fin)
        string.slice(inicio, fin)
        
        PARÁMETROS:
        -----------
        • inicio (opcional): Índice donde empieza la extracción (SE INCLUYE)
        • fin (opcional): Índice donde termina (NO SE INCLUYE)
        
        CARACTERÍSTICAS IMPORTANTES:
        ----------------------------
        • Si no se pasa ningún parámetro → copia TODO el array/string
        • Si se pasa solo 'inicio' → desde 'inicio' hasta el final
        • Acepta índices negativos (cuentan desde el final)
        • NO modifica el array/string original
        • Devuelve un NUEVO array o string
        
        EJEMPLO RÁPIDO:
        ---------------
        const arr = [1, 2, 3, 4, 5];
        arr.slice(1, 4);    // [2, 3, 4]
        arr.slice(-2);      // [4, 5]
        arr.slice();        // [1, 2, 3, 4, 5] (copia)
        ================================================================ 
      */
      // Limitar a 10 dígitos (opcional, ajusta según necesites)
      const limitedNumbers = numbers.slice(0, 10)
      
      // Aplicar el formato: 3 números + espacio + 3 números + espacio + 4 números
      let formatted: string = ''
      if (limitedNumbers.length > 0) {
        formatted = limitedNumbers.slice(0, 3)
        if (limitedNumbers.length > 3) {
          formatted += ' ' + limitedNumbers.slice(3, 6)
          if (limitedNumbers.length > 6) {
            formatted += ' ' + limitedNumbers.slice(6, 10)
          }
        }
      }
      
      return formatted
    }

    /*
     * Convierte una fecha en formato ISO (yyyy-mm-dd) a formato latino (dd/mm/yyyy)
     * 
     * @param fecha - Fecha en formato ISO "yyyy-mm-dd" (ej: "2026-09-04")
     * @returns Fecha formateada como "dd/mm/yyyy" (ej: "04/09/2026")
     * @throws {Error} Si la fecha no tiene el formato esperado
     * 
     * @example
     * // Uso básico
     * const resultado = convertDate("2026-09-04");
     * console.log(resultado); // "04/09/2026"
     * 
     * @example
     * // Con input de tipo date
     * const fechaInput = document.querySelector<HTMLInputElement>('#miFecha')?.value;
     * if (fechaInput) {
     *   const fechaFormateada = convertDate(fechaInput);
     *   console.log(fechaFormateada);
     * }
     *
     * Fuente: https://chat.deepseek.com/share/2bxeigghmry1cmmu9t
     */
    function convertDate(fecha: string): string {
        // Validación básica del formato
        if (!fecha || typeof fecha !== 'string') {
            throw new Error('La fecha debe ser una cadena de texto');
        }

        // Validar que tenga el formato yyyy-mm-dd
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(fecha)) {
            throw new Error(`Formato inválido: "${fecha}". Debe ser "yyyy-mm-dd"`);
        }

        const partes = fecha.split('-');
        
        // TypeScript sabe que partes tiene 3 elementos por el split
        const [anio, mes, dia] = partes;
        
        return `${dia}/${mes}/${anio}`;
    }

    return {
        handleRequest,
        handleErrors,
        logout,
        getInformationUser,
        setForm,
        handleMultipleRequests,
        phoneTransform,
        convertDate
    }
}

export default helpers
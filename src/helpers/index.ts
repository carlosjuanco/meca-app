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


    return {
        handleRequest,
        handleErrors,
        logout,
        getInformationUser,
        setForm,
        handleMultipleRequests
    }
}

export default helpers
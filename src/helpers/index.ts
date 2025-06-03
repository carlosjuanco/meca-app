import axios, { AxiosResponse } from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const helpers = () => {
    const store = useStore()
    const router = useRouter()

    const handleErrors = (error: any) => {
        const errors:{ [key: string]: any } = {}
        if (error.response) {
            if (error.response.data.errors) {
                Object.entries(error.response.data.errors).forEach(([key, value]) => {
                    const valor = value as string[]
                    errors[key] = valor[0]
                })
            }
            else {
                errors['message'] = error.response.data.message
            }
        }
        else {
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

        if (response.data.message) {
            // toast({
            //     message: response.data.message,
            //     type: 'is-success'
            // })
        }

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

    const getFile = (url: string) => {
        window.open(`${process.env.VUE_APP_API_URL.replace('/api', '')}/storage/${url}`, '_blank')
    }


    return {
        handleRequest,
        handleErrors,
        logout,
        getInformationUser,
        setForm,
        handleMultipleRequests,
        getFile,
    }
}

export default helpers